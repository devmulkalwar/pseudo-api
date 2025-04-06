import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm mt-auto">
      <div className="container mx-auto py-8 px-4">
        {/* Divider with subtle gradient */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Left Section - Logo and Copyright */}
          <div className="flex flex-col gap-3">
            {/* Company Logo */}
            <Link to="/">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    PA
                  </span>
                </div>
                <span className="text-xl font-semibold">PseudoAPI</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Generate Fake APIs in Seconds.
            </p>
          </div>

          {/* Right Section - Navigation */}
          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {/* About Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Nav Links</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/docs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Bar with Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border">
          {/* Social Media Links */}
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <Link
              to="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </Link>
            <Link
              to="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              to="mailto:contact@pseudoapi.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={20} />
            </Link>
          </div>

          {/* Accessibility Statement */}
          <div>
            {/* Copyright Text */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PseudoAPI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
