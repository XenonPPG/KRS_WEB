import {ref, watch} from 'vue'
import {defineStore} from 'pinia'

export const useGlobalLoading = defineStore('global loading', () => {
    const loading = ref(false)
    const showLoading = ref(false)
    let timeoutId: number | null = null

    watch(loading, (newValue) => {
        if (newValue) {
            timeoutId = setTimeout(() => {
                showLoading.value = true
            }, 250)
        } else {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
            }
            showLoading.value = false
        }
    })

    return {loading, showLoading}
})
