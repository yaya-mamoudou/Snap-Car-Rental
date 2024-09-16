import {
    createTRPCRouter,
    errorHandlingMiddleware,
    protectedProcedure
} from "~/server/api/trpc";

export const globalRouter = createTRPCRouter({
    getStats: protectedProcedure.use(errorHandlingMiddleware).query(async (ops) => {
        const users = ops.ctx.db.user.findMany({ select: { id: true } })
        const bookings = ops.ctx.db.booking.findMany({ select: { id: true } })
        const cars = ops.ctx.db.car.findMany({ select: { id: true } })

        const res = await Promise.all([bookings, users, cars])
        return [
            { type: 'booking', name: 'Bookings', count: res[0].length },
            { type: 'users', name: 'Users', count: res[1].length },
            { type: 'cars', name: 'Cars', count: res[2].length },
        ]
    }),

});


