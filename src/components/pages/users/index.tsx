"use client";
import { Avatar, Divider, Spinner } from "@nextui-org/react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Input from "~/components/common/input";
import { api } from "~/trpc/react";

export default function UsersList() {
  const { data: users, isPending } = api.users.getAllUsers.useQuery();
  return (
    <div className="mt-4 rounded-lg bg-white py-4">
      <div className="px-4">
        <Input
          placeholder="Search User"
          className="max-w-[300px]"
          endContent={<Search />}
        />
        <Divider className="mb-3 mt-3 bg-gray-200" />
      </div>
      {isPending && (
        <div className="flex w-full items-center justify-center gap-x-2">
          <Spinner size="sm" /> Loading Cars
        </div>
      )}
      <div className="odd:*:bg-gray-50">
        {users?.map((user) => (
          <Link
            key={user.id}
            href={`/dashboard/users/${user.id}`}
            className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
          >
            <div className="h-fit rounded-full bg-slate-100">
              <Avatar
                // src={user.profile}
                fallback={user.fullname}
                size="sm"
              />
            </div>
            <div>
              <div className="">{user.fullname}</div>
              <div className="text-sm text-black/50">
                {format(user.createdAt, "dd MMM yyyy")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
