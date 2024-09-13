import { setCookie } from ".";

export const saveUserInfo = async (data: string) => {
    const number = Math.random().toString()
    await setCookie("user", number, {
        httpOnly: true,
        path: "/",
    });
    return number
}