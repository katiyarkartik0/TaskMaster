const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskSignature: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, required: true },
    dueDate: {
      year: { type: Number, required: true },
      month: { type: Number, required: true },
      date: { type: Number, required: true },
    },
  },
  { timestaps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
