export interface NoteModel {
    title: string,
    content: string,
    createdAt: {
        seconds: number,
        nanos: number
    }
}