const express = require("express");
const taskRoutes = express.Router();
const bodyParser = require("body-parser");
const { createTask, updateTask, getTasks, deleteTask } = require("../controllers/task");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/getTasks",getTasks);
taskRoutes.post("/createTask",createTask);
taskRoutes.put("/updateTask",updateTask)
taskRoutes.delete("/deleteTask",deleteTask)

module.exports = { taskRoutes };