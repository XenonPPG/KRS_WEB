import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ColorTheme} from "@/scripts/colorTheme.ts";

export const useUserData = defineStore('user data', () => {
    const loggedIn = ref(false)
    const id = ref(0)
    const name = ref('')
    const colorTheme = ref<ColorTheme>(ColorTheme.Auto)

    return {id, loggedIn, name, colorTheme}
})
