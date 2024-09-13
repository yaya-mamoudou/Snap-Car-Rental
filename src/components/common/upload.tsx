"use client";

import { useRef, useState } from "react";
import { cn } from "@nextui-org/react";
import { FileUp } from "lucide-react";

type Props = {
  onChange?: (files: File[]) => void;
  label: string;
  className?: string;
  placeholder?: string;
  accept?: string;
  name?: string;
  multiple?: boolean;
  required?: boolean;
  errorMessage?: any;
};

export default function Upload(props: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  let displayName;

  if (files.length === 0)
    displayName = props.placeholder ?? "Upload your files here";
  else
    displayName =
      files?.length > 1 ? `${files.length} files` : files?.[0]?.name;

  return (
    <div className={cn("relative w-full", props.className)}>
      <label
        htmlFor="file-input"
        className="pointer-events-none max-w-full text-ellipsis pe-2 text-small"
      >
        {props.label}
        {props.required && <span className="text-danger">*</span>}
      </label>

      <div
        onClick={() => ref.current?.click()}
        className={cn(
          "rounded-6 bg-bg mt-1 flex h-[40px] cursor-pointer items-center justify-between truncate rounded-lg border-2 border-gray-200 px-3 text-small text-gray-500 hover:border-gray-300",
          props.errorMessage && "border-[#F31260]",
        )}
      >
        <span className="mr-10 truncate">{displayName}</span>
        <FileUp />
      </div>

      {props.errorMessage && (
        <span className="text-tiny text-[#F31260]">{props.errorMessage}</span>
      )}

      <input
        ref={ref}
        onChange={(e) => {
          const files = Array.from(e.target.files as unknown as File[]);
          setFiles(files);
          props.onChange?.(files);
        }}
        id="file-input"
        type="file"
        name={props.name}
        className="hidden"
        multiple={props.multiple}
        accept={props.accept}
      />
    </div>
  );
}
