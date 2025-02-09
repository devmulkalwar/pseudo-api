import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const [isOpen, setIsOpen] = useState(item.isActive || false);
          const isActive = location.pathname === item.url;

          return (
            <div key={item.title} className="group/collapsible">
              <SidebarMenuItem>
                {item.items ? (
                  // If the item has sub-items, make it collapsible
                  <>
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => setIsOpen(!isOpen)}
                      className={`flex items-center text-lg ${
                        isActive ? "font-bold text-primary" : ""
                      }`}
                    >
                      {item.icon && <item.icon size={24} className="w-6 h-6" />} {/* ✅ Fixed icon size */}
                      <span className="text-base">{item.title}</span>
                      <ChevronRight
                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </SidebarMenuButton >
                    {isOpen && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const isSubActive = location.pathname === subItem.url;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  to={subItem.url}
                                  className={`block w-full px-4 py-2 rounded text-base ${
                                    isSubActive ? "font-bold text-primary" : ""
                                  }`}
                                >
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </>
                ) : (
                  // If no sub-items, just a simple link
                  <SidebarMenuButton asChild isActive={isActive} className="text-lg">
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 ${
                        isActive ? "font-bold text-primary" : ""
                      }`}
                    >
                      {item.icon && <item.icon size={24} className="w-6 h-6" />} {/* ✅ Fixed icon size */}
                      <span className="text-base">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            </div>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
