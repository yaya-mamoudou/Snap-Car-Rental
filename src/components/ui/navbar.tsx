import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import SnapCarLogoIcon from "../icons/snap-car-logo";
import Image from "next/image";
import Button from "../common/button";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export default function App() {
  const menuItems = [
    "Home",
    "Rent a Car",
    "Why Choose Us",
    "Good Deals",
    "Contact Us",
    "Register",
  ];

  return (
    <Navbar className="*:container" disableAnimation isBordered>
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="lg:hidden" justify="center">
        <NavbarBrand>
          <SnapCarLogoIcon id="wpo" className="h-8" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarBrand>
          <SnapCarLogoIcon id="wpo" className="h-8" />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#">Rent a Car</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Why Choose Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Good Deals
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Why Choose Us
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Register</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={index === menuItems.length - 1 ? "primary" : "foreground"}
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
