import { setCookie } from ".";

export const saveUserInfo = async (data: string) => {
    await setCookie("user", data, {
        httpOnly: true,
        path: "/",
    });
    return data
}