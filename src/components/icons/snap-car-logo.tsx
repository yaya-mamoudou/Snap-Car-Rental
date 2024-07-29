import { cn } from "@nextui-org/react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "alt">;

export default function SnapCarLogoIcon(props: Props) {
  const { className, width = 130, height = 40, ...rest } = props;

  return (
    <Image
      src="/images/logo.png"
      width={width}
      height={height}
      className={cn("h-[40px] w-[auto] object-contain", className)}
      alt="logo"
      {...rest}
    />
  );
}
