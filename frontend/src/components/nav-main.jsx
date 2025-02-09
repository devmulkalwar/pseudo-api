"use client";

import React from "react";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain({ items }) {
  const location = useLocation(); // ✅ Get current path

  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = location.pathname === item.url; // ✅ Check active status

        return (
          <SidebarMenuItem className="my-2" key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link className={`flex items-center ${isActive ? "font-bold text-primary" : ""}`} to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
