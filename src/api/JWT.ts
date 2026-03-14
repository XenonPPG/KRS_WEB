import {jwtDecode, InvalidTokenError} from 'jwt-decode'
import type {User} from "@/api/controllers/user/user.model.ts";
import {toast} from "vue-sonner";

export function getCookie(name: string): string | null {
    const match = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
    )
    return match ? decodeURIComponent(match[1] as string) : null
}

export function GetJWTData(): [string, User] | undefined {
    let token = ""
    let payload = undefined

    const raw = getCookie('access_token')
    if (!raw) {
        return undefined
    }

    try {
        token = raw
        payload = jwtDecode<User>(raw)
    } catch (e) {
        if (e instanceof InvalidTokenError) {
            toast.error('Невалидный токен')
        } else {
            toast.error('Неизвестная ошибка')
        }
    }

    if (!payload) return undefined

    return [token, payload]
}