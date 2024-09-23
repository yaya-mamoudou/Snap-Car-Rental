import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MEGABYTE = 1024 * 1024
const MAX_FILE_SIZE = MEGABYTE * 5; // 5MB

const fileSchema =
    yup.mixed<File>()
        .test('fileSize', `Each file must be < ${MAX_FILE_SIZE / MEGABYTE} MB`, (file) => {
            return file && file.size <= MAX_FILE_SIZE;
        })
        .test('fileType', 'Unsupported file type', (file) => {
            return file && SUPPORTED_FORMATS.includes(file.type);
        })
        .required('At least one file is required')


export const loginFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})

export const createCarFormSchema = yup.object({
    name: yup.string().required(),
    availability: yup.string().oneOf(['BOOKED', 'AVAILABLE', 'UNAVAILABLE']).required(),
    categoryId: yup.string().required(),
    engine: yup.string().required(),
    daily_price: yup.number().required(),
    monthly_price: yup.number().optional(),
    seats: yup.number().required(),
    luggages: yup.number().required(),
    style: yup.string().required(),
    fuel: yup.string().required(),
    description: yup.string().optional(),
    transmission: yup.string().required(),
    drive_train: yup.string().required(),
    MPG: yup.string().optional(),
    features: yup.string().optional(),
    images: yup.array(fileSchema)
})

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