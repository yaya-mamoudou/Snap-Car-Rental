"use client";
import React, { cloneElement, isValidElement, ReactElement } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Link,
  Dropdown,
  Textarea,
} from "@nextui-org/react";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import Select from "~/components/common/select";
import { engines, status, wheel } from "~/data/mock";

type Props = {
  children: React.ReactNode;
};

export default function CreateCarDialog(props: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Car
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <Input autoFocus label="Car Name" variant="bordered" />
                  </div>
                  <div className="col-span-6">
                    <Select
                      labelPlacement="inside"
                      data={status}
                      label="Status"
                    />
                  </div>
                  <div className="col-span-6">
                    <Select
                      labelPlacement="inside"
                      data={wheel}
                      label="Wheel"
                    />
                  </div>
                  <div className="col-span-6">
                    <Select
                      labelPlacement="inside"
                      data={engines}
                      label="Engine"
                    />
                  </div>
                  <div className="col-span-6 flex gap-x-2">
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
                  <div className="col-span-6 flex gap-2">
                    <Input label="Daily Price" variant="bordered" />
                    <Input label="Montly Price" variant="bordered" />
                  </div>
                  <div className="col-span-12">
                    <Textarea
                      classNames={{ input: "border-none focus:ring-0 p-0" }}
                      label="Montly Price"
                      type=""
                      variant="bordered"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
