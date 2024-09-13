import { cn, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/components/common/button";

export default function Page() {
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
          <Item label="Full Name" value={"Yaya Mamoudou"} />
          <Item label="Email" value={"yayatoure@gmail.com"} />

          <Item label="Username" value={"yaya_mamoudou"} />
          <Item label="Phone Number" value={"+237 692 904 019"} />

          <Item label="Gender" value={"Male"} />

          <Item
            label="Lisence"
            value="driver_lisence.pdf"
            link="https://www.google.com"
          />
          <Item
            label="Insurance"
            value="driver_insurance.pdf"
            link="https://www.google.com"
          />
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
