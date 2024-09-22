import { omit } from "lodash";
import { z } from "zod";
import { paginationSchema } from "~/data/mock";
import {
    createTRPCRouter,
    errorHandlingMiddleware,
    protectedProcedure,
    publicProcedure,
    roleMiddleware
} from "~/server/api/trpc";
import { createCarSchema, updateCarSchema } from "./schema";

export const carRouter = createTRPCRouter({
    create: protectedProcedure
        .use(roleMiddleware(['CLIENT']))
        .use(errorHandlingMiddleware)
        .input(createCarSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.car.create({ data: input })
        }),
    update: protectedProcedure
        .use(roleMiddleware(["ADMIN", 'CLIENT']))
        .use(errorHandlingMiddleware)
        .input(updateCarSchema)
        .mutation(async ({ ctx, input }) => {
            const car = await ctx.db.car.update({ where: { id: input.carId }, data: omit(input, ['carId']) })
            if (input.availability === 'AVAILABLE') {
                await ctx.db.booking.updateMany({ where: { carId: input.carId }, data: { status: 'EXPIRED' } })
            }
            return car
        }),
    getCategories: publicProcedure.use(errorHandlingMiddleware).query(({ ctx }) => {
        return ctx.db.carCategory.findMany()
    }),
    addCategory: protectedProcedure.use(errorHandlingMiddleware)
        .use(roleMiddleware(['ADMIN']))
        .input(z.object({ name: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.carCategory.create({ data: { name: input.name } })
        }),
    getAll: publicProcedure.use(errorHandlingMiddleware)
        .input(paginationSchema.partial())
        .query(async ({ ctx, input }) => {
            const { sort = 'asc', per_page = 8, page = 1 } = input
            const shouldBeAvailable = input.filter === 'available'
            const list = ctx.db.car.findMany({ where: { ...shouldBeAvailable && { availability: 'AVAILABLE' } }, skip: per_page * (page - 1), take: per_page, orderBy: { createdAt: sort } })
            const count = ctx.db.car.count()
            const res = await Promise.all([list, count])
            const totalPages = Math.ceil(res[1] / per_page)

            return {
                meta: { per_page: per_page, current_page: page, total_pages: totalPages },
                data: res[0]
            }
        }),
    getById: publicProcedure.use(errorHandlingMiddleware).input(z.object({
        id: z.string()
    })).query(({ ctx, input }) => {
        return ctx.db.car.findUnique({ where: { id: input.id }, include: { category: true } })
    }),
    deleteCar: protectedProcedure
        .use(roleMiddleware(['ADMIN']))
        .use(errorHandlingMiddleware)
        .input(z.object({ id: z.string().optional() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.car.delete({ where: { id: input.id } })
        }),
    getCarAvailability: publicProcedure
        .use(errorHandlingMiddleware)
        .input(z.object({
            id: z.string()
        })).mutation(async ({ ctx, input }) => {
            const car = await ctx.db.car.findUnique({ where: { id: input.id } })
            return
        })
});


