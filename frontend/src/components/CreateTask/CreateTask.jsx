import React, { useState } from "react";
import "./CreateTask.css";
import { createTask } from "api/task";
import { useSelector } from "react-redux";
import { getAccessToken } from "helpers/selector";
import { v4 as uuidv4 } from "uuid";
// import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTask = ({ onTaskCreate }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const accessToken = useSelector(getAccessToken);

  const handleTaskCreate = async () => {
    if (taskTitle.trim() !== "") {
      const taskSignature = uuidv4();
      const task = {
        title: taskTitle,
        description: taskDescription,
        taskSignature,
      };
      onTaskCreate(task);
      setTaskTitle("");
      setTaskDescription("");
      await createTask({ accessToken, task: { ...task, taskSignature } });
    } else {
      alert("please provide a valid title");
    }
  };

  return (
    <div className="create-task-form">
      <h2>Create Task</h2>
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
        <DatePicker
          label="Controlled picker"
          // value={value}
          onChange={(newValue) => console.log(newValue)}
        />
      </LocalizationProvider>
      <br></br>
      <button onClick={handleTaskCreate} className="create-button">
        Create Task
      </button>
    </div>
  );
};

export default CreateTask;
