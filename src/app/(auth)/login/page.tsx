import LoginForm from "~/components/pages/login/form";

export default function Page() {
  return (
    <div className="container flex flex-col items-center justify-center pt-10">
      <div className="w-full md:w-2/3 lg:w-2/5">
        <h1 className="text-2xl font-semibold text-white">Login</h1>
        <div className="mt-10 rounded-lg bg-white p-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
