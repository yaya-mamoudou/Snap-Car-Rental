import React from "react";
import { DatePickerProps, DatePicker as DP } from "@nextui-org/react";
import { now, getLocalTimeZone, today } from "@internationalized/date";

type Props = DatePickerProps & {
  withTime?: boolean;
  minToday?: boolean;
};

export default function DatePicker({ withTime, minToday, ...props }: Props) {
  return (
    <DP
      hideTimeZone
      {...(minToday ? { minValue: today(getLocalTimeZone()) } : {})}
      {...(withTime ? { defaultValue: now(getLocalTimeZone()) } : {})}
      {...props}
    />
  );
}
