import { createPortal } from "react-dom";
import "./Modal.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "components/Button/Button";
import { getAccessToken } from "helpers/selector";
import { updateTask } from "api/task";

import pendingClock from "utils/icons/pendingClock.png";
import completed from "utils/icons/completedIcon.png";
import Calendar from "components/Calendar/Calendar";

export const Modal = ({ toggleModal, task, status }) => {
  const { title, description, isCompleted, dueDate } = task;
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskDueDate, setTaskDueDate] = useState(dueDate);
  const [currentStatus, setCurrentStatus] = useState(status);

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
              <img
                src={currentStatus === "Completed" ? completed : pendingClock}
                width="20px"
              />
              <span
                className="close-btn"
                id="closeModalBtn"
                onClick={handleClick}
              >
                &times;
              </span>
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
