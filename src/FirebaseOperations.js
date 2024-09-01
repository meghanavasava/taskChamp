import { ref, set } from "firebase/database";
import { realDb } from "./firebaseConfig";
import { User } from "./models/User";
import { Task } from "./models/Task";

export const createUserInFirebase = (userId, user) => {
  const userRef = ref(realDb, "users/" + userId);
  return set(userRef, user)
    .then(() => {
      console.log("User created successfully!");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

export const addTaskToUserInFirebase = (userId, taskId, task) => {
  const taskRef = ref(realDb, `users/${userId}/tasks/${taskId}`);
  return set(taskRef, task)
    .then(() => {
      console.log("Task added successfully!");
    })
    .catch((error) => {
      console.error("Error adding task:", error);
    });
};

// Example usage
const setupUserAndTask = () => {
  const userId = "userId1"; // Example user ID
  const user = new User("user1", "password1", "01-01-2000", "CountryName");
  const task = new Task("01-09-2024", "Example Task", "medium", false);

  user.addTask("taskId1", task);

  return createUserInFirebase(userId, user)
    .then(() => {
      return addTaskToUserInFirebase(userId, "taskId1", user.tasks["taskId1"]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export { setupUserAndTask };
