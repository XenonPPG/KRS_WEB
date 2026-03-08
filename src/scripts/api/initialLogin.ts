import {useJWTData} from "@/stores/jwtData.ts";
import {serviceAPI} from "@/scripts/api/InitAPI.ts";
import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import {useUserData} from "@/stores/userData.ts";

export async function InitialLogin() {
    const jwtData = useJWTData()
    const userData = useUserData()

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
    const res = await serviceAPI.userDetail((jwtData.payload as any).user_id)
    const user = res.data.user
    if (!user) {
        toast.error("Не удалось загрузить данные")
        return
    }

    userData.loggedIn = true
    userData.id = user.id
    userData.name = user.name
    userData.colorTheme = user.colorTheme
}