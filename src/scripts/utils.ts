import {toast} from "vue-sonner";

export function IsSuccessful(status: number): boolean {
    return status >= 200 && status <= 299
}

export function CopyText(text: string) {
    navigator.clipboard.writeText(text).then(_ => toast.success("Скопировано!"))
}

export function Clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

export function RemoveNulls<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
    ) as Partial<T>;
}