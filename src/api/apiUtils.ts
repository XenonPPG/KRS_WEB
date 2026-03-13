import {IsSuccessful} from "@/scripts/utils.ts";
import {toast} from "vue-sonner";
import {useGlobalLoading} from "@/stores/loading.ts";

export async function GenericRequest(
    func: Function,
    successMessage: string | null = null,
    errorMessage: string | null = null) {

    const loading = useGlobalLoading()
    loading.loading = true

    let error: boolean
    let result: any

    try {
        result = await func()
        error = !IsSuccessful(result.status)
    } catch {
        error = true
    }

    loading.loading = false

    if (error) {
        if (errorMessage) toast.error(errorMessage)
        return undefined
    }

    if(successMessage) toast.success(successMessage)

    return result
}