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
import { Outlet, useLocation } from "react-router-dom"; // ✅ Import useLocation

export default function App() {
  const location = useLocation(); // ✅ Get current path

  // 🔹 Define route titles based on paths
  const routeTitles = {
    "/": "Home",
    "/explore": "Explore",
    "/docs": "Documentation",
    "/about": "About",
    "/contact": "Contact",
    "/create-api": "Create API",
    "/profile/:id": "Profile",
  };

  // 🔹 Get the active route title (default to "Dashboard" if not found)
  const activeRouteTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Navbar */}
          <header className="flex h-16 items-center justify-between px-4 border-b mb-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4" />
              <h1 className="text-lg font-semibold">{activeRouteTitle}</h1> 
            </div>

            {/* Right section (Theme Toggle + User Avatar) */}
            <div className="flex items-center gap-4">
              <ModeToggle />
              {/* User Avatar Dropdown */}
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

          {/* Main Content (Dynamic Routing) */}
          <div className="p-4">
            <Outlet /> {/* ✅ This will render the active route component */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
