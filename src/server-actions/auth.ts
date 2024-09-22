'use server'
import { setCookie } from ".";

export const saveUserInfo = async (data: string) => {
    return setCookie("user", data, {
        httpOnly: true,
        path: "/"
    });
}

export const logout = () => {
    return setCookie('user', '', { httpOnly: true, path: '/', expires: Date.now() })
}