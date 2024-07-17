import React from "react";
import { IconProps } from "./interface";
import Image, { ImageProps } from "next/image";
import { cn } from "@nextui-org/react";

type Props = Omit<ImageProps, "src" | "alt">;

export default function SnapCarLogoIcon(props: Props) {
  const { className, width = 130, height = 40, ...rest } = props;

  return (
    <Image
      src="/images/logo.png"
      width={width}
      height={height}
      className={cn("h-[40px] object-contain", className)}
      alt="logo"
      {...rest}
    />
  );
}
