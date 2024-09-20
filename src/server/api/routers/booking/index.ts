import { BookingStatus, CarAvailability } from "@prisma/client"
import { createTRPCRouter, errorHandlingMiddleware, protectedProcedure, roleMiddleware } from "../../trpc"
import { createBookingSchema } from "./schema"
import { v4 as uuid } from 'uuid'
import { paginationSchema } from "~/data/mock"
export const bookingRouter = createTRPCRouter({
    create: protectedProcedure
        .use(roleMiddleware(['CLIENT', 'ADMIN']))
        .use(errorHandlingMiddleware)
        .input(createBookingSchema)
        .mutation(async ({ ctx, input }) => {
            const res1 = ctx.db.booking.create({
                data: {
                    ...input,
                    userId: ctx.session.id,
                    ref: uuid(),
                    status: BookingStatus.PENDIND_PAYMENT,
                    start_date: new Date(input.start_date),
                    end_date: new Date(input.end_date)
                }
            })
            const res2 = ctx.db.car.update({ where: { id: input.carId }, data: { availability: CarAvailability.BOOKED } })

            const res = await Promise.all([res1, res2])

            return { ref: res[0].ref }
        }),
    getAll: protectedProcedure.use(roleMiddleware(['ADMIN', 'CLIENT'])).use(errorHandlingMiddleware)
        .input(paginationSchema.partial())
        .query(async ({ ctx, input }) => {
            const { sort = 'asc', per_page = 8, page = 1 } = input

            const list = ctx.db.booking.findMany({ include: { user: true, car: true }, skip: per_page * (page - 1), take: per_page, orderBy: { createdAt: sort } })
            const count = ctx.db.booking.count()

            const res = await Promise.all([list, count])

            const totalPages = Math.ceil(res[1] / per_page)

            return {
                meta: { per_page: per_page, current_page: page, total_pages: totalPages },
                data: res[0]
            }
        })
})