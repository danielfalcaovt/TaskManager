/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react'
import { IDataContext } from '../../services/data-interface'

export const DataContext = createContext<IDataContext>({
    data: {
        notes: [],
        notifications: [],
        tasks: [],
        user: undefined,
        token: undefined
    },
    setData: () => {}
})