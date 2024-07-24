import { FileText, HardDriveDownload } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <div className="relative min-h-[inherit]">
      <Image
        alt="car_texture"
        src="/images/car_texture_black.webp"
        width={500}
        height={300}
        className="absolute -right-0 bottom-10 w-2/3 opacity-50"
      />
      <div className="min-h-[inherit] bg-black/10">
        <div className="container flex min-h-[inherit] flex-col items-center justify-center py-20">
          <div className="col-span-12 w-full text-center md:col-span-4 md:w-2/3">
            <h2 className="mb-10 text-2xl font-semibold text-primary">
              TERMS AND CONDITIONS
            </h2>
            <p>
              PLEASE DOWNLOAD THE ATTACHED TERMS AND CONDITION AD READ CAREFULLY
              BEFORE PROCEEDING WITH RENTALS. BY RENTING WITH US YOU AKNOWLEDGE
              THAT YOU HAVE READ ALL THE TERMS AND CONDITIONS AND AGREE TO THEM
            </p>
          </div>
          <div className="mt-10 flex w-2/3 items-center gap-x-2 rounded-sm bg-white px-4 py-2">
            <FileText size={40} strokeWidth="1" />
            <div className="mr-auto">
              <div className="text-lg font-bold text-primary">
                Download File
              </div>
              <div className="mt-[-4px] text-[0.7rem] text-black/50">
                PDF.200kb
              </div>
            </div>
            <div className="rounded-lg bg-black p-2 text-white">
              <HardDriveDownload strokeWidth={1} size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
