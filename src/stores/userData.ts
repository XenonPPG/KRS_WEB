import {ref} from 'vue'
import {defineStore} from 'pinia'
import {ColorTheme} from "@/scripts/colorTheme.ts";

export const useUserData = defineStore('user data', () => {
    const colorTheme = ref<ColorTheme>(ColorTheme.Auto)

    return {colorTheme}
})
