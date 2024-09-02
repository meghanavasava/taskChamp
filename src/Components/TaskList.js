import React, { useState, useEffect } from "react";
import { Task } from "../models/Task";
import TaskItem from "./TaskItem"; // A component to render each task

const TaskList = ({ userId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksSnapshot = await Task.fetch(userId); // Fetch all tasks for the user
        const tasksArray = [];
        tasksSnapshot.forEach((taskId) => {
          const taskData = taskId.val();
          tasksArray.push(
            new Task(
              taskId.key,
              taskData.date,
              taskData.taskname,
              taskData.level,
              taskData.is_done
            )
          );
        });
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
