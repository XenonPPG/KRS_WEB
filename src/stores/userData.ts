import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ColorTheme} from "@/scripts/colorTheme.ts";

export const useUserData = defineStore('user data', () => {
    const loggedIn = ref(false)
    const id = ref(0)
    const name = ref('')
    const colorTheme = ref<ColorTheme>(ColorTheme.Auto)

    function Logout(){
        loggedIn.value = false
        id.value = 0
        name.value = ''
        colorTheme.value = ColorTheme.Auto

        console.log('Logged out')
    }

    return {id, loggedIn, name, colorTheme, Logout}
})
