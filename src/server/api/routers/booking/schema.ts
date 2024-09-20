import { z } from "zod";

export const createBookingSchema = z.object({
    start_date: z.string(),
    end_date: z.string(),
    amount: z.number(),
    userId: z.string().optional(),
    carId: z.string(),
    dropoff_location_id: z.string(),
    pickup_location_id: z.string(),
})