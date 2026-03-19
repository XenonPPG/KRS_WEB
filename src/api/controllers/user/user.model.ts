import {UserV1ColorTheme, UserV1UserRole} from "@/api/gen/Api.ts";

export interface User {
    id: number,
    login: string,
    role: UserV1UserRole,
    colorTheme: UserV1ColorTheme,
}

export const RoleNames = {
    [UserV1UserRole.UserRoleROLEUNSPECIFIED]: "Не определена",
    [UserV1UserRole.UserRoleDEFAULT]: "Без роли",
    [UserV1UserRole.UserRoleADMIN]: "Администратор",
}