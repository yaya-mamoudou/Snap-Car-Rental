import { createTRPCRouter, errorHandlingMiddleware, protectedProcedure, roleMiddleware } from "../../trpc"
import { createBookingSchema } from "./schema"

export const bookingRouter = createTRPCRouter({
    create: protectedProcedure
        .use(roleMiddleware(['CLIENT', 'ADMIN']))
        .use(errorHandlingMiddleware)
        .input(createBookingSchema)
        .mutation(async ({ ctx, input }) => {
            return
        }),
})