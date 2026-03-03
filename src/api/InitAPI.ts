import { Api } from '@/api/Api.ts'

export const api = new Api({
    baseUrl: 'http://localhost:3000',
    baseApiParams: {
        credentials: 'include',
    }
}).api