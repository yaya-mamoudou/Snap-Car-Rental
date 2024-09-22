"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { CarAvailability } from "@prisma/client";
import { useFormik } from "formik";
import React, { ReactElement } from "react";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import Select from "~/components/common/select";
import { status } from "~/data/mock";
import { createCarFormSchema } from "~/schemas";
import { api } from "~/trpc/react";

type Props = {
  children: React.ReactNode;
};

export default function CreateCarDialog(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: categories } = api.cars.getCategories.useQuery();
  const utils = api.useUtils();

  const { mutate, isPending } = api.cars.create.useMutation();
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
    },
    validationSchema: createCarFormSchema,
    onSubmit: (formData) => {
      mutate(formData, {
        onSuccess: () => {
          toast.success("Your car has been created!!");
          formik.resetForm();
          utils.cars.getAll.invalidate();
          onOpenChange();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <>
      {React.Children.map(props.children, (child) => {
        // Check if child is a valid React element and can receive props
        if (React.isValidElement(child)) {
          // Clone the element and attach the onClick handler
          return React.cloneElement(child as ReactElement<any>, {
            onClick: (e: any) => {
              // Call existing onClick, if it exists
              if (child.props.onClick) {
                child.props.onClick(e);
              }
              // Call the provided onChildClick function
              onOpen();
            },
          });
        }
        return child; // Return as is if it's not a valid React element
      })}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formik.handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                Create Car
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12 gap-4">
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
                        formik.touched.availability &&
                        formik.errors.availability
                      }
                      isInvalid={
                        formik.touched.availability &&
                        !!formik.errors.availability
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
                      errorMessage={
                        formik.touched.engine && formik.errors.engine
                      }
                      isInvalid={
                        formik.touched.engine && !!formik.errors.engine
                      }
                      isRequired
                      label="Engine"
                      variant="bordered"
                      required
                    />
                  </div>
                  <div className="col-span-6 flex gap-2">
                    <Input
                      label="Daily Price"
                      variant="bordered"
                      required
                      isRequired
                      {...formik.getFieldProps("daily_price")}
                      errorMessage={
                        formik.touched.daily_price && formik.errors.daily_price
                      }
                      isInvalid={
                        formik.touched.daily_price &&
                        !!formik.errors.daily_price
                      }
                    />
                    <Input
                      label="Montly Price"
                      variant="bordered"
                      {...formik.getFieldProps("monthly_price")}
                      errorMessage={
                        formik.touched.monthly_price &&
                        formik.errors.monthly_price
                      }
                      isInvalid={
                        formik.touched.monthly_price &&
                        !!formik.errors.monthly_price
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
                      errorMessage={
                        formik.touched.luggages && formik.errors.luggages
                      }
                      isInvalid={
                        formik.touched.luggages && !!formik.errors.luggages
                      }
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
                        formik.touched.transmission &&
                        formik.errors.transmission
                      }
                      isInvalid={
                        formik.touched.transmission &&
                        !!formik.errors.transmission
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
                        formik.touched.drive_train &&
                        !!formik.errors.drive_train
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
                        formik.touched.description &&
                        !!formik.errors.description
                      }
                      label="Description"
                      variant="bordered"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  type="button"
                  variant="bordered"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button type="submit" isLoading={isPending} color="primary">
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
