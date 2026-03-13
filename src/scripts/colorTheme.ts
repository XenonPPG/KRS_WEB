import  {UserV1ColorTheme} from "@/api/gen/Api.ts";

export enum ColorTheme {
    Auto,
    Light,
    Dark
}

export const ColorThemeNames = {
    [ColorTheme.Auto]: 'auto',
    [ColorTheme.Light]: 'light',
    [ColorTheme.Dark]: 'dark'
}

export const ColorThemeMap: Record<ColorTheme, UserV1ColorTheme> = {
    [ColorTheme.Auto]: UserV1ColorTheme.ColorThemeAUTO,
    [ColorTheme.Light]: UserV1ColorTheme.ColorThemeLIGHT,
    [ColorTheme.Dark]: UserV1ColorTheme.ColorThemeDARK,
}

export const ReverseColorThemeMap: Record<UserV1ColorTheme, ColorTheme> = {
    [UserV1ColorTheme.ColorThemeUNSPECIFIED]: ColorTheme.Auto,
    [UserV1ColorTheme.ColorThemeAUTO]: ColorTheme.Auto,
    [UserV1ColorTheme.ColorThemeLIGHT]: ColorTheme.Light,
    [UserV1ColorTheme.ColorThemeDARK]: ColorTheme.Dark,
}