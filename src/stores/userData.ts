import {ref} from 'vue'
import {defineStore} from 'pinia'
import {UserV1ColorTheme, UserV1UserRole} from "@/api/gen/Api.ts";
import type {User} from "@/api/controllers/user/user.model.ts";

const EmptyUser = {
    colorTheme: UserV1ColorTheme.ColorThemeAUTO,
    id: 0,
    login: "",
    role: UserV1UserRole.UserRoleDEFAULT,
}

export const useUserData = defineStore('user data', () => {
    const loggedIn = ref(false)
    const initialized = ref(false)
    const user = ref<User>(EmptyUser)

    function Logout() {
        loggedIn.value = false
        initialized.value = false
        user.value = EmptyUser

        console.log('Logged out')
    }

    function ParseUserData(data: any): User | undefined {
        let u: User
        try{
            u = {
                id: parseInt(data.id),
                login: data.login,
                role: data.role,
                colorTheme: parseInt(data.colorTheme) as UserV1ColorTheme,
            }
        } catch{
            console.log('Failed to parse user data')
            return undefined
        }

        return u
    }

    return {user, loggedIn, initialized, Logout, ParseUserData}
})
