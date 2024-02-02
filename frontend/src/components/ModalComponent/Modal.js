import { useState } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { updateTask } from "api/task";
import Button from "components/Button/Button";
import Calendar from "components/Calendar/Calendar";

import { getAccessToken } from "helpers/selector";
import pendingClock from "utils/icons/pendingClock.png";
import completed from "utils/icons/completedIcon.png";

import "./Modal.css";

export const Modal = ({ toggleModal, task, status }) => {
  const { title, description, isCompleted, dueDate, priority } = task;
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [taskPriority, setTaskPriority] = useState(priority);

  const accessToken = useSelector(getAccessToken);
  const handleClick = () => {
    toggleModal();
  };
  const handleStatus = async (e) => {
    const isCompleted = e.target.value;
    setCurrentStatus(isCompleted === "true" ? "Completed" : "Pending");
  };

  const handleTaskUpdate = async () => {
    if (taskTitle.trim() === "") {
      alert("please provide a valid title");
      return;
    }
    const updatedTask = {
      ...task,
      title: taskTitle,
      description: taskDescription,
      isCompleted: currentStatus === "Completed" ? true : false,
      dueDate: taskDueDate,
      priority: taskPriority,
    };
    await updateTask({
      accessToken,
      task: updatedTask,
    });
    toggleModal();
  };

  return createPortal(
    <>
      <div className="modal-container">
        <div className="modal-background" id="modalBackground">
          <div className="modal" id="modal">
            <div className="modal-content">
              <div className="modal-header">
                <img
                  src={currentStatus === "Completed" ? completed : pendingClock}
                  width="20px"
                />
                <div className="modal-priority">
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Priority
                    </InputLabel>
                    <Select
                      sx={{
                        maxWidth: 200,
                      }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={taskPriority}
                      label="Priority"
                      onChange={(e) => setTaskPriority(e.target.value)}
                    >
                      <MenuItem value={1}>1 (High)</MenuItem>
                      <MenuItem value={2}>2 (Medium)</MenuItem>
                      <MenuItem value={3}>3 (Low)</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <span
                  className="close-btn"
                  id="closeModalBtn"
                  onClick={handleClick}
                >
                  &times;
                </span>
              </div>

              <form id="roomForm">
                <label for="taskTitle">Task Title</label>
                <input
                  id="taskTitle"
                  type="text"
                  placeholder={taskTitle}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="task-title-input"
                />
                <br></br>
                <select
                  name="status"
                  id="status"
                  className="status-select"
                  onChange={handleStatus}
                >
                  <option
                    value={true}
                    className="status-option"
                    selected={currentStatus === "Completed"}
                  >
                    Completed
                  </option>
                  <option
                    value={false}
                    className="status-option"
                    selected={currentStatus !== "Completed"}
                  >
                    Pending
                  </option>
                </select>
                <br></br>
                <label for="taskDescription">Task Description</label>
                <textarea
                  id="taskDescription"
                  placeholder={taskDescription}
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="task-description-input"
                />
                <br></br>
                <Calendar dueDate={dueDate} setTaskDueDate={setTaskDueDate} />
                <br></br>
                <Button
                  type="submit"
                  text="Make Changes"
                  onClickEvent={handleTaskUpdate}
                />
              </form>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector(".portalModal")
  );
};
