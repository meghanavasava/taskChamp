import React, { useState } from "react";
import { addTask } from "../UserServices";
import { Task } from "../models/Task";

const TaskForm = ({ userId }) => {
  const [taskname, setTaskname] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("easy");
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskId = Date.now().toString();
    const newTask = new Task(taskId, date, taskname, level, isDone);

    try {
      await addTask(userId, newTask);
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Name"
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <label>
        Done:
        <input
          type="checkbox"
          checked={isDone}
          onChange={(e) => setIsDone(e.target.checked)}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
