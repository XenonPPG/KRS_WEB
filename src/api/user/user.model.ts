import {UserV1ColorTheme, type UserV1UserRole} from "@/api/gen/Api.ts";

export interface User {
    id: number,
    login: string,
    role: UserV1UserRole,
    colorTheme: UserV1ColorTheme,
}