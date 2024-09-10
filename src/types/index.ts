import { z } from "zod";

export enum BookingStatus {
    PAID = 'Paid',
    PAID_AND_ONGOING = 'Paid and Ongoing',
    PENDIND_PAYMENT = 'Pending Payment',
    EXPIRED = 'Expired'
}

export const loginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const signupSchema = z.object({
    fullname: z.string(),
    email: z.string().email("This is not a valid email"),
    phone_number: z.string(),
    username: z.string(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    drivers_lisence: z.string(),
    password: z.string(),
    insurance: z.string(),
})