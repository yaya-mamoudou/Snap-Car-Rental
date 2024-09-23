"use client";
import { Textarea } from "@nextui-org/react";
import type { CarAvailability } from "@prisma/client";
import { useFormik } from "formik";
import { omit, uniqueId } from "lodash";
import { DollarSign, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import Select from "~/components/common/select";
import Upload from "~/components/common/upload";
import { status } from "~/data/mock";
import { createCarFormSchema } from "~/schemas";
import { api } from "~/trpc/react";
import { convertFileToBase64 } from "~/utils/convert-file-to-base64";

const uuid = uniqueId;

export default function DashboardCarsPage() {
  const params: Record<"car-slug", string> = useParams();
  const carSlug = params["car-slug"];
  const { data: car } = api.cars.getById.useQuery({ id: carSlug });
  const { data: categories } = api.cars.getCategories.useQuery();
  const utils = api.useUtils();
  const { mutate, isPending } = api.cars.update.useMutation();
  const [previews, setPreviews] = useState<{ key: string; url: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      seats: "",
      daily_price: "",
      categoryId: "",
      style: "",
      engine: "",
      transmission: "",
      drive_train: "",
      fuel: "",
      luggages: "",
      MPG: "",
      features: "",
      monthly_price: "",
      availability: "UNAVAILABLE" as CarAvailability,
      description: "",
      images: [] as File[],
    },
    validationSchema: createCarFormSchema,
    enableReinitialize: true,
    onSubmit: (formData) => {
      mutate(
        { carId: carSlug, ...formData, images: previews.map((img) => img.url) },
        {
          onSuccess: () => {
            toast.success("Your car has been Edited!!");
            formik.resetForm();
            utils.cars.getById.invalidate({ id: carSlug });
            utils.booking.getAll.invalidate();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    },
  });

  const handleFileChange = async (files: File[]) => {
    if (files) {
      const event = {
        target: {
          value: files,
          name: "images",
        },
      };

      formik.handleBlur(event);
      formik.handleChange(event);
      let previewsTemp = await Promise.all(
        files.map((item) => convertFileToBase64(item)),
      );
      const previewsTempFormated = previewsTemp.map((img) => ({
        url: img,
        key: uuid(),
      }));

      previewsTempFormated.unshift(...previews);
      setPreviews(previewsTempFormated as typeof previews);
    }
  };

  const handleFileDelete = (index: number, url: string) => {
    if (!url.startsWith("https")) {
      const files = [...formik.values.images];
      files.splice(index, 1);
      formik.setFieldValue("images", files);
    }
    const previewsTemp = [...previews];
    previewsTemp.splice(index, 1);
    setPreviews(previewsTemp);
  };

  useEffect(() => {
    if (car) {
      formik.setValues(omit(car, ["id", "images"]) as typeof formik.values);
      setPreviews(car.images.map((img) => ({ url: img, key: uuid() })));
    }
  }, [car]);

  return (
    <div>
      <div className="mt-4 flex justify-center rounded-lg bg-white px-4 py-4">
        <form onSubmit={formik.handleSubmit} className="w-full md:w-2/3">
          <h1 className="mb-4 mt-10 text-2xl font-bold text-black">Edit Car</h1>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <Upload
                multiple
                onChange={handleFileChange}
                label="Upload Images"
                files={formik.values.images}
                errorMessage={
                  ((formik.touched.images && formik.errors.images) as string) ??
                  ""
                }
              />

              <div className="mt-2 flex flex-wrap gap-2">
                {previews.map((img, index) => (
                  <div
                    key={img.key}
                    onClick={() => handleFileDelete(index, img.url)}
                    className="relative flex size-[70px] items-center justify-center"
                  >
                    <img
                      alt="..."
                      src={img.url}
                      width={70}
                      height={70}
                      className="size-[70px] rounded-md bg-slate-200 object-cover"
                    />
                    <div className="absolute flex size-[25px] cursor-pointer items-center justify-center rounded-full bg-black/70">
                      <Trash className="text-white" size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-6">
              <Input
                {...formik.getFieldProps("name")}
                errorMessage={formik.touched.name && formik.errors.name}
                isInvalid={formik.touched.name && !!formik.errors.name}
                isRequired
                label="Car Name"
                variant="bordered"
                required
              />
            </div>
            <div className="col-span-6">
              <Select
                {...formik.getFieldProps("availability")}
                errorMessage={
                  formik.touched.availability && formik.errors.availability
                }
                isInvalid={
                  formik.touched.availability && !!formik.errors.availability
                }
                isRequired
                required
                labelPlacement="inside"
                selectedKeys={[formik.values.availability]}
                data={status}
                label="Availability"
              />
            </div>
            <div className="col-span-6">
              <Select
                labelPlacement="inside"
                {...formik.getFieldProps("categoryId")}
                selectedKeys={[formik.values.categoryId]}
                errorMessage={
                  formik.touched.categoryId && formik.errors.categoryId
                }
                isInvalid={
                  formik.touched.categoryId && !!formik.errors.categoryId
                }
                isRequired
                required
                data={
                  categories?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) ?? []
                }
                label="Category"
              />
            </div>
            <div className="col-span-6">
              <Input
                {...formik.getFieldProps("engine")}
                errorMessage={formik.touched.engine && formik.errors.engine}
                isInvalid={formik.touched.engine && !!formik.errors.engine}
                isRequired
                label="Engine"
                variant="bordered"
                required
              />
            </div>
            <div className="col-span-6 flex gap-2">
              <Input
                label="Daily Price"
                endContent={<DollarSign size={20} />}
                variant="bordered"
                required
                isRequired
                {...formik.getFieldProps("daily_price")}
                errorMessage={
                  formik.touched.daily_price && formik.errors.daily_price
                }
                isInvalid={
                  formik.touched.daily_price && !!formik.errors.daily_price
                }
              />
              <Input
                label="Montly Price"
                variant="bordered"
                endContent={<DollarSign size={20} />}
                {...formik.getFieldProps("monthly_price")}
                errorMessage={
                  formik.touched.monthly_price && formik.errors.monthly_price
                }
                isInvalid={
                  formik.touched.monthly_price && !!formik.errors.monthly_price
                }
              />
            </div>
            <div className="col-span-6 flex gap-x-2">
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="No of Seats"
                isRequired
                required
                {...formik.getFieldProps("seats")}
                errorMessage={formik.touched.seats && formik.errors.seats}
                isInvalid={formik.touched.seats && !!formik.errors.seats}
              />
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="No of Luggages"
                isRequired
                required
                {...formik.getFieldProps("luggages")}
                errorMessage={formik.touched.luggages && formik.errors.luggages}
                isInvalid={formik.touched.luggages && !!formik.errors.luggages}
              />
            </div>

            <div className="col-span-6 flex gap-x-2">
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="Style"
                isRequired
                required
                {...formik.getFieldProps("style")}
                errorMessage={formik.touched.style && formik.errors.style}
                isInvalid={formik.touched.style && !!formik.errors.style}
              />
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="Fuel"
                isRequired
                required
                {...formik.getFieldProps("fuel")}
                errorMessage={formik.touched.fuel && formik.errors.fuel}
                isInvalid={formik.touched.fuel && !!formik.errors.fuel}
              />
            </div>

            <div className="col-span-6 flex gap-x-2">
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="Transmission"
                isRequired
                required
                {...formik.getFieldProps("transmission")}
                errorMessage={
                  formik.touched.transmission && formik.errors.transmission
                }
                isInvalid={
                  formik.touched.transmission && !!formik.errors.transmission
                }
              />
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="Drive train"
                isRequired
                required
                {...formik.getFieldProps("drive_train")}
                errorMessage={
                  formik.touched.drive_train && formik.errors.drive_train
                }
                isInvalid={
                  formik.touched.drive_train && !!formik.errors.drive_train
                }
              />
            </div>
            <div className="col-span-6 flex gap-x-2">
              <Input
                labelPlacement="inside"
                variant="bordered"
                label="MPG"
                {...formik.getFieldProps("MPG")}
                errorMessage={formik.touched.MPG && formik.errors.MPG}
                isInvalid={formik.touched.MPG && !!formik.errors.MPG}
              />
            </div>
            <div className="col-span-12">
              <Textarea
                classNames={{ input: "border-none focus:ring-0 p-0" }}
                {...formik.getFieldProps("description")}
                errorMessage={
                  formik.touched.description && formik.errors.description
                }
                isInvalid={
                  formik.touched.description && !!formik.errors.description
                }
                label="Description"
                variant="bordered"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button isLoading={isPending} type="submit" color="primary">
              Edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
