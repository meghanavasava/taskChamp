import { ref, set, update } from "firebase/database";
import { realDb } from "./firebase";

export const createUser = (userId, userData) => {
  const userRef = ref(realDb, "users/" + userId);
  return set(userRef, userData);
};

export const addTask = (userId, taskId, taskData) => {
  const taskRef = ref(realDb, `users/${userId}/tasks/${taskId}`);
  return set(taskRef, taskData);
};
