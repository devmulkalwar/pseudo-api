import * as React from "react";
import {
  Home,
  Compass,
  BookOpen,
  Info,
  Mail,
  Settings2,
  PlusCircle,
  User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { Logo } from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Link } from "react-router-dom";
import useGlobalContext from "@/hooks/useGlobalContext";

export function AppSidebar(props) {
  const { user } = useGlobalContext();

  const publicNavItems = [
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
  ];

  const data = {
    navMain: user 
      ? [...publicNavItems,
          {
            title: "Create API",
            url: "/create-api",
            icon: PlusCircle,
          },
          {
            title: "Profile",
            url: `/profile/${user._id}`,
            icon: User,
          }
        ]
      : publicNavItems  
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0" {...props}>
      <SidebarHeader className={`flex h-16 items-center  border-b ${open ? "justify-center" : "justify-between"}`}>
        <Logo/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
