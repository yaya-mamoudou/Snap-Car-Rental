"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import toast from "react-hot-toast";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import { loginFormSchema } from "~/schemas";
import { saveUserInfo } from "~/server-actions/auth";
import { useGlobalStore } from "~/store/globalStore";
import { api } from "~/trpc/react";
import type { ProfileType } from "~/types";

function Form() {
  const query = useSearchParams();
  const redirect = query.get("redirect");
  const setUser = useGlobalStore((state) => state.setUser);
  const utils = api.useUtils();
  const router = useRouter();
  const { mutate, isPending } = api.users.login.useMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginFormSchema,
    onSubmit: async (e) => {
      mutate(e, {
        onSuccess: async (data) => {
          setUser(data.user as ProfileType);
          await saveUserInfo(JSON.stringify(data.token));

          utils.users.me.invalidate();
          router.replace(redirect ?? "/dashboard");
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
        <Link
          href={`/register${redirect && `?redirect=${redirect}`}`}
          className="font-semibold text-primary"
        >
          Register
        </Link>
      </div>
    </form>
  );
}

export default function LoginForm() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}
