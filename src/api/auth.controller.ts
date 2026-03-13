import {GenericRequest} from "@/api/apiUtils.ts";
import {serviceAPI} from "@/api/InitAPI.ts";

export async function Login(login: string, password: string) {
    return await GenericRequest(async () => await serviceAPI.authLoginCreate({
        login: login,
        password: password
    }))
}

export async function Logout() {
    return await GenericRequest(async () => await serviceAPI.authLogoutCreate())
}

export async function Refresh() {
    return await GenericRequest(async () => await serviceAPI.authRefreshCreate())
}