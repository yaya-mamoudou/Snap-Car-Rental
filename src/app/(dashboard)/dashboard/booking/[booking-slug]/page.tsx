import { cn, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/components/common/button";

export default function page() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Booking Details</h1>
      <div className="mt-4 space-y-4 rounded-lg bg-white p-4 *:text-sm">
        <Image
          width={200}
          height={200}
          src={"/images/cars/car3.jpg"}
          alt={`${""} profile image`}
          className="self-start rounded-sm"
        />
        <Divider className="bg-gray-200" />
        <div className="*:p-2 odd:*:bg-gray-50">
          <Item label="Car" value={"Honda Sizuki"} />
          <Item label="User" value={"Akwo Ashang"} />

          <Item label="Start Date" value={"20 Aug 2024"} />
          <Item label="End Date" value={"23 Aug 2024"} />

          <Item label="Status" value={"Expired"} />
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  label: string;
  value: string;
  link?: string;
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
