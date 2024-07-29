import Link from "next/link";
import React, { FormEvent } from "react";
import Button from "~/components/common/button";
import Input from "~/components/common/input";
import LoginForm from "~/components/pages/login/form";

export default function Page() {

    return (
        <div className="container pt-10 flex justify-center items-center flex-col">
            <div className="w-full md:w-2/3  lg:w-2/5">
                <h1 className="text-2xl text-white font-semibold">Login</h1>
                <div className="bg-white rounded-lg p-10 mt-10">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
