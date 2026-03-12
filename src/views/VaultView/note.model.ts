export interface NoteModel {
    id: number,
    title: string,
    content: string,
    createdAt: {
        seconds: number,
        nanos: number
    }
}