import {ref} from 'vue'
import {defineStore} from 'pinia'
import {GetJWTData} from "@/scripts/api/JWT.ts";
import type {User} from "@/scripts/user.model.ts";

export const useJWTData = defineStore('JWT data', () => {
    const accessToken = ref('')
    const payload = ref<User>()

    function LoadData() {
        const result = GetJWTData()
        if (!result) return

        [accessToken.value, payload.value] = result
    }

    return {accessToken, payload}
})
