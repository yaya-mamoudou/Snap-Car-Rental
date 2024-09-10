import { Divider } from "@nextui-org/react";
import { format } from "date-fns";
import { Eye, Pen, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import CreateCarDialog from "~/components/pages/cars/create-car-dialog";
import { dashboardCars } from "~/data/mock";

export default function CarsPage() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Cars</h1>

      <div className="mt-4 rounded-lg bg-white py-4">
        <div className="px-4">
          <div className="flex justify-between">
            <Input
              placeholder="Search Car"
              className="max-w-[300px]"
              endContent={<Search />}
            />
            <CreateCarDialog>
              <Button endContent={<Plus size={20} />}> Add Car</Button>
            </CreateCarDialog>
          </div>
          <Divider className="mb-3 mt-3 bg-gray-200" />
        </div>
        <div className="odd:*:bg-gray-50">
          {dashboardCars.map((car) => (
            <div
              key={car.car}
              className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
            >
              <div className="size-[150px] h-fit rounded-full bg-slate-100">
                <Image
                  src="/images/cars/car3.jpg"
                  alt="..."
                  width={150}
                  height={150}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <Link
                  href={`/dashboard/cars/${car.car}`}
                  className="hover:underline"
                >
                  {car.car}
                </Link>
                <div className="flex gap-2">
                  <Button
                    link
                    size="sm"
                    variant="bordered"
                    href={`/dashboard/cars/${car.car}/edit`}
                    className="border-[1px]"
                  >
                    <Pen size={14} />
                    Edit
                  </Button>

                  <Button
                    link
                    size="sm"
                    href={`/dashboard/cars/${car.car}`}
                    className="border-[1px]"
                  >
                    <Eye size={14} />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
