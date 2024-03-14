import { Stack } from "@mui/material";
import TaskCard from "./TaskCard";
import { TaskData } from "./store";
// import { IconType } from "react-icons";

interface TaskColumnProps {
  title: string;
  tasks: TaskData[];
  icon: JSX.Element;
}

const TaskColumn = ({ title, tasks, icon }: TaskColumnProps) => {
  const tasksFiltered = tasks.filter((task) => task.taskStatus === title);
  return (
    <Stack direction="column" spacing={2} sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <div>{icon}</div>
        <h2>{title}</h2>
      </Stack>

      <Stack direction="column" spacing={2}>
        {tasksFiltered.map((task, index) => (
          <TaskCard key={index} task={task} />
        ))}
      </Stack>
    </Stack>
  );
};

export default TaskColumn;
