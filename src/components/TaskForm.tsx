import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Tag from "./Tag";
import { useState } from "react";
import useTasksStore from "./store";
import { Tasks } from "../hooks/useTasks";

const TaskForm = () => {
  const [taskData, setTaskData] = useState<Tasks>({
    title: "",
    status: "",
    tags: [],
  });

  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addTask(taskData);
    console.log(tasks);
  };
  const selectTag = (tag : {id: number, tag: string}) => {
    setTaskData((prev) => {
      const filteredTags = prev.tags.includes(tag)
        ? prev.tags.filter((item) => item !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags: filteredTags };
    });
  };
  return (
    <Box justifyContent={"center"} width={"100vw"} sx={{ p: 2 }}>
      <header>Задачи</header>
      <form onSubmit={handleSubmit}>
        <TextField
          name="title"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
          id="outlined-basic"
          label="Въведете задача"
          variant="outlined"
          value={taskData.title}
          onChange={handleChange}
        />
        <Stack direction="row" justifyContent={"space-between"} height={50}>
          <Stack direction="row" spacing={2} sx={{ pt: 1, pb: 1 }}>
            <Tag tagData={{id: 1, tag: "HTML"}} selectTag={selectTag} />
            <Tag tagData={{id: 2, tag: "CSS"}} selectTag={selectTag} />
            <Tag tagData={{id:3, tag: "JS"}} selectTag={selectTag} />
            <Tag tagData={{id: 4, tag: "TS"}} selectTag={selectTag} />
          </Stack>

          <Stack direction="row" spacing={2} sx={{ pt: 1, pb: 1 }}>
            <Select
              name="status"
              sx={{ mt: 2, width: 200 }}
              value={taskData.status}
              label="Статус на задачата"
              onChange={handleChange}
            >
              <MenuItem value="To Do">Започва</MenuItem>
              <MenuItem value="In Progress">Работи се</MenuItem>
              <MenuItem value="Done">Завършена</MenuItem>
              <MenuItem value="On Hold">Изчаква</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ margin: 2 }}
            >
              Запази
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
