import { User } from "../models/User";
import { Task } from "../models/Task";
import { useState } from "react";

const TaskUpdate = ({ isOpen, onClose, task, onUpdate }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [level, setLevel] = useState(task.level);

  if (!isOpen) return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(task.taskId, taskName, level);
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={taskName}
          placeholder="Task name"
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TaskUpdate;
