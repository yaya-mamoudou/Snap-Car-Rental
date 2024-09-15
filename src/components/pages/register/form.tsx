"use client";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Gender } from "@prisma/client";
import { useFormik } from "formik";
import { omit } from "lodash";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import Upload from "~/components/common/upload";
import { saveUserInfo } from "~/server-actions/auth";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";
import { ProfileType, signupFormSchema } from "~/types";
import { convertFileToBase64 } from "~/utils/convert-file-to-base64";

export default function RegisterForm() {
  const { mutate, isPending } = api.users.signup.useMutation();
  const utils = api.useUtils();
  const query = useSearchParams();
  const redirect = query.get("redirect");
  const { refetch } = api.users.me.useQuery(undefined, { enabled: false });
  const setUser = useGlobalStore((state) => state.setUser);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phone_number: "",
      username: "",
      gender: "" as Gender,
      password: "",
      password_confirmation: "",
      drivers_lisence: "",
      insurance: "",
    },
    validationSchema: signupFormSchema,
    onSubmit: async (e) => {
      const data = omit(e, ["password_confirmation"]);
      data.phone_number = String(data.phone_number);
      data.insurance = (await convertFileToBase64(
        data.insurance as unknown as File,
      )) as string;
      data.drivers_lisence = (await convertFileToBase64(
        data.drivers_lisence as unknown as File,
      )) as string;

      mutate(data, {
        onSuccess: async (data) => {
          await saveUserInfo(JSON.stringify(data));
          const res = await refetch();
          setUser(res.data as ProfileType);
          toast.success("You have successfully created your account.✅");
          router.replace(redirect ?? "/dashboard");
        },
        onError(error, variables) {
          toast.error(`${error.message}❌`, {});
          console.log(error.message, variables);
        },
      });
    },
  });

  const handleFileChange = (files: File[], name: string) => {
    const event = {
      target: {
        value: files[0],
        name,
      },
    };

    formik.handleBlur(event);
    formik.handleChange(event);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
      <div className="grid grid-cols-12 gap-x-0 gap-y-4 md:gap-x-4">
        <div className="col-span-12 md:col-span-6">
          <Input
            id="fullname"
            label="Full Name"
            labelPlacement="outside"
            placeholder="Enter full name"
            variant="bordered"
            {...formik.getFieldProps("fullname")}
            errorMessage={formik.touched.fullname && formik.errors.fullname}
            isInvalid={formik.touched.fullname && !!formik.errors.fullname}
            isRequired
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            label="Phone Number"
            labelPlacement="outside"
            placeholder="Enter phone number"
            variant="bordered"
            {...formik.getFieldProps("phone_number")}
            errorMessage={
              formik.touched.phone_number && formik.errors.phone_number
            }
            isInvalid={
              formik.touched.phone_number && !!formik.errors.phone_number
            }
            type="number"
            isRequired
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            label="Username"
            labelPlacement="outside"
            placeholder="Enter username"
            variant="bordered"
            {...formik.getFieldProps("username")}
            errorMessage={formik.touched.username && formik.errors.username}
            isInvalid={formik.touched.username && !!formik.errors.username}
            isRequired
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            label="Email"
            labelPlacement="outside"
            placeholder="Enter email"
            type="email"
            variant="bordered"
            {...formik.getFieldProps("email")}
            errorMessage={formik.touched.email && formik.errors.email}
            isInvalid={formik.touched.email && !!formik.errors.email}
            isRequired
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            label="Password"
            labelPlacement="outside"
            placeholder="✹✹✹✹✹✹✹✹✹✹✹✹"
            variant="bordered"
            {...formik.getFieldProps("password")}
            errorMessage={formik.touched.password && formik.errors.password}
            isInvalid={formik.touched.password && !!formik.errors.password}
            type="password"
            isRequired
          />
        </div>
        <div className="col-span-12 md:col-span-6">
          <Input
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="✹✹✹✹✹✹✹✹✹✹✹✹"
            variant="bordered"
            {...formik.getFieldProps("password_confirmation")}
            errorMessage={
              formik.touched.password_confirmation &&
              formik.errors.password_confirmation
            }
            isInvalid={
              formik.touched.password_confirmation &&
              !!formik.errors.password_confirmation
            }
            isRequired
            type="password"
          />
        </div>

        <div className="col-span-12">
          <RadioGroup
            aria-controls=""
            classNames={{ label: "text-sm text-black" }}
            {...formik.getFieldProps("gender")}
            aria-label="gender"
            label="Gender"
            errorMessage={formik.touched.gender && formik.touched.gender}
            isInvalid={formik.touched.gender && !!formik.errors.gender}
            isRequired
            className="*:flex-row *:gap-x-4 *:text-sm"
          >
            <Radio classNames={{ label: "text-sm" }} value="MALE">
              Male
            </Radio>
            <Radio classNames={{ label: "text-sm" }} value="FEMALE">
              Female
            </Radio>
            <Radio classNames={{ label: "text-sm" }} value="OTHER">
              Other
            </Radio>
          </RadioGroup>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Upload
            accept="image/*,.pdf"
            required
            label="Upload Driver's Lisence"
            errorMessage={
              (formik.touched.drivers_lisence &&
                formik.errors.drivers_lisence) ??
              ""
            }
            onChange={(e) => handleFileChange(e, "drivers_lisence")}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <Upload
            errorMessage={
              (formik.touched.insurance && formik.errors.insurance) ?? ""
            }
            onChange={(e) => handleFileChange(e, "insurance")}
            accept="image/*,.pdf"
            required
            label="Upload Insurance"
          />
        </div>
      </div>

      <Button
        isLoading={isPending}
        className="mt-6 font-semibold"
        type="submit"
      >
        Register
      </Button>

      <div className="mt-4 text-sm">
        Already have an account?{" "}
        <Link
          href={`/login${redirect && `?redirect=${redirect}`}`}
          className="font-semibold text-primary"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
