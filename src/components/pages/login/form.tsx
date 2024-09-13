"use client";
import { useFormik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import { setCookie } from "~/server-actions";
import { saveUserInfo } from "~/server-actions/auth";
import { api } from "~/trpc/react";
import { loginFormSchema } from "~/types";

export default function LoginForm() {
  const { mutate, isPending } = api.users.login.useMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: async (e) => {
      mutate(e, {
        onSuccess: async (e) => {
          console.log("started");

          const num = await saveUserInfo(JSON.stringify(e));

          console.log(num);

          toast.success("Welcome back.✅");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4">
      <Input
        label="Username"
        labelPlacement="outside"
        placeholder="Enter username"
        variant="bordered"
        {...formik.getFieldProps("email")}
        errorMessage={formik.touched.email && formik.errors.email}
        isInvalid={formik.touched.email && !!formik.errors.email}
        isRequired
        required
      />

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
        required
      />

      <Button
        isLoading={isPending}
        className="mt-6 font-semibold"
        type="submit"
      >
        Login
      </Button>

      <div className="mt-4 text-sm">
        {"Don't have an account?"}{" "}
        <Link href="/register" className="font-semibold text-primary">
          Register
        </Link>
      </div>
    </form>
  );
}
