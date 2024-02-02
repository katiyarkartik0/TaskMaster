import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import Task from "components/Task.js/Task";

import { sortByCreatedDate, sortByDueDate, sortTasksByPriority } from "helpers/assets";

import "./PendingTasksList.css";

const TODAY = "today";
const TOMORROW = "tomorrow";
const SHOW_ALL = "showAll";

const PendingTasksList = ({ pendingTasks, handleTaskDelete }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      setTasks(pendingTasks);
    }, [pendingTasks]);
  
    const handleSortByLatest = ({ isSortByLatest, isDueDate, isCreatedDate }) => {
      const sortedTasks = isDueDate
        ? sortByDueDate({
            tasks: pendingTasks,
            isSortByLatest,
          })
        : sortByCreatedDate({ tasks: pendingTasks, isSortByLatest });
      setTasks([...sortedTasks]);
    };
  
    const handleSortByPriority = ({ isHighestPriority }) => {
      const sortedTasks = sortTasksByPriority({
        tasks: pendingTasks,
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
          const todaysTasks = pendingTasks.filter((task) => {
            const today = new Date();
            const dueDate = new Date(
              task.dueDate.year,
              task.dueDate.month - 1,
              task.dueDate.day
            );
            return sameDay(today, dueDate);
          });
          setTasks([...todaysTasks]);
        } else if (filterBy === TOMORROW) {
          const tomorrowsTasks = pendingTasks.filter((tasks) => {
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
          setTasks([...pendingTasks]);
        }
      };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Pending Tasks</h3>
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
                status="Pending"
                onTaskDelete={handleTaskDelete}
              />
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default PendingTasksList;
