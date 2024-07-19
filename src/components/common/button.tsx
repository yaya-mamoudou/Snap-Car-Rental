import { Button as Btn, type ButtonProps } from "@nextui-org/react";

type Props = ButtonProps;
export default function Button({ color, ...props }: Props) {
  return <Btn {...props} color={color ?? "primary"} />;
}
