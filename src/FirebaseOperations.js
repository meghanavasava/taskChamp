import { realDb } from "./firebase";
import { ref, set } from "firebase/database";

export const createUserInFirebase = (user) => {
  const userId = `user_${Date.now()}`;
  const userRef = ref(realDb, `users/${userId}`);

  return set(userRef, {
    username: user.username,
    password: user.password,
    birthdate: user.birthdate,
    country: user.country,
    email: user.email,
  }).then(() => {
    return userId;
  });
};

export const addTaskToUserInFirebase = (userId, task) => {
  const taskRef = ref(realDb, `users/${userId}/tasks/${task.taskId}`);
  return set(taskRef, task)
    .then(() => {
      console.log("Task added successfully!");
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });
};
