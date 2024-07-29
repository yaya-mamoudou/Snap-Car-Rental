import RegisterForm from "~/components/pages/register/form";

export default function Page() {

    return (
        <div className="container py-10 flex justify-center items-center flex-col">
            <div className="w-full md:w-4/5  lg:w-3/5">
                <h1 className="text-2xl text-white font-semibold">Register</h1>
                <div className="bg-white relative rounded-lg p-10 mt-10">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}
