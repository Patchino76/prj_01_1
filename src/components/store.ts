import {create } from "zustand"
import { taskData } from "./data"

export interface TaskData  {
    taskName: string,
    taskStatus: string,
    tagNames: string[],
}

type tasksStore = {
    tasks: TaskData[]
    addTask: (task: TaskData) => void
    removeTask: (task: TaskData) => void
}

export const useTasksStore = create<tasksStore>((set) => ({
    tasks: taskData,
    addTask: (task) => set((state) => ({
        tasks: [...state.tasks, task]
    })),
    removeTask: (task) => set((state) => ({
        tasks: state.tasks.filter((t) => t.taskName !== task.taskName)
    }))
}))
