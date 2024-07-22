import React from "react";
import Button from "./button";

export default function InsuranceActionBanner() {
  return (
    <div className="container my-10">
      <div className="flex items-center justify-center rounded-2xl bg-primary p-4 text-white">
        <div className="flex flex-col items-center gap-4 lg:w-3/4 lg:flex-row">
          <div className="text-xl font-medium">No insurance? No worries!</div>
          <div className="flex flex-col flex-wrap gap-4 *:bg-white *:px-4 *:!text-black sm:flex-row lg:ml-auto">
            <Button>Purchase an Insurance</Button>
            <Button>Contact Support</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
