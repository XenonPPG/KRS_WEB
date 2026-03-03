import  {UserV1ColorTheme} from "@/scripts/api/Api.ts";

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

export const colorThemeMap: Record<ColorTheme, UserV1ColorTheme> = {
    [ColorTheme.Auto]: UserV1ColorTheme.ColorThemeAUTO,
    [ColorTheme.Light]: UserV1ColorTheme.ColorThemeLIGHT,
    [ColorTheme.Dark]: UserV1ColorTheme.ColorThemeDARK,
}