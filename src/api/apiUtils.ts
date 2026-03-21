import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import {useGlobalLoading} from "@/stores/loading.ts";

export async function GenericRequest(
    func: Function,
    successMessage: string | null = null,
    errorMessage: string | null = null) {

    const loading = useGlobalLoading()
    loading.loading = true

    let error = false
    let result: any

    for(let i = 0; i < 3; i++) {
        error = false

        try {
            result = await func()
            error = !IsSuccessful(result.status)
        } catch(e: any) {
            error = true
            console.error(e)
        }

        if (!error) break

        await new Promise(resolve => setTimeout(resolve, 500))
    }

    loading.loading = false

    if (error) {
        if (errorMessage) toast.error(errorMessage)
        return undefined
    }

    if(successMessage) toast.success(successMessage)

    return result
}