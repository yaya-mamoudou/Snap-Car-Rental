import { z } from "zod";

export const locationSchema = z.object({
    name: z.string(),
    lng: z.number(),
    lat: z.number(),
})