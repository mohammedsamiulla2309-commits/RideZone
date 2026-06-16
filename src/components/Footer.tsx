import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-red">
              <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="font-display text-2xl tracking-wider">
              Ride<span className="text-primary">Zone</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            India's premium destination for bikes & scooters. Ride bold. Ride RideZone.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/bikes" className="hover:text-primary">Bikes</Link></li>
            <li><Link to="/scooters" className="hover:text-primary">Scooters</Link></li>
            <li><Link to="/emi" className="hover:text-primary">EMI & Finance</Link></li>
            <li><Link to="/test-ride" className="hover:text-primary">Book Test Ride</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base text-foreground">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact" className="hover:text-primary">Contact Us Today</Link></li>
            <li><a href="#" className="hover:text-primary">Service Centers</a></li>
            <li><a href="#" className="hover:text-primary">Warranty</a></li>
            <li><a href="#" className="hover:text-primary">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-base text-foreground">Visit Showroom</h4>
          <p className="mt-4 text-sm text-muted-foreground">
            42 MG Road, Brigade Plaza<br />
            Bengaluru, KA 560001<br />
            +91 98765 43210
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 RideZone Motors. All rights reserved.
      </div>
    </footer>
  );
}
