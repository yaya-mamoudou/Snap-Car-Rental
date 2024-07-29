import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Button from "../common/button";
import SnapCarLogoIcon from "../icons/snap-car-logo";

export default function App() {
  const menuItems = [
    {
      label: "Home", href: '/'
    },
    {
      label: "Rent A Car", href: '/cars'
    },
    // {
    //   label: "Contact Us", href: '/register'
    // },
    {
      label: "Why Choose Us", href: '/#why-choose-us'
    },
    {
      label: "Register", href: '/register'
    },
    // "Good Deals",
    // "Contact Us",
  ];

  return (
    <Navbar className="*:container" disableAnimation>
      <NavbarContent className="lg:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="lg:hidden" justify="center">
        <NavbarBrand>
          <SnapCarLogoIcon id="wpo" className="h-8" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="mr-16 hidden gap-4 lg:flex lg:flex-1"
        justify="center"
      >
        <NavbarBrand>
          <SnapCarLogoIcon id="wpo" className="h-8" />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/cars">
            Rent Car
          </Link>
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
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Contact Us
          </Link>
        </NavbarItem> */}
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Why Choose Us
          </Link>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarContent className="lg:!grow-0" justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/register">Register</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={index === menuItems.length - 1 ? "primary" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
