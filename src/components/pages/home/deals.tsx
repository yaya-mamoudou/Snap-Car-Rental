import Button from "~/components/common/button";

export default function Deals() {
  return (
    <div className="">
      <div className="container flex flex-col items-center py-20">
        <Button
          style={{
            background:
              "linear-gradient(90deg, #1ec5b6 0.00%, #00f1da 100.00%)",
          }}
          className="mx-auto min-w-[200px] rounded-full px-10 py-6 font-bold md:min-w-[400px]"
        >
          Limited SUV Deals
        </Button>
        <p className="mt-6">
          <strong>Rent an SUV</strong> for less than <strong>$60/day</strong>
        </p>
      </div>
      {/* <Image
        alt="car images"
        width={500}
        height={300}
        className="w-full"
        src="/images/SUV deals 2.webp"
      /> */}
    </div>
  );
}
