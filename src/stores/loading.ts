import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useGlobalLoading = defineStore('global loading', () => {
    const loading = ref(false)

    return {loading}
})
