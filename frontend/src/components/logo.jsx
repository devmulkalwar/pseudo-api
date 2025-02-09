"use client";

import React from "react";
import {
  useSidebar,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Layers } from "lucide-react"; // Example logo icon
import { Link } from "react-router-dom";

export function Logo() {
  const { open , isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          {/* Logo Container */}
          <Link
            to="/"
            className={`flex items-center gap-2 ${
              open ? "" : ""
            } w-full`}
          >
          
              <Layers /> 

            {open && (
              <span className="font-semibold text-xl text-sidebar-foreground">
                PseudoAPI
              </span>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
