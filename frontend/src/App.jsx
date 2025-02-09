import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Link, Outlet, useLocation } from "react-router-dom"; 

export default function App() {
  const location = useLocation(); 

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex flex-col w-full min-h-screen">
          {/* Navbar */}
          <header className="sticky top-0 z-50 flex h-16 items-center justify-between px-4 border-b mb-4 backdrop-blur-lg shadow-md">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <h1 className="text-lg font-semibold">{activeRouteTitle}</h1> 
            </div>

            {/* Right section (Theme Toggle + User Avatar) */}
            <div className="flex items-center gap-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-grow flex flex-col">
            <Outlet /> 
          </main>

          {/* Footer */}
          <footer className="mt-auto border-t bg-muted/50 backdrop-blur-md text-sm text-muted-foreground py-4 px-6 flex justify-between items-center">
            <span>© {new Date().getFullYear()} PseudoAPI. All rights reserved.</span>
            <div className="flex gap-4">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
            </div>
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
