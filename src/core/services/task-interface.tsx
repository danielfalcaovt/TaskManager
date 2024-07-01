export default interface ITask {
    task_id: string,
    task_title: string,
    task_text: string | undefined,
    task_day: string,
    task_month: string,
    user_id: string
    error?: string
}