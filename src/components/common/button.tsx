import React from "react";
import { Button as Btn, ButtonProps } from "@nextui-org/react";

type Props = ButtonProps;
export default function Button(props: Props) {
  return <Btn {...props} />;
}
