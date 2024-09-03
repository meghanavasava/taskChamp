import React, { useState } from "react";
import { ref, set, get } from "firebase/database";
import { realDb } from "../firebase";

const TaskItem = ({ task, userId, upList, downList, deleteList }) => {
  const [isDone, setIsDone] = useState(task.is_done);

  const handleDeleteClick = () => {
    const taskRef = ref(realDb, `users/${userId}/tasks/${task.taskId}`);
    set(taskRef, null);
    deleteList(task.priority - 1);
  };

  const handleUpClick = () => {
    upList(task.priority - 1);
  };

  const handleDownClick = () => {
    downList(task.priority - 1);
  };

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
      <p>Level : {task.level}</p>
      <label>
        Done :
        <input type="checkbox" checked={isDone} onChange={handleToggleDone} />
      </label>
      <button onClick={handleDeleteClick}>Delete</button>
      <button onClick={handleUpClick}>Up</button>
      <button onClick={handleDownClick}>Down</button>
    </div>
  );
};

export default TaskItem;
