import { z } from "zod";
import * as yup from 'yup'
import { Roles } from "@prisma/client";

export enum BookingStatus {
    PAID = 'Paid',
    PAID_AND_ONGOING = 'Paid and Ongoing',
    PENDIND_PAYMENT = 'Pending Payment',
    EXPIRED = 'Expired'
}

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

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 1024 * 1024 * 2; // 5MB

const fileSchema =
    yup.mixed<File>()
        .test('fileSize', 'File size is too large', (file) => {
            return file && file.size <= MAX_FILE_SIZE;
        })
        .test('fileType', 'Unsupported file type', (file) => {
            return file && SUPPORTED_FORMATS.includes(file.type);
        })
        .required('At least one file is required')


export const signupFormSchema = yup.object({
    fullname: yup.string().required(),
    email: yup.string().email("This is not a valid email").required(),
    phone_number: yup.number().required(),
    username: yup.string().required(),
    gender: yup.string().oneOf(['MALE', 'FEMALE', 'OTHER']).required(),
    drivers_lisence: fileSchema,
    insurance: fileSchema,
    password: yup.string().min(8, "Password must be at least 8 characters long").required(),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), ''], 'Passwords must match')
        .required('Password confirmation is required'),
});

export const loginFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export type ProfileType = z.infer<typeof signupSchema> & {
    role: Roles
}