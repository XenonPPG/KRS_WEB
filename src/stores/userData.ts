import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ColorTheme} from "@/scripts/colorTheme.ts";

export const useUserData = defineStore('user data', () => {
    const loggedIn = ref(false)
    const colorTheme = ref<ColorTheme>(ColorTheme.Auto)

    return {loggedIn, colorTheme}
})
