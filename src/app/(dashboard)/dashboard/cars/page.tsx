import CarsList from "~/components/pages/cars";

export default async function CarsPage() {
  return (
    <div>
      <h1 className="mt-10 text-2xl font-bold text-black">Cars</h1>
      <CarsList />
    </div>
  );
}
