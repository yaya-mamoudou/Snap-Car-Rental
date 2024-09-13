'use server'

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const cookieStore = cookies()

export async function setCookie(name: string, value: string, options: Partial<ResponseCookie> | undefined = {}) {
    cookieStore.set(name, value, options)
}

export async function getCookie(name: string) {
    return cookieStore.get(name)?.value
}