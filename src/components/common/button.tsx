import React from "react";
import { Button as Btn, type ButtonProps } from "@nextui-org/react";

type Props = ButtonProps;
export default function Button(props: Props) {
  return <Btn {...props} />;
}
