import React, { useState } from "react";
import "./Task.css";
import Button from "components/Button/Button";
import { deleteTask, updateTask } from "api/task";
import { useSelector } from "react-redux";
import { getAccessToken } from "helpers/selector";
import pendingClock from "utils/icons/pendingClock.png";
import completed from "utils/icons/completedIcon.png";
import { Modal } from "components/ModalComponent/Modal";

const deleteButtonStyles = { "margin-left": "5px", "background-color": "red" };
const editButtonStyles = { "margin-left": "5px", "background-color": "green" };

const Task = ({ task, status, onTaskDelete }) => {
  const accessToken = useSelector(getAccessToken);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };

  const handleStatus = async (e) => {
    const isCompleted = e.target.value;
    setCurrentStatus(isCompleted === "true" ? "Completed" : "Pending");
    await updateTask({ accessToken, task: { ...task, isCompleted } });
  };

  const handleTaskDelete = async () => {
    const { taskSignature } = task;
    onTaskDelete(taskSignature);
    await deleteTask({ accessToken, taskSignature });
  };

  const toggleModal = () => {
    setIsModalVisible(false);
  };

  const createdAtDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour:"numeric",
    minute:"numeric",
    second:"numeric"
  });

  const dueDate = new Date(
    task.dueDate.year,
    task.dueDate.month - 1,
    task.dueDate.day
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const calculatePriorityOfTask = ({ priority }) => {
    if (priority === 1) {
      return "High";
    } else if (priority === 2) {
      return "Meduim";
    } else if (priority === 3) {
      return "Low";
    }
  };

  return (
    <div className="task">
      {isModalVisible && (
        <Modal toggleModal={toggleModal} task={task} status={currentStatus} />
      )}
      <div className="task-header">
        <div className="taskNav">
          <img
            src={currentStatus === "Completed" ? completed : pendingClock}
            width="20px"
          />
          <div>
            <div>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-subheading">Created At: {createdAtDate}</p>
              <p className="task-subheading">Due On: {dueDate}</p>
              <p className="task-subheading">
                Priority: {calculatePriorityOfTask({priority:task.priority})}
              </p>
            </div>
          </div>
        </div>
        <div className="manipulateTask">
          <Button
            text={isDescriptionOpen ? "Hide Description" : "Show Description"}
            onClickEvent={toggleDescription}
          />
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
          <Button
            text="Delete"
            onClickEvent={handleTaskDelete}
            style={deleteButtonStyles}
          />
          <Button
            text="Edit"
            style={editButtonStyles}
            onClickEvent={() => setIsModalVisible(true)}
          />
        </div>
      </div>
      {isDescriptionOpen && (
        <p className="task-description">{task.description}</p>
      )}
    </div>
  );
};

export default Task;
