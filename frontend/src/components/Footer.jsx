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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  PA
                </span>
              </div>
              <span className="text-lg font-semibold">PseudoAPI</span>
            </div>

            {/* Copyright Text */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PseudoAPI. All rights reserved.
            </p>
          </div>

          {/* Right Section - Navigation */}
          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {/* About Section */}
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
                  to="/blog"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  to="/careers"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </div>
            </div>

            {/* Resources Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/documentation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  to="/support"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </Link>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Legal Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <div className="flex flex-col gap-2">
                <Link
                  to="/privacy-policy"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/cookies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom Bar with Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-border">
          {/* Social Media Links */}
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <a
              href="#"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a
              href="#"
              aria-label="Discord"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-message-circle"
              >
                <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
              </svg>
            </a>
          </div>

          {/* Accessibility Statement */}
          <div>
            <Link
              to="/accessibility"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
