"use client";
import { cn, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Button from "~/components/common/button";
import { api } from "~/trpc/react";

export default function Page() {
  const params: { "user-slug": string } = useParams();
  const userId = params["user-slug"];
  const { data: user } = api.users.get.useQuery({ id: userId });

  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Users Details</h1>
      <div className="mt-4 space-y-4 rounded-lg bg-white p-4 *:text-sm">
        <Image
          width={200}
          height={200}
          src={"https://randomuser.me/api/portraits/men/10.jpg"}
          alt={`${""} profile image`}
          className="self-start rounded-sm"
        />
        <Divider className="bg-gray-200" />
        <div className="*:p-2 odd:*:bg-gray-50">
          <Item label="Full Name" value={user?.fullname} />
          <Item label="Email" value={user?.email} />

          <Item label="Username" value={user?.username} />
          <Item label="Phone Number" value={user?.phone_number} />

          <Item label="Gender" value={user?.gender} />

          <Item
            label="Lisence"
            value="driver_lisence.pdf"
            link={user?.drivers_lisence}
          />
          <Item
            label="Insurance"
            value="driver_insurance.pdf"
            link={user?.insurance}
          />
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  label: string;
  value?: string | null;
  link?: string | null;
};

const Item = (props: ItemProps) => {
  return (
    <div>
      <div className="text-gray-400">{props.label}</div>
      <Button
        {...(props.link && { as: Link, href: props.link, target: "_blank" })}
        disableAnimation={true}
        className={cn(
          "h-auto min-w-fit bg-transparent p-0 font-medium text-primary underline",
          !props.link && "cursor-default text-black no-underline",
        )}
      >
        {props.value}
      </Button>
    </div>
  );
};
