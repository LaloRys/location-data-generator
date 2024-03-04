"use client";
import React from "react";
import { privateRoutes, publicRoutes } from "./NavbarRoutes";
import { AcmeLogo } from "./assets/AcmeLogo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { DarkModeIcon, LightModeIcon } from "../icons/icons";

export default function NavbarUI() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { theme, setTheme, systemTheme } = useTheme();

  // const router = useRouter();
  const pathname = usePathname();
  const isCurrentRoute = (routePath: string) => pathname === routePath;

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href={"/"} className="flex items-center">
            <AcmeLogo />
            <p className="font-bold text-inherit uppercase">data processing</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {theme == "light" ? (
            <DarkModeIcon
              className="cursor-pointer text-xl"
              onClick={() => {
                setTheme("dark");
              }}
            ></DarkModeIcon>
          ) : (
            <LightModeIcon
              className="cursor-pointer text-xl text-yellow-300"
              onClick={() => {
                setTheme("light");
              }}
            ></LightModeIcon>
          )}
          {/* <Button color="primary" variant="bordered" onClick={handleSignOut}>
                  Log Out
                </Button> */}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {publicRoutes.map((route) => (
          <NavbarItem
            key={route.id}
            className={isCurrentRoute(route.path) ? "text-sky-500" : ""}
          >
            <Link className="cursor-pointer" href={route.path}>
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {publicRoutes.map((route) => (
          <NavbarMenuItem key={route.id}>
            <Link
              href={route.path}
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {route.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
