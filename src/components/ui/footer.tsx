import React from "react";
import SnapCarLogoIcon from "../icons/snap-car-logo";
import Link from "next/link";
import Button from "../common/button";

const links = {
  row1: [
    { label: "Home", url: "/" },
    { label: "How it Works", url: "/" },
    { label: "Our Fleet", url: "/" },
    { label: "Why Choose Us?", url: "/" },
    { label: "Faqs", url: "/" },
  ],
};
export default function Footer() {
  return (
    <div className="bg-black py-20 text-small font-light">
      <div className="container text-white">
        <div className="grid grid-cols-12 content-center items-center space-x-6 space-y-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div>
              <div className="mb-8 w-fit bg-white p-2">
                <SnapCarLogoIcon />
              </div>
              <p className="whitespace-break-spaces">
                Our mission remains providing users with the most secure. easy
                and fastest car rental experience
              </p>
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="flex flex-col">
              {links.row1.map((item) => (
                <Link
                  className="hover:text-primary"
                  key={item.label}
                  href={item.url}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <Button
              variant="flat"
              color="primary"
              as={Link}
              href="/Privacy-and-Policy"
            >
              Privacy & Policy | Terms & Conditions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
