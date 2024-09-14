import { z } from "zod"

export const createCarSchema = z.object({
    name: z.string(),
    seats: z.string(),
    daily_price: z.string(),
    categoryId: z.string(),
    style: z.string(),
    engine: z.string(),
    transmission: z.string(),
    drive_train: z.string(),
    fuel: z.string(),
    luggages: z.string(),
    MPG: z.string().optional(),
    features: z.string().optional(),
    monthly_price: z.string().optional(),
    description: z.string().optional(),
    availability: z.enum(['AVAILABLE', 'BOOKED', 'UNAVAILABLE'])
})

export const updateCarSchema = z.object({
    carId: z.string()
}).merge(createCarSchema.partial())