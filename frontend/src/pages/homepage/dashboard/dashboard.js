import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";

import { fetchTasks } from "api/task";
import CreateTask from "components/CreateTask/CreateTask";
import CompletedTasksList from "components/TaskList/Completed/CompletedTasksList";
import PendingTasksList from "components/TaskList/Pending/PendingTasksList";

import { getAccessToken } from "helpers/selector";
import { Loader } from "utils/Loader/Loader";

import "./dashboard.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(getAccessToken);
  const [chartData, setChartData] = useState({
    completedTasks: 0,
    pendingTasks: 0,
  });

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

  const completedAndPendingTasks = useMemo(() => {
    const completedTasks = [];
    const pendingTasks = [];
    tasks.forEach((task) => {
      const { isCompleted } = task;
      if (isCompleted) {
        completedTasks.push(task);
      } else {
        pendingTasks.push(task);
      }
    });
    return { completedTasks, pendingTasks };
  }, [tasks]);

  const renderTasks = useCallback(() => {
    const { completedTasks, pendingTasks } = completedAndPendingTasks;
    return (
      <div className="task-list">
        <CompletedTasksList
          completedTasks={completedTasks}
          handleTaskDelete={handleTaskDelete}
        />
        <PendingTasksList
          pendingTasks={pendingTasks}
          handleTaskDelete={handleTaskDelete}
        />
      </div>
    );
  }, [tasks]);

  return (
    <div>
      <div className="tasks-number-completed-card">
        <div className="tasks-card">
          <div className="card-content">
            <h2 className="card-title">Completed Tasks</h2>
            <p className="tasks-count">
              {completedAndPendingTasks.completedTasks.length}
            </p>
          </div>
        </div>
        <div className="tasks-card">
          <div className="card-content">
            <h2 className="card-title">Incomplete Tasks</h2>
            <p className="tasks-count">
              {completedAndPendingTasks.pendingTasks.length}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <CreateTask onTaskCreate={handleTaskCreate} />
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: completedAndPendingTasks.completedTasks.length,
                  label: "Completed Tasks",
                },
                {
                  id: 1,
                  value: completedAndPendingTasks.pendingTasks.length,
                  label: "Pending Tasks",
                },
              ],
            },
          ]}
          width={600}
          height={200}
        />
      </div>
      <br></br>
      {loading ? renderTasks() : <Loader />}
    </div>
  );
};

export default Dashboard;
