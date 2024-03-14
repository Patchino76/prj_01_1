import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { AiFillDelete } from "react-icons/ai";
import TagLabel from "./TagLabel";
import { Tasks } from "../hooks/useTasks";
import useTasksStore from "./store";

interface TaskCardProps {
  task: Tasks;
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
          {task.title}
        </Typography>

        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignContent={"center"}
          sx={{ height: 30 }}
        >
          <Stack direction={"row"} spacing={1}>
            {task.tags.map((tag) => (
              <TagLabel tag={tag.tag} key={tag.id} />
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
