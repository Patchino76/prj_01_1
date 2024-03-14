import {create } from "zustand"
import  { Tasks } from "../hooks/useTasks"

type tasksStore = {
    tasks: Tasks[]
    addTask: (task: Tasks) => void
    removeTask: (task: Tasks) => void
}

const useTasksStore = create<tasksStore>((set) => {

    return {
        tasks: [],
        addTask: (task) => set((state) => ({
            tasks: [...state.tasks, task]
        })),
        removeTask: (task) => set((state) => ({
            tasks: state.tasks.filter((t) => t.title !== task.title)
        })),
    };
    })

export default useTasksStore
