import jwt from 'jsonwebtoken';

// Helper function to generate a token (valid for 1 year)
export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET ?? 'yourSecretKey', {
        expiresIn: '1y', // Token valid for 1 year
    });
};