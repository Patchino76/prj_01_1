import { Stack } from "@mui/material";
// import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import { GoGoal } from "react-icons/go";
import { TbProgressCheck } from "react-icons/tb";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";
import useTasks from "./hooks/useTasks";
import useTasksStore from "./components/store";


function App() {

  const {data = []} = useTasks()
  useTasksStore.setState({tasks : data})
  const tasks = useTasksStore((state) => state.tasks)

  return (
    <>
      <div
        style={{
          width: "90vw",
          display: "flex",
          border: "1px solid black",  
          marginTop: 10,  
          marginLeft: 50,  
        }}  
      >
        <TaskForm></TaskForm>{" "}
      </div>  
      <div style={{ width: "90vw", border: "1px solid black", marginTop: 20, marginLeft: 50 }}>
        <Stack direction="row" justifyContent="space-around">
          <TaskColumn title="To Do" tasks={tasks} icon={<GoGoal size={30}/>}/>
          <TaskColumn title="In Progress" tasks={tasks} icon={<TbProgressCheck size={30}/>}/>
          <TaskColumn title="On Hold" tasks={tasks} icon={<IoCheckmarkDoneCircleOutline size={30}/>}/>
          <TaskColumn title="Done" tasks={tasks} icon={<MdOutlinePending size={30}/>}/>
        </Stack>
      </div>
    </>
  );
}

export default App;
