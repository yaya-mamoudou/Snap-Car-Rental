import { Avatar } from "@nextui-org/react";
import { BellDot } from "lucide-react";
import React from "react";
// import Avatar from '../avatar';
// import { BellDot } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-transparent to-white px-6 py-2">
      <div className="flex items-center">
        {/* <h2>Home</h2> */}
        <div className="ml-auto flex items-center gap-5 px-6">
          <BellDot strokeWidth={1.8} className="text-gray-800" size={20} />
          <Avatar size="sm" fallback="YM" />
        </div>
      </div>
      <div className="">{/* <HeaderActionSection /> */}</div>
    </div>
  );
}
