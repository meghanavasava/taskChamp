import { ref, set } from "firebase/database";
import { realDb } from "./firebase";
import { User } from "./models/User";
import { Task } from "./models/Task";

// Function to create a user in Firebase
export const createUser = (user) => {
  if (!(user instanceof User)) {
    throw new Error("Parameter must be an instance of User");
  }

  const userRef = ref(realDb, `users/${user.userId}`);
  return set(userRef, {
    username: user.username,
    password: user.password,
    birthdate: user.birthdate,
    country: user.country,
    tasks: user.tasks,
  });
};

// Function to add a task to a user in Firebase
export const addTask = (userId, task) => {
  if (!(task instanceof Task)) {
    throw new Error("Parameter must be an instance of Task");
  }

  const taskRef = ref(realDb, `users/${userId}/tasks/${task.taskId}`);
  return set(taskRef, {
    date: task.date,
    taskname: task.taskname,
    level: task.level,
    is_done: task.is_done,
  });
};
