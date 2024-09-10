import { Avatar, Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import Link from "next/link";
import Input from "~/components/common/input";
import { users } from "~/data/mock";

export default function UsersPage() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Users</h1>

      <div className="mt-4 rounded-lg bg-white py-4">
        <div className="px-4">
          <Input
            placeholder="Search User"
            className="max-w-[300px]"
            endContent={<Search />}
          />
          <Divider className="mb-3 mt-3 bg-gray-200" />
        </div>
        <div className="odd:*:bg-gray-50">
          {users.map((user) => (
            <Link
              key={user.name}
              href={`/dashboard/users/${user.name}`}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
            >
              <div className="h-fit rounded-full bg-slate-100">
                <Avatar src={user.profile} fallback={user.name} size="sm" />
              </div>
              <div>
                <div className="">{user.name}</div>
                <div className="text-sm text-black/50">
                  {format(user.createdAt, "dd MMM yyyy")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
