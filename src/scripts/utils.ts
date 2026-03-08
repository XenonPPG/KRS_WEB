import {toast} from "vue-sonner";

export function IsSuccessful(status: number): boolean {
    return status >= 200 && status <= 299
}

export function CopyText(text: string) {
    navigator.clipboard.writeText(text).then(_ => toast.success("Скопировано!"))
}