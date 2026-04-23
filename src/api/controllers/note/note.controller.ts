import {GenericRequest} from "@/api/apiUtils.ts";
import {serviceAPI} from "@/api/InitAPI.ts";
import {OmitNulls} from "@/scripts/utils.ts";

export async function CreateNote(title: string, content: string) {
    return await GenericRequest(async () => await serviceAPI.noteCreate({
        title: title,
        content: content
    }), "Создано!", "Ошибка")
}

export async function GetAllNotes(limit: number, offset: number, ascendingOrder: boolean) {
    return await GenericRequest(async () => await serviceAPI.noteList({
        limit: limit,
        offset: offset,
        ascending_order: ascendingOrder
    }), undefined, "Ошибка")
}

export async function GetNote(id: number) {
    return await GenericRequest(async () => await serviceAPI.noteDetail(id),
        undefined,
        "Заметка не найдена")
}

export async function UpdateNote(id: number, content: string | undefined, title: string | undefined) {
    return await GenericRequest(async () => await serviceAPI.notePartialUpdate(OmitNulls({
        id: id,
        content: content,
        title: title
    })), "Заметка обновлена", "Не удалось обновить")
}

export async function DeleteNote(id: number) {
    return await GenericRequest(async () => await serviceAPI.noteDelete(id),
        "Заметка удалена",
        "Не удалось удалить")
}