import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { AiFillDelete } from "react-icons/ai";
import { TaskData, useTasksStore } from "./store";
import TagLabel from "./TagLabel";
interface TaskCardProps {
  task: TaskData;
}

const TaskCard = ({task}: TaskCardProps) => {
  const removeTask = useTasksStore((state) => state.removeTask);
  return (
    <Card sx={{ minWidth: 300 }} variant="outlined">
      <CardContent>
        <Typography
          sx={{ fontSize: 14, mb: 1 }}
          color="text.secondary"
          gutterBottom
        >
          {task.taskName}
        </Typography>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignContent={"center"}
          sx={{ height: 30 }}
        >
          <Stack direction={"row"} spacing={1}>
            {task.tagNames.map((tagName, index) => (
              <TagLabel tagName={tagName} key={index} />
            ))}
          </Stack>
          <IconButton onClick={() => removeTask(task)}>
            <AiFillDelete />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
