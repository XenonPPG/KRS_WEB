import {GenericRequest} from "@/api/apiUtils.ts";
import {serviceAPI} from "@/api/InitAPI.ts";
import {type ColorTheme, ColorThemeMap} from "@/scripts/colorTheme.ts";
import type {UserV1UserRole} from "@/api/gen/Api.ts";
import {RemoveNulls} from "@/scripts/utils.ts";

export async function GetAllUsers(limit: number, offset: number, ascendingOrder: boolean) {
    return await GenericRequest(async () => await serviceAPI.userList({
        limit: limit,
        offset: offset,
        ascending_order: ascendingOrder
    }), undefined, "Не удалось загрузить")
}

export async function CreateUser(login: string, password: string, colorTheme: ColorTheme) {
    return await GenericRequest(async () => await serviceAPI.userCreate({
        login: login,
        password: password,
        colorTheme: ColorThemeMap[colorTheme],
        role: 0 //TODO: remove role from request
    }), undefined, "Ошибка, попробуйте позже")
}

export async function GetUser(id: number) {
    return await GenericRequest(async () => await serviceAPI.userDetail(id),
        undefined,
        "Пользователь не найден")
}

export async function UpdateUser(
    id: number,
    login: string | undefined,
    role: UserV1UserRole | undefined,
    colorTheme: ColorTheme | undefined,
    needNotify: boolean = false) {

    return await GenericRequest(async () => await serviceAPI.userUpdate(id.toString(), RemoveNulls({
            login: login,
            role: role,
            colorTheme: colorTheme ? ColorThemeMap[colorTheme] : undefined
        })),
        needNotify ? "Данные обновлены" : undefined,
        needNotify ? "Не удалось обновить" : undefined)
}

export async function DeleteUser(id: number) {
    return await GenericRequest(async () => await serviceAPI.userDelete(id),
        "Пользователь удален",
        "Ошибка")
}