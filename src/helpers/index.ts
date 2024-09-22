import { differenceInDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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

export const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumSignificantDigits: 4
});

export const getBookingPrices = (props: { start_date?: string, end_date?: string, daily_price?: string, monthly_price?: string }) => {
    const numberOfDays = differenceInDays(
        new Date(props.end_date ?? ''),
        new Date(props.start_date ?? ''),
    );

    const totalDaysPrice = Number(props?.daily_price) * numberOfDays;
    let cost = totalDaysPrice;

    if (numberOfDays % 30 === 0 && props?.monthly_price) {
        const montlyPrices = Number(props?.monthly_price) * (numberOfDays / 30);
        cost = montlyPrices;
    }

    const tax = cost * 0.06;

    return {
        numberOfDays,
        cost,
        tax,
        total_price: cost + tax
    }
}