/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import INote from "../../core/services/note-interface"
import ITask from "../../core/services/task-interface"
import IUser from "../../core/services/user-interface"

export interface IDataContext {
    data: {
        notes: INote[]
        notifications: any[]
        tasks: ITask[]
        token: string | undefined
        user: IUser | undefined,
        error?: any
        selectedTasks?: ITask[]
    },
    setData: any
}

export interface IData {
    notes: INote[]
    notifications: any[]
    tasks: ITask[]
    token: string | undefined
    user: IUser | undefined,
    error?: any
}