import { Link } from "@nextui-org/link";
import {
  Image,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";

import SessionSwitcher from "./session-switcher";
import SearchInput from "./search-input";

import { ThemeSwitch } from "@/components/theme-switch";
import { LogOut, Profile, Settings } from "@/components/icons";
import CMlogo from "@/assets/images/cm-logo.png";

export const Navbar = () => {
  return (
    <NextUINavbar
      isBlurred
      className="shadow-sm"
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Image
              removeWrapper
              alt="logo"
              className="rounded-none"
              src={CMlogo}
              width={40}
            />
            <p className="font-bold text-inherit">School</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <SessionSwitcher />
          <ThemeSwitch />
          <SearchInput />
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Shubham Singh"
              size="sm"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            disabledKeys={["signed_in_as"]}
            variant="flat"
          >
            <DropdownItem key="signed_in_as" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem
              key="profile"
              description="View profile details and more"
              startContent={<Profile />}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key="settings"
              description="Manage your account settings"
              startContent={<Settings />}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              description="Sign out of your account"
              startContent={<LogOut />}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextUINavbar>
  );
};
