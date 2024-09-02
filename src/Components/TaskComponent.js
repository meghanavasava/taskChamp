import React, { useState } from "react";
import { Task } from "../models/Task";

const TaskComponent = ({ task, onLevelChange }) => {
  const [currentLevel, setCurrentLevel] = useState(task.level);

  const handleLevelChange = async (e) => {
    const newLevel = e.target.value;
    setCurrentLevel(newLevel);

    task.level = newLevel;
    await task.update(task.userId);
    onLevelChange(newLevel);
  };

  return (
    <div className={`task ${task.is_done ? "done" : ""}`}>
      <h3>{task.taskname}</h3>
      <select value={currentLevel} onChange={handleLevelChange}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <span>Priority Level: {currentLevel}</span>
    </div>
  );
};

export default TaskComponent;
