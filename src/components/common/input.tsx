"use client";
import React, { useState } from "react";
import { cn, Input as In } from "@nextui-org/react";
import type { InputProps } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  className,
  type = "text",
  ...props
}: InputProps) {
  const [visible, setVisible] = useState(type !== "password");
  const PasswordIcon = visible ? Eye : EyeOff;

  return (
    <In
      className={cn("", className)}
      type={type === "password" && visible ? "text" : type}
      {...(type === "password" && {
        endContent: (
          <PasswordIcon
            className="cursor-pointer text-gray-600"
            onClick={() => setVisible(!visible)}
            size={18}
          />
        ),
      })}
      classNames={{
        input:
          "border-transparent !ring-0 pl-0 py-0 !shadow-none focus:border-transparent ",
      }}
      {...props}
    />
  );
}
