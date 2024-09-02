import React, { useState } from "react";

const TaskItem = ({ task, userId }) => {
  const [isDone, setIsDone] = useState(task.is_done);

  const handleToggleDone = async () => {
    task.is_done = !isDone;
    setIsDone(task.is_done);

    try {
      await task.update(userId);
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={`task-item ${isDone ? "done" : ""}`}>
      <h3>{task.taskname}</h3>
      <p>Due Date: {task.date}</p>
      <p>Priority: {task.level}</p>
      <label>
        Done:
        <input type="checkbox" checked={isDone} onChange={handleToggleDone} />
      </label>
    </div>
  );
};

export default TaskItem;
