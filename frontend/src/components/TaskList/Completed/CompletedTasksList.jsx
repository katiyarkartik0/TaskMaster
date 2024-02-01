import Task from "components/Task.js/Task";
import "./CompletedTasksList.css";
import React, { useState, useEffect } from "react";
import { sortByCreatedDate, sortByDueDate, sortTasksByPriority } from "helpers/assets";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
