import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TWILIO_BASE = "https://api.twilio.com/2010-04-01";
const DEFAULT_TWILIO_FROM_NUMBER = "+14849176654";

function normalizePhoneNumber(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
  return `+91${trimmed.replace(/\D/g, "")}`;
}

function encodeBasicAuth(value: string) {
  if (typeof btoa === "function") return btoa(value);
  return Buffer.from(value).toString("base64");
}

async function twilioRequest(path: string, body: URLSearchParams, sid: string, token: string) {
  const res = await fetch(`${TWILIO_BASE}/Accounts/${sid}/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodeBasicAuth(`${sid}:${token}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Twilio ${path} failed (${res.status}): ${errText}`);
  }
  return (await res.json()) as { sid?: string };
}

async function placeCall(to: string, from: string, sid: string, token: string) {
  const twiml = `<Response><Pause length="20"/><Hangup/></Response>`;
  return twilioRequest(
    "Calls.json",
    new URLSearchParams({ To: to, From: from, Twiml: twiml }),
    sid,
    token,
  );
}

async function sendSms(to: string, from: string, body: string, sid: string, token: string) {
  return twilioRequest(
    "Messages.json",
    new URLSearchParams({ To: to, From: from, Body: body }),
    sid,
    token,
  );
}

export const triggerCustomerCall = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      phone: z.string().min(10).max(16),
      name: z.string().min(1).max(80),
      model: z.string().min(1).max(120),
    }),
  )
  .handler(async ({ data }) => {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = normalizePhoneNumber(process.env.TWILIO_FROM_NUMBER || DEFAULT_TWILIO_FROM_NUMBER);
    const adminNumber = process.env.ADMIN_NOTIFY_NUMBER;
    if (!sid || !token) {
      throw new Error("Twilio is not configured");
    }

    const to = normalizePhoneNumber(data.phone);
    const maxAttempts = 2;
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const call = await placeCall(to, from, sid, token);
        return { ok: true, callSid: call.sid, attempts: attempt };
      } catch (err) {
        lastError = err;
        console.error(`Twilio call attempt ${attempt} failed`, err);
        if (attempt < maxAttempts) {
          await new Promise((r) => setTimeout(r, 2000));
        }
      }
    }

    // All attempts failed — notify admin via SMS if configured.
    if (adminNumber) {
      try {
        await sendSms(
          adminNumber,
          from,
          `RideZone alert: failed to call customer ${data.name} (${to}) for ${data.model} after ${maxAttempts} attempts.`,
          sid,
          token,
        );
      } catch (smsErr) {
        console.error("Admin SMS notification failed", smsErr);
      }
    }

    throw new Error(
      `Twilio call failed after ${maxAttempts} attempts: ${
        lastError instanceof Error ? lastError.message : String(lastError)
      }`,
    );
  });
