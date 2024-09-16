import jwt from 'jsonwebtoken';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

// Helper function to generate a token (valid for 1 year)
export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET ?? 'yourSecretKey', {
        expiresIn: '1y', // Token valid for 1 year
    });
};

export const authRouter = (router: AppRouterInstance, path: string, redirect = location.pathname) => {
    // router.replace(`${path}?redirect=${redirect}`,)
    location.href = `${path}?redirect=${redirect}`
}