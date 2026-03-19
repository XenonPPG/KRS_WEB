import {GenericRequest} from "@/api/apiUtils.ts";
import {serviceAPI} from "@/api/InitAPI.ts";
import {UserV1ColorTheme, UserV1UserRole} from "@/api/gen/Api.ts";
import {OmitNulls} from "@/scripts/utils.ts";

export async function GetAllUsers(limit: number, offset: number, ascendingOrder: boolean) {
    return await GenericRequest(async () => await serviceAPI.userList({
        limit: limit,
        offset: offset,
        ascending_order: ascendingOrder
    }), undefined, "Не удалось загрузить")
}

export async function CreateUser(login: string, password: string, colorTheme: UserV1ColorTheme) {
    return await GenericRequest(async () => await serviceAPI.userCreate({
        login: login,
        password: password,
        colorTheme: colorTheme,
        role: UserV1UserRole.UserRoleDEFAULT
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
    colorTheme: UserV1ColorTheme | undefined,
    needNotify: boolean = false) {

    return await GenericRequest(async () => await serviceAPI.userUpdate(id.toString(), OmitNulls({
            login: login,
            role: role,
            colorTheme: colorTheme !== undefined ? colorTheme : undefined
        })),
        needNotify ? "Данные обновлены" : undefined,
        needNotify ? "Не удалось обновить" : undefined)
}

export async function DeleteUser(id: number) {
    return await GenericRequest(async () => await serviceAPI.userDelete(id),
        "Пользователь удален",
        "Ошибка")
}

export async function UpdatePassword(id: number, oldPassword: string, newPassword: string){
    return await GenericRequest(async () => await serviceAPI.userPasswordUpdate({
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword
    }), "Пароль обновлен!", "Произошла ошибка")
}