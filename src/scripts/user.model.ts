import {UserV1ColorTheme, type UserV1UserRole} from "@/scripts/api/Api.ts";

export interface User {
    id: number,
    login: string,
    role: UserV1UserRole,
    colorTheme: UserV1ColorTheme,
}