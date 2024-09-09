import React, { useState } from "react";
import { createTaskWithPriority } from "../Services/TaskServices";
import styles from "./TaskForm.module.css";

const TaskForm = ({ userId, reloadWithTask }) => {
  const [taskname, setTaskname] = useState("");
  const [date, setDate] = useState("");
  const [level, setLevel] = useState("medium");
  const [is_done, setIsDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    await createTaskWithPriority(
      userId,
      formattedDate,
      taskname,
      level,
      is_done
    );
    console.log("Done");
    reloadWithTask();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.task_form}>
      <input
        type="text"
        value={taskname}
        onChange={(e) => setTaskname(e.target.value)}
        placeholder="Task Name"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={level} onChange={(e) => setLevel(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
