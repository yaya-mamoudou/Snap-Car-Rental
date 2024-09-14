import { z } from "zod";

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters')
})

export const signupSchema = z.object({
    fullname: z.string(),
    email: z.string().email("This is not a valid email"),
    phone_number: z.string(),
    username: z.string(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
    drivers_lisence: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    insurance: z.string(),
});

export const profileUpdateSchema = z.object({
    fullname: z.string().optional(),
    phone_number: z.string().optional(),
    username: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
    drivers_lisence: z.string().optional(),
    insurance: z.string().optional(),
});