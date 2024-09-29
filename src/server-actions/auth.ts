'use server'
import { deleteCookie, setCookie } from ".";

export const saveUserInfo = async (data: string) => {
    return setCookie("user", data);
}

export const logout = async () => {
    return deleteCookie('user').then(item => {
        console.log("Done", item);
        return item
    })
}