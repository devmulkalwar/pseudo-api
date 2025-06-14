import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function App() {
  const location = useLocation();
  const { isLoaded } = useAuth(); // Check Clerk's authentication state
  const [loading, setLoading] = useState(true);

  // Simulate a loading delay (optional)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1-second delay
    return () => clearTimeout(timer);
  }, []);

  const routeTitles = {
    "/": "Home",
    "/explore": "Explore",
    "/docs": "Documentation",
    "/about": "About",
    "/contact": "Contact",
    "/create-api": "Create API",
    "/profile/:id": "Profile",
  };

  const activeRouteTitle = routeTitles[location.pathname] || "Dashboard";

  // Show loader until Clerk is loaded and custom loader finishes
  if (loading || !isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full min-h-screen">
          {/* Navbar - Updated layout */}
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-2 sm:px-4 border-b mb-4 backdrop-blur-lg shadow-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <h1 className="hidden md:flex text-lg font-semibold">
                {activeRouteTitle}
              </h1>
            </div>

            {/* Right section - Updated for better mobile handling */}
            <div className="flex items-center gap-2 sm:gap-4">
              <ModeToggle />
              <SignedOut>
                <div className="flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="px-2 sm:px-4">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button variant="default" size="sm" className="px-2 sm:px-4">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        "w-10 h-10 border-2 border-muted-foreground",
                      userButtonPopoverCard:
                        "bg-background border border-border shadow-lg",
                    },
                  }}
                />
              </SignedIn>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow flex flex-col">
            <Outlet />
          </main>

          <Footer />
        </SidebarInset>
      </SidebarProvider>
      <Toaster />
    </ThemeProvider>
  );
}
