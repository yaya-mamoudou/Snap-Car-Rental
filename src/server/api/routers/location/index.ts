import {
    createTRPCRouter,
    errorHandlingMiddleware,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { locationSchema } from "./schema";


export const locationRouter = createTRPCRouter({
    create: protectedProcedure.use(errorHandlingMiddleware).input(locationSchema).mutation(({ ctx, input }) => {
        return ctx.db.locations.create({ data: input })
    }),
    getAll: publicProcedure.use(errorHandlingMiddleware)
        .query(({ ctx }) => {
            return ctx.db.locations.findMany()
        }),
});


