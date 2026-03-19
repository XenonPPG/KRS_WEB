export class MenuFunction {
    icon: string
    title: string
    action: () => void
    destructive: boolean

    constructor(icon: string, title: string, action: () => void, destructive: boolean = false) {
        this.icon = icon
        this.title = title
        this.action = action
        this.destructive = destructive
    }
}