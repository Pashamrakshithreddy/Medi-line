import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, HeartPulse, Stethoscope, Video, Hospital } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AuthNav } from "./AuthNav";
import type { User } from "@/lib/firebase";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { href: "/about", label: "About", icon: Stethoscope },
  { href: "/doctors", label: "Doctors", icon: Stethoscope },
  {
    label: "Services",
    icon: HeartPulse,
    isDropdown: true,
    items: [
      {
        href: "/services",
        title: "All Services",
        description: "Explore our comprehensive range of medical services.",
        icon: Hospital,
      },
      {
        href: "/services/virtual",
        title: "Virtual Consultation",
        description: "Consult with our expert doctors from your home.",
        icon: Video,
      },
      {
        href: "/services/emergency",
        title: "Emergency Care",
        description: "24/7 access to urgent medical attention.",
        icon: HeartPulse,
      },
    ],
  },
  { href: "/insights", label: "Insights", icon: Stethoscope },
  { href: "/patient-portal", label: "Patient Portal", icon: Stethoscope },
  { href: "/contact", label: "Contact", icon: Stethoscope },
];

export const Navbar = ({ user }: { user: User | null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Medi-line</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.isDropdown && item.items ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                        {item.items.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <NavLink
                        to={item.href!}
                        className={({ isActive }) =>
                          cn(
                            "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                            isActive ? "text-foreground" : "text-foreground/60"
                          )
                        }
                      >
                        {item.label}
                      </NavLink>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Nav */}
        <Sheet
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Medi-line</span>
            </Link>
            <div className="my-4 flex h-[calc(100vh-8rem)] flex-col justify-between pb-10 pl-6">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-3">
                  {navItems.map((item) =>
                    item.href ? (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground",
                            isActive && "font-semibold text-foreground"
                          )
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </NavLink>
                    ) : (
                      <div key={item.label} className="flex flex-col space-y-2 pt-2">
                        <h4 className="font-medium">{item.label}</h4>
                        {item.items?.map((subItem) => (
                          <NavLink key={subItem.href} to={subItem.href} onClick={() => setIsMobileMenuOpen(false)} className="pl-4 text-muted-foreground/80">{subItem.title}</NavLink>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mt-6">
                <AuthNav user={user} />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="hidden md:flex">
            <AuthNav user={user} />
          </div>
          <div className="md:hidden">
            <Button asChild><Link to="/contact">Book Now</Link></Button>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";