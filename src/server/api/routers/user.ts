import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";
import { loginSchema, signupSchema } from "~/types";

export const userRouter = createTRPCRouter({
    signup: publicProcedure
        .input(signupSchema)
        .mutation(async ({ ctx, input }) => {
            ctx.db.user.create({ data: input })
        }),

    login: publicProcedure
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

        }),

    getSecretMessage: protectedProcedure.query(() => {
        return "you can now see this secret message!";
    }),
});
