import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import Tag from "./Tag";
import { useState } from "react";
import { TaskData, useTasksStore } from "./store";

const TaskForm = () => {
  const [taskData, setTaskData] = useState<TaskData>({
    taskName: "",
    taskStatus: "",
    tagNames: [],
  });

  const tasks = useTasksStore((state) => state.tasks);
  const addTask = useTasksStore((state) => state.addTask);
  const removeTask = useTasksStore((state) => state.removeTask);

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
  const selectTag = (tag: string) => {
    setTaskData((prev) => {
      const filteredTags = prev.tagNames.includes(tag)
        ? prev.tagNames.filter((item) => item !== tag)
        : [...prev.tagNames, tag];
      return { ...prev, tagNames: filteredTags };
    });
  };
  // console.log(taskData.taskName, taskData.taskStatus, taskData.tagNames);
  return (
    <Box justifyContent={"center"} width={"100vw"} sx={{ p: 2 }}>
      <header>Задачи</header>
      <form onSubmit={handleSubmit}>
        <TextField
          name="taskName"
          fullWidth
          sx={{ mt: 1, mb: 1 }}
          id="outlined-basic"
          label="Въведете задача"
          variant="outlined"
          value={taskData.taskName}
          onChange={handleChange}
        />
        <Stack direction="row" justifyContent={"space-between"} height={50}>
          <Stack direction="row" spacing={2} sx={{ pt: 1, pb: 1 }}>
            <Tag tagName="HTML" selectTag={selectTag} />
            <Tag tagName="CSS" selectTag={selectTag} />
            <Tag tagName="JS" selectTag={selectTag} />
            <Tag tagName="TS" selectTag={selectTag} />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ pt: 1, pb: 1 }}>
            <Select
              name="taskStatus"
              sx={{ mt: 2, width: 200 }}
              value={taskData.taskStatus}
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
