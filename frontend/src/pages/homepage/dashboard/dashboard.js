import CreateTask from "components/CreateTask/CreateTask";
import Task from "components/Task.js/Task";
import React, { useCallback, useEffect, useState } from "react";
import "./dashboard.css";
import { fetchTasks } from "api/task";
import { useSelector } from "react-redux";
import { getAccessToken } from "helpers/selector";
import { Loader } from "utils/Loader/Loader";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(getAccessToken);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);

      await fetchTasks(accessToken)
        .then(async (res) => {
          const { tasks } = await res.json();
          setTasks(tasks);
        })
        .catch((err) => alert(err));
    };
    setLoading(false);

    getTasks();
  }, [accessToken]);

  const handleTaskCreate = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskDelete = (taskSignature) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => {
        const { taskSignature: currentTaskSignature } = task;
        if (currentTaskSignature !== taskSignature) {
          return true;
        }
        return false;
      })
    );
  };

  const renderTasks = useCallback(() => {
    const completedTasks = [];
    const pendingTasks = [];
    tasks.forEach((task) => {
      const { isCompleted, taskSignature } = task;
      if (isCompleted) {
        completedTasks.push(
          <Task
            key={taskSignature}
            task={task}
            status="Completed"
            onTaskDelete={handleTaskDelete}
          />
        );
      } else {
        pendingTasks.push(
          <Task
            key={taskSignature}
            task={task}
            status="Pending"
            onTaskDelete={handleTaskDelete}
          />
        );
      }
    });
    return (
      <div className="task-list">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Pending Tasks</h3>
          </div>
          <div class="card-content">
            <p class="card-text">{pendingTasks}</p>
          </div>
          <div class="card-footer">
            <button class="btn">Read More</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Completed Tasks</h3>
          </div>
          <div class="card-content">
            <p class="card-text">{completedTasks}</p>
          </div>
          <div class="card-footer">
            <button class="btn">Read More</button>
          </div>
        </div>
        
        {/* {[...pendingTasks, ...completedTasks]} */}
      </div>
    );
  }, [tasks]);

  return (
    <div className="dashboard">
      <CreateTask onTaskCreate={handleTaskCreate} />
      <br></br>
      {loading ? renderTasks() : <Loader />}
    </div>
  );
};

export default Dashboard;
