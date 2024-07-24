import { Button as Btn, type ButtonProps } from "@nextui-org/react";
import Link from "next/link";

type Props = ButtonProps & {
  link?: boolean;
};

export default function Button({ color, link, ...props }: Props) {
  return (
    <Btn {...props} {...(link && { as: Link })} color={color ?? "primary"} />
  );
}
