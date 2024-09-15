import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { BellDot } from "lucide-react";
import React from "react";
import { ProfileType } from "~/types";

export default function UserNav({ user }: { user: Partial<ProfileType> }) {
  const avatarFallback = user?.fullname
    ? `${user.fullname?.split(" ")[0]?.[0]}${user.fullname?.split(" ")[1]?.[0]}`
    : "";
  return (
    <div className="ml-auto flex items-center gap-5">
      <BellDot strokeWidth={1.8} className="text-gray-800" size={20} />

      <div className="hidden lg:block">
        {user?.fullname} [
        <span className="text-tiny font-semibold text-gray-500">
          {user?.role}
        </span>
        ]
      </div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            title={user?.fullname}
            size="sm"
            className="cursor-pointer"
            fallback={avatarFallback}
          />
        </DropdownTrigger>

        <DropdownMenu variant="faded" aria-label="Static Actions">
          <DropdownItem key="profile">Profile</DropdownItem>
          <DropdownItem key="logout" className="text-danger" color="danger">
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
