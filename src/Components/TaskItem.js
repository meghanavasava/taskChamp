import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { realDb } from "../firebase";
import { User } from "../models/User";
import TaskUpdate from "./TaskUpdate";

const TaskItem = ({
  task,
  userId,
  upList,
  downList,
  deleteList,
  reloadWithTask,
}) => {
  const [isDone, setIsDone] = useState(task.is_done);

  const handleDeleteClick = async () => {
    const taskRef = ref(realDb, `users/${userId}/tasks/${task.taskId}`);
    set(taskRef, null);
    deleteList(task.priority - 1);

    try {
      const user = await User.fetch(userId);
      await user.updateStreak();
      console.log("Task deleted and streak updated successfully!");
    } catch (error) {
      console.error("Error updating streak:", error);
    }
  };

  const updateTask = () => {};

  const handleUpClick = () => {
    upList(task.priority - 1);
  };

  const handleDownClick = () => {
    downList(task.priority - 1);
  };

  const handleToggleDone = async () => {
    const newStatus = !isDone;
    setIsDone(newStatus);

    try {
      const taskRef = ref(realDb, `users/${userId}/tasks/${task.taskId}`);
      await set(taskRef, {
        ...task,
        is_done: newStatus,
      });

      const user = await User.fetch(userId);
      await user.updateStreak();
      reloadWithTask();

      console.log("Task updated successfully and streak updated!");
    } catch (error) {
      console.error("Error updating task or streak:", error);
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
      <button>Update</button>
      <button onClick={handleUpClick}>Up</button>
      <button onClick={handleDownClick}>Down</button>
    </div>
  );
};

export default TaskItem;
