import React, { useState, useEffect } from "react";
import { Task } from "../models/Task";
import TaskComponent from "./TaskComponent";

const TodoList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await Task.fetch(userId);
        setTasks(tasksSnapshot);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const updateTaskLevel = (taskId, newLevel) => {
    const updatedTasks = tasks.map((task) =>
      task.taskId === taskId ? { ...task, level: newLevel } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      {tasks.map((task) => (
        <TaskComponent
          key={task.taskId}
          task={task}
          userId={userId}
          onLevelChange={(newLevel) => updateTaskLevel(task.taskId, newLevel)}
        />
      ))}
    </div>
  );
};

export default TodoList;
