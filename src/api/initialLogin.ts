import {useJWTData} from "@/stores/jwtData.ts";
import {serviceAPI} from "@/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import {useUserData} from "@/stores/userData.ts";
import {pinia} from "@/pinia.ts";
import {GetUser} from "@/api/controllers/user/user.controller.ts";

export async function InitialLogin() {
    const jwtData = useJWTData(pinia)
    const userData = useUserData(pinia)

    if (userData.initialized) return

    // get jwt data
    jwtData.LoadData()

    // if no payload
    if (!jwtData.payload) {
        const res = await serviceAPI.authRefreshCreate()

        if (!IsSuccessful(res.status)){
            userData.Logout()
            return
        }

        jwtData.LoadData()
    }

    // get user
    const res = await GetUser((jwtData.payload as any).user_id)
    const user = userData.ParseUserData(res.data.user)
    if (!user) {
        toast.error("Не удалось загрузить данные")
        return
    }

    userData.user = user
    userData.loggedIn = true
    userData.initialized = true
}