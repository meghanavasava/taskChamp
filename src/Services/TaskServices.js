import { Task } from "../models/Task";

export const createTaskWithPriority = async (
  userId,
  date,
  taskname,
  level,
  is_done
) => {
  try {
    const nextPriority = await Task.getNextPriority(userId, date);

    const taskId = `task_${Date.now()}`;
    const newTask = new Task(
      taskId,
      date,
      taskname,
      level,
      is_done,
      nextPriority
    );

    await newTask.save(userId);
    console.log("Task created successfully with priority:", nextPriority);
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
