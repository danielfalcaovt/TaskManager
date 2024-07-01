export default interface INote {
    note_id: string,
    note_title: string,
    note_text: string | undefined,
    user_id: string
    error?: string
}