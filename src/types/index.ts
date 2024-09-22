import type { Roles } from "@prisma/client";
import { z } from "zod";
import { signupSchema } from "~/server/api/routers/user/schema";

export enum BookingStatus {
    PAID = 'Paid',
    PAID_AND_ONGOING = 'Paid and Ongoing',
    PENDIND_PAYMENT = 'Pending Payment',
    EXPIRED = 'Expired'
}

export type ProfileType = z.infer<typeof signupSchema> & {
    role: Roles
}

export type ActiveBookingType = {
    carId: string;
    start_date: string
    end_date: string
    number_of_days: number,
    dropoff_location_id: string,
    pickup_location_id: string
}

export type DropdownItemType = { label: string, value: string }