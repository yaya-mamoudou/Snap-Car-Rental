"use client";
import { Divider, Spinner } from "@nextui-org/react";
import { Plus, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import { api } from "~/trpc/react";
import CreateCarDialog from "./create-car-dialog";

export default function CarsList() {
  const { data: cars, isPending } = api.cars.getAll.useQuery({});
  const [deleting, setDeleting] = useState<string>("");
  const utils = api.useUtils();
  const { mutate: deleteCar, isPending: isDeleting } =
    api.cars.deleteCar.useMutation();

  const handleDelete = (id: string) => {
    setDeleting(id);
    deleteCar(
      { id },
      {
        onSuccess: async () => {
          toast.success("Car has been deleted");
          await utils.cars.getAll.invalidate();
        },
        onError: (err) => {
          toast.error(err.message);
        },
        onSettled: () => {
          setDeleting("");
        },
      },
    );
  };

  return (
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
      {isPending && (
        <div className="flex w-full items-center justify-center gap-x-2">
          <Spinner size="sm" /> Loading Cars
        </div>
      )}
      <div className="odd:*:bg-gray-50">
        {cars?.data?.map((car) => (
          <div
            key={car.id}
            className="flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100"
          >
            <div className="h-fit w-[150px] rounded-full bg-slate-100">
              <Image
                src={car.images[0] ?? "/images/cars/car3.jpg"}
                alt="..."
                width={150}
                height={150}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
            <div className="flex w-full justify-between gap-y-2">
              <div>
                <Link
                  href={`/dashboard/cars/${car.id}/edit`}
                  className="hover:underline"
                >
                  {car.name}
                </Link>
                <div className="text-sm text-gray-500">
                  Status:{" "}
                  <span className="font-semibold"> {car.availability}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => !isDeleting && handleDelete(car.id)}
                  isLoading={deleting === car.id}
                  variant="bordered"
                  size="sm"
                  className="border-red-600 text-red-600"
                >
                  <Trash size={14} />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
