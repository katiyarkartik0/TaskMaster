const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    taskSignature: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, required: true },
    priority: { type: Number, required: true, default: 3 },
    dueDate: {
      year: { type: Number, required: true },
      month: { type: Number, required: true },
      day: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
