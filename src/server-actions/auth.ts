'use server'
import { ProfileType } from "~/types";
import { deleteCookie, getCookie, setCookie } from ".";
import { cookies } from "next/headers";

export const saveUserInfo = async (data: string, hasToken = true) => {
    await setCookie("user", data, {
        httpOnly: true,
        path: "/"
    });
    return data
}