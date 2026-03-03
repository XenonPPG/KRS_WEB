import { Api } from '@/scripts/api/Api.ts'

// fetch handler with timeout
const withTimeout = (ms: number) => (input: RequestInfo | URL, init?: RequestInit) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), ms)

    return fetch(input, { ...init, signal: controller.signal })
        .finally(() => clearTimeout(timeout))
}

export const serviceAPI = new Api({
    baseUrl: 'http://localhost:3000',
    baseApiParams: {
        credentials: 'include',
    },
    customFetch: withTimeout(900),
}).api