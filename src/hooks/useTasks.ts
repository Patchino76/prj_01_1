import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export interface Tasks  {
    title: string,
    status: string,
    tags: {id: number, tag: string}[]
}


const useTasks = () => {
    const fetchTasks = () => 
    axios
    .get<Tasks[]>("http://127.0.0.1:8000/tasks")
    .then((res) => res.data);

    return  useQuery<Tasks[], Error>({ 
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        staleTime: 1000 * 10,
      }) 
}

export default useTasks
