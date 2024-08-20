import React from "react";
// import Avatar from '../avatar';
// import { BellDot } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-transparent to-white p-6">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-5 px-6">
          {/* <BellDot strokeWidth={1.8} className='text-gray-800' size={20} /> */}
          {/* <Avatar fallback='YM' /> */}
        </div>
      </div>
      <div className="">{/* <HeaderActionSection /> */}</div>
    </div>
  );
}
