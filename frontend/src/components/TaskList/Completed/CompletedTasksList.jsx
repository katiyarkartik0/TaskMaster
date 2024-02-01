import Task from "components/Task.js/Task";
import "./CompletedTasksList.css";
import React, { useState, useEffect } from "react";
import {
  sortByCreatedDate,
  sortByDueDate,
  sortTasksByPriority,
} from "helpers/assets";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TODAY = "today";
const TOMORROW = "tomorrow";
const SHOW_ALL = "showAll";

const CompletedTasksList = ({ completedTasks, handleTaskDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(completedTasks);
  }, [completedTasks]);

  const handleSortByLatest = ({ isSortByLatest, isDueDate, isCreatedDate }) => {
    const sortedTasks = isDueDate
      ? sortByDueDate({
          tasks: completedTasks,
          isSortByLatest,
        })
      : sortByCreatedDate({ tasks: completedTasks, isSortByLatest });
    setTasks([...sortedTasks]);
  };

  const handleSortByPriority = ({ isHighestPriority }) => {
    const sortedTasks = sortTasksByPriority({
      tasks: completedTasks,
      isHighestPriority,
    });
    setTasks([...sortedTasks]);
  };

  const handleFilterBy = (filterBy) => {
    const sameDay = (today, dueDate) => {
      return (
        today.getFullYear() == dueDate.getFullYear() &&
        today.getMonth() == dueDate.getMonth() &&
        today.getDate() == dueDate.getDate()
      );
    };
    const tomorrow = (today, dueDate) => {
      return (
        today.getFullYear() == dueDate.getFullYear() &&
        today.getMonth() == dueDate.getMonth() &&
        today.getDate() + 1 == dueDate.getDate()
      );
    };
    if (filterBy === TODAY) {
      const todaysTasks = completedTasks.filter((task) => {
        const today = new Date();
        const dueDate = new Date(
          task.dueDate.year,
          task.dueDate.month - 1,
          task.dueDate.day
        );
        console.log(task, sameDay(today, dueDate));
        return sameDay(today, dueDate);
      });
      setTasks([...todaysTasks]);
    } else if (filterBy === TOMORROW) {
      const tomorrowsTasks = completedTasks.filter((tasks) => {
        const today = new Date();
        const dueDate = new Date(
          tasks.dueDate.year,
          tasks.dueDate.month - 1,
          tasks.dueDate.day
        );
        return tomorrow(today, dueDate);
      });
      setTasks([...tomorrowsTasks]);
    } else {
      setTasks([...completedTasks]);
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Completed Tasks</h3>
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: "#ffffff" }}
          >
            Sort by Due Date
          </InputLabel>
          <Select
            labelStyle={{ color: "#ffffff" }}
            sx={{
              minWidth: 200,
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={false}
            label="Sort by Due Date"
            onChange={(e) =>
              handleSortByLatest({
                isDueDate: true,
                isSortByLatest: e.target.value,
              })
            }
          >
            <MenuItem value={false}>Earliest</MenuItem>
            <MenuItem value={true}>Latest</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: "#ffffff" }}
          >
            Sort by Created Date
          </InputLabel>
          <Select
            labelStyle={{ color: "#ffffff" }}
            sx={{
              minWidth: 200,
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={false}
            label="Sort by Created Date"
            onChange={(e) =>
              handleSortByLatest({
                isCreatedDate: true,
                isSortByLatest: e.target.value,
              })
            }
          >
            <MenuItem value={false}>Earliest</MenuItem>
            <MenuItem value={true}>Latest</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: "#ffffff" }}
          >
            Sort by Priority
          </InputLabel>
          <Select
            labelStyle={{ color: "#ffffff" }}
            sx={{
              minWidth: 200,
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={true}
            label="Sort by Priority"
            onChange={(e) =>
              handleSortByPriority({
                isHighestPriority: e.target.value,
              })
            }
          >
            <MenuItem value={false}>Lowest</MenuItem>
            <MenuItem value={true}>Highest</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel
            id="demo-simple-select-label"
            style={{ color: "#ffffff" }}
          >
            Filter By
          </InputLabel>
          <Select
            labelStyle={{ color: "#ffffff" }}
            sx={{
              minWidth: 200,
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={SHOW_ALL}
            label="Filter By"
            onChange={(e) => handleFilterBy(e.target.value)}
          >
            <MenuItem value={TODAY}>Today's Tasks</MenuItem>
            <MenuItem value={TOMORROW}>Tomorrow's Tasks</MenuItem>
            <MenuItem value={SHOW_ALL}>Show All</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="card-content">
        <p className="card-text">
          {tasks.map((task) => {
            const { taskSignature } = task;
            return (
              <Task
                key={taskSignature}
                task={task}
                status="Completed"
                onTaskDelete={handleTaskDelete}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default CompletedTasksList;
