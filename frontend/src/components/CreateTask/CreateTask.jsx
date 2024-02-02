import React, { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { createTask } from "api/task";
import Calendar from "components/Calendar/Calendar";

import { getAccessToken } from "helpers/selector";

import "./CreateTask.css";

const defaultTaskPriority = 3;

const CreateTask = ({ onTaskCreate }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState({});
  const [taskPriority, setTaskPriority] = useState(defaultTaskPriority);
  const accessToken = useSelector(getAccessToken);

  const handleTaskCreate = async () => {
    if (taskTitle.trim() !== "" && Object.keys(taskDueDate).length !== 0) {
      const taskSignature = uuidv4();
      const task = {
        title: taskTitle,
        description: taskDescription,
        taskSignature,
        dueDate: taskDueDate,
        priority: taskPriority,
      };
      onTaskCreate(task);
      setTaskTitle("");
      setTaskDescription("");
      await createTask({ accessToken, task: { ...task, taskSignature } });
    } else {
      alert("please provide a valid inputs");
    }
  };

  return (
    <div className="create-task-form">
      <div className="createTask-header">
        <h2>Create Task</h2>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            sx={{
              maxWidth: 200,
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={defaultTaskPriority}
            label="Priority"
            onChange={(e) => setTaskPriority(e.target.value)}
          >
            <MenuItem value={1}>1 (High)</MenuItem>
            <MenuItem value={2}>2 (Medium)</MenuItem>
            <MenuItem value={3}>3 (Low)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="task-title-input"
      />
      <br></br>
      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="task-description-input"
      />
      <br></br>
      <Calendar setTaskDueDate={setTaskDueDate} />
      <br></br>
      <button onClick={handleTaskCreate} className="create-button">
        Create Task
      </button>
    </div>
  );
};

export default CreateTask;
