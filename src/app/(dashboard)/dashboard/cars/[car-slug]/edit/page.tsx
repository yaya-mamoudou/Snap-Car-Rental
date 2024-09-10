"use client";
import { Textarea } from "@nextui-org/react";
import { DollarSign } from "lucide-react";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import Select from "~/components/common/select";
import { engines, status, wheel } from "~/data/mock";

export default function page() {
  return (
    <div>
      <div className="mt-4 flex justify-center rounded-lg bg-white px-4 py-4">
        <div className="w-full md:w-2/3">
          <h1 className="mb-4 mt-10 text-2xl font-bold text-black">Edit Car</h1>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <Input autoFocus label="Car Name" variant="bordered" />
            </div>
            <div className="col-span-6">
              <Select labelPlacement="inside" data={status} label="Status" />
            </div>
            <div className="col-span-6">
              <Select labelPlacement="inside" data={wheel} label="Wheel" />
            </div>
            <div className="col-span-6">
              <Select labelPlacement="inside" data={engines} label="Engine" />
            </div>
            <div className="col-span-12 flex gap-x-2 md:col-span-6">
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="No of Seats"
              />
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="No of Luggages"
              />
            </div>
            <div className="col-span-12 flex gap-2 md:col-span-6">
              <Input
                startContent={<DollarSign size={20} />}
                label="Daily Price"
                variant="bordered"
              />
              <Input
                startContent={<DollarSign size={20} />}
                label="Montly Price"
                variant="bordered"
              />
            </div>
            <div className="col-span-12">
              <Textarea
                classNames={{ input: "border-none focus:ring-0 p-0" }}
                label="Description"
                variant="bordered"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button color="primary">Sign in</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
