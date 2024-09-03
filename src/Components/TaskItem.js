import React, { useState } from "react";

const TaskItem = ({ task, priority, userId, upList, downList }) => {
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
      <p>Level : {task.level}</p>
      <label>
        Done :
        <input type="checkbox" checked={isDone} onChange={handleToggleDone} />
      </label>
      {/* <button onClick={() => deleteList(priority - 1)}>Delete</button> */}
      <button onClick={() => upList(priority - 1)}>Up</button>
      <button onClick={() => downList(priority - 1)}>Down</button>
    </div>
  );
};

export default TaskItem;
