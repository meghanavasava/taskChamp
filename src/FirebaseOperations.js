import { ref, set } from "firebase/database";
import { realDb } from "./firebase";

export const createUserInFirebase = (user) => {
  const userId = `user_${Date.now()}`;
  const userRef = ref(realDb, `users/${userId}`);

  return set(userRef, user)
    .then(() => {
      console.log("User created successfully with userId:", userId);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
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
