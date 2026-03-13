import {Api} from '@/api/gen/Api.ts'

// fetch handler with timeout
const withTimeout = (ms: number) => (input: RequestInfo | URL, init?: RequestInit) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort("API Timeout"), ms)

    return fetch(input, {...init, signal: controller.signal})
        .finally(() => clearTimeout(timeout))
}

export const serviceAPI = new Api({
    baseUrl: 'http://localhost:3000',
    baseApiParams: {
        credentials: 'include',
    },
    customFetch: withTimeout(10000),
}).api