import React, { useState, useEffect } from "react";
import { User } from "../models/User";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem";

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = await User.fetch(userId);
        const tasksArray = Object.keys(user.tasks).map((taskId) => {
          const taskData = user.tasks[taskId];
          return new Task(
            taskId,
            taskData.date,
            taskData.taskname,
            taskData.level,
            taskData.is_done
          );
        });
        console.log("Fetched tasks:", tasksArray); // Debug log
        setTasks(tasksArray);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [userId]);

  if (loading) return <div>Loading tasks...</div>;

  if (!tasks.length) return <div>No tasks available</div>;

  return (
    <div>
      <h1>My Tasks</h1>
      {tasks.map((task) => (
        <TaskItem key={task.taskId} task={task} userId={userId} />
      ))}
    </div>
  );
};

export default TaskList;
