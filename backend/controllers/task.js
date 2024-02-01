const Task = require("../models/task");
const User = require("../models/user");

const getTasks = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const userId = req.id;
  try {
    const { tasks } = await User.findById(userId).populate("tasks");
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const createTask = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const userId = req.id;
  const { taskSignature, title, description } = req.body;
  const task = new Task({
    taskSignature,
    title,
    description,
    isCompleted: false,
  });

  try {
    const { _id: latestTaskId } = await task.save();

    await User.findByIdAndUpdate(userId, {
      $push: { tasks: latestTaskId },
    });

    return res.status(200).json({ msg: "Task added successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const updateTask = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { taskSignature, title, description, isCompleted } = req.body;

  try {
    const { _id: taskId } = await Task.findOne({ taskSignature });

    await Task.findByIdAndUpdate(taskId, {
      title,
      description,
      isCompleted,
    });

    return res.status(200).json({ msg: "Task updated successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const deleteTask = async (req, res) => {
  if (req.verified == false) {
    return res.status(403).json({ msg: req.msg });
  }
  const { taskSignature } = req.query;
  if (!taskSignature) {
    return res
      .status(400)
      .json({ msg: "please provide a valid Task Signature" });
  }

  try {
    await Task.deleteOne({ taskSignature });

    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
