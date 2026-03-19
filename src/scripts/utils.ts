import {toast} from "vue-sonner";
import router from "@/router.ts";

export function IsSuccessful(status: number): boolean {
    return status >= 200 && status <= 299
}

export function CopyText(text: string) {
    navigator.clipboard.writeText(text).then(_ => toast.success("Скопировано!"))
}

export function Clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max)
}

export function OmitNulls<T extends object>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null)
    ) as Partial<T>;
}

export function OmitSameValues<T extends Record<string, unknown>>(a: T, b: T): Partial<T> {
    return Object.keys(a).reduce((diff, key) => {
        if (a[key] !== b[key]) {
            diff[key as keyof T] = b[key] as T[keyof T];
        }
        return diff;
    }, {} as Partial<T>);
}

export async function PushUnauthorized(){
    await router.push('/unauthorized')
}