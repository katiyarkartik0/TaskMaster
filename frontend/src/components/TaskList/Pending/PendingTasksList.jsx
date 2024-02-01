import Task from "components/Task.js/Task";
import React, { useState, useEffect } from "react";

import "./PendingTasksList.css";
import { sortByCreatedDate, sortByDueDate, sortTasksByPriority } from "helpers/assets";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
      </div>
      <div className="card-content">
        <p className="card-text">
          {pendingTasks.map((task) => {
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
