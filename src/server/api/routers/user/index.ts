import { TRPCError } from "@trpc/server";
import bcrypt from 'bcryptjs';
import { generateToken } from "~/helpers";
import {
    createTRPCRouter,
    errorHandlingMiddleware,
    protectedProcedure,
    publicProcedure
} from "~/server/api/trpc";
import { loginSchema, profileUpdateSchema, signupSchema } from "./schema";
import { uploadFiles } from "~/utils/uploadFile";

export const userRouter = createTRPCRouter({
    signup: publicProcedure
        .use(errorHandlingMiddleware)
        .input(signupSchema)
        .mutation(async ({ ctx, input }) => {
            const { email, ...rest } = input

            const existingUser = await ctx.db.user.findUnique({ where: { email } });

            if (existingUser) {
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'Email already exists',
                });
            }

            const images = await Promise.all([uploadFiles([input.insurance], 'insurrance'), uploadFiles([input.drivers_lisence], 'drivers_lisence')])

            input.drivers_lisence = images[0][0]!
            input.insurance = images[1][0]!

            // Hash the password before saving to the database
            const hashedPassword = await bcrypt.hash(rest.password, 10);
            const user = await ctx.db.user.create({
                data: {
                    ...input,
                    password: hashedPassword
                }
            })
            const token = generateToken(user.id);

            return { token, user }
        }),
    login: publicProcedure
        .use(errorHandlingMiddleware)
        .input(loginSchema)
        .mutation(async ({ ctx, input }) => {
            console.log(ctx.session);

            const { email, password } = input;

            // Find the user by email
            const user = await ctx.db.user.findUnique({ where: { email } });
            if (!user) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Invalid email or password',
                });
            }

            // Compare the provided password with the stored hash
            const isPasswordValid = await bcrypt.compare(password, user.password!);

            if (!isPasswordValid) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password',
                });
            }

            // Generate a token
            const token = generateToken(user.id);

            return { token, user };
        }),
    me: protectedProcedure.query((ops) => {
        return ops.ctx.db.user.findUnique({ where: { id: ops.ctx.session.user.id } })
    }),
    updateProfile: protectedProcedure.input(profileUpdateSchema).mutation(async ({ ctx, input }) => {
        return ctx.db.user.update({ where: { id: ctx.session.user.id }, data: input })
    }),
    getAllUsers: publicProcedure.query((ops) => {
        return ops.ctx.db.user.findMany({ skip: 0, take: 10 })
    })
});


