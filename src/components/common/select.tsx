import { Select as Sel, SelectItem, SelectProps } from "@nextui-org/react";
import { ChangeEvent, FocusEvent } from "react";

type Props = Omit<SelectProps, "children"> & {
  data: { label: string; value: string | number }[];
};

export default function Select(props: Props) {
  const {
    data,
    className,
    classNames,
    onBlur = (prop: FocusEvent<Element, Element>) => {},
    onChange = (prop: ChangeEvent<HTMLSelectElement>) => {},
    labelPlacement = "outside",
    errorMessage,
    ...rest
  } = props;

  return (
    <div className={`${className}`}>
      <Sel
        variant="bordered"
        labelPlacement={labelPlacement}
        classNames={{
          label: [
            `${!errorMessage ? "!text-gray-600" : ""}`,
            // "absolute pointer-events-none origin-top-left subpixel-antialiased block text-foreground-500 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-foreground group-data-[filled-within=true]:pointer-events-auto pb-0 z-20 -translate-y-1/2 group-data-[filled-within=true]:left-0 left-3 text-small group-data-[filled-within=true]:-translate-y-[calc(100%_+_theme(fontSize.small)/2_+_20px)] pe-2 max-w-full text-ellipsis overflow-hidden !text-gray-600 top-[30%]",
            errorMessage ? "!text-red-600" : "",
            classNames?.label,
          ],
          mainWrapper: ["text-gray-600", classNames?.mainWrapper],
          trigger: [
            "h-full border-gray-300 ",
            errorMessage ? "bg-red-50 !border-red-600 !text-red-600" : "",
            classNames?.trigger,
          ],
          value: [
            "text-gray-600",
            errorMessage ? "text-red-600" : "",
            classNames?.value,
          ],
          helperWrapper: ["px-0", classNames?.helperWrapper],
        }}
        errorMessage={errorMessage}
        onChange={(e) => {
          onBlur(e as unknown as FocusEvent<Element, Element>);
          onChange(e);
        }}
        {...rest}
      >
        {data.map((item) => (
          <SelectItem textValue={item.label} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Sel>
    </div>
  );
}
