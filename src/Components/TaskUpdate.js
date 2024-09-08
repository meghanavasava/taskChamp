import { User } from "../models/User";
import { Task } from "../models/Task";
import { useState } from "react";

const TaskUpdate = ({ isOpen, onClose, task, updateTask }) => {
  const [taskName, setTaskName] = useState(task.name);
  const [level, setLevel] = useState(task.level);

  if (!isOpen) return null;

  return (
    <div>
      <form>
        <input
          type="text"
          value={task.taskname}
          placeholder="Task Name"
          required
        />
        <select value={task.level}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit">Update</button>
        <button type="submit">Cancel</button>
      </form>
    </div>
  );
};

export default TaskUpdate;
