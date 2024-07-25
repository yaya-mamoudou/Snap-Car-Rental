"use client";
import { getLocalTimeZone, now, today } from "@internationalized/date";
import { type DatePickerProps, DatePicker as DP } from "@nextui-org/react";

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
