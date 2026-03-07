import {toast} from "vue-sonner";

export function CopyText(text: string) {
    navigator.clipboard.writeText(text).then(_ => toast.success("Скопировано!"))
}