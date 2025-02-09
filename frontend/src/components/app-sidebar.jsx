"use client";

import * as React from "react";
import { Home, Compass, BookOpen, Info, Mail, Settings2, PlusCircle } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "react-router-dom";

// Sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
 
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Explore",
      url: "/explore",
      icon: Compass,
    },
    {
      title: "Create API", // ✅ Added Create API route
      url: "/create-api",
      icon: PlusCircle,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
    },
    {
      title: "About",
      url: "/about",
      icon: Info,
    },
    {
      title: "Contact",
      url: "/contact",
      icon: Mail,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};

export function AppSidebar(props) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="flex h-16 items-center justify-between px-4 border-b">
        <Link className="font-bold text-3xl">PseudoApi</Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
