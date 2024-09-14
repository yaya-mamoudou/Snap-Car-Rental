"use client";
import {
  cn,
  Link,
  Navbar as Nav,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import React from "react";
import { sidebarMenu } from "~/data/mock";
import { useGlobalStore } from "~/store/globalStore";
import UserNav from "./userNav";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const user = useGlobalStore((state) => state.state.user);

  return (
    <Nav
      className="relative left-[-1.5rem] top-[-0.5rem] w-screen rounded-xl *:max-w-full lg:left-0 lg:top-0 lg:w-full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>

      <NavbarContent className="flex gap-4" justify="center">
        <NavbarItem>
          <div className="flex items-center">
            <UserNav user={user} />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {sidebarMenu.map((item, index) => {
          const isExactMatch = pathname === item.path;
          const isNestedRoute =
            pathname.startsWith(item.path) &&
            item.path !== "/dashboard" &&
            pathname !== "/dashboard";

          const shouldHighlight = isExactMatch || isNestedRoute;

          return (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                className={cn(
                  "w-full text-black",
                  shouldHighlight && "text-primary",
                )}
                href={item.path}
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Nav>
  );
}
