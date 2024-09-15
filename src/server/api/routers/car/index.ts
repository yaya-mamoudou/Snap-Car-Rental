import {
    createTRPCRouter,
    errorHandlingMiddleware,
    protectedProcedure,
    publicProcedure,
    roleMiddleware
} from "~/server/api/trpc";
import { createCarSchema, updateCarSchema } from "./schema";
import { z } from "zod";
import { omit } from "lodash";

export const carRouter = createTRPCRouter({
    create: protectedProcedure
        .use(roleMiddleware('ADMIN'))
        .use(errorHandlingMiddleware)
        .input(createCarSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.car.create({ data: input })
        }),
    update: protectedProcedure
        .use(roleMiddleware("ADMIN"))
        .use(errorHandlingMiddleware)
        .input(updateCarSchema)
        .mutation(async ({ ctx, input }) => {
            const car = await ctx.db.car.update({ where: { id: input.carId }, data: omit(input, ['carId']) })
            return car
        }),
    getCategories: publicProcedure.use(errorHandlingMiddleware).query(({ ctx }) => {
        return ctx.db.carCategory.findMany()
    }),
    getAll: publicProcedure.use(errorHandlingMiddleware).query(({ ctx }) => {
        return ctx.db.car.findMany()
    }),
    getById: publicProcedure.use(errorHandlingMiddleware).input(z.object({
        id: z.string()
    })).query(({ ctx, input }) => {
        return ctx.db.car.findUnique({ where: { id: input.id } })
    }),
    deleteCar: protectedProcedure
        .use(roleMiddleware('ADMIN'))
        .use(errorHandlingMiddleware)
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.db.car.delete({ where: { id: input.id } })
        })
});


