import { ref, set } from "firebase/database";
import { realDb } from "./firebase";
import { User } from "./models/User";
import { Task } from "./models/Task";

// Function to create a user in Firebase
export const createUserInFirebase = (user) => {
  const userRef = ref(realDb, `users/${user.userId}`);
  return set(userRef, user)
    .then(() => {
      console.log("User created successfully!");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

// Function to add a task to a user in Firebase
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

// Example usage
// export const setupUserAndTask = () => {
//   const userId = "userId1"; // Example user ID
//   const user = new User(
//     userId,
//     "user1",
//     "password1",
//     "01-01-2000",
//     "CountryName"
//   );

//   const taskId = "taskId1"; // Example task ID
//   const task = new Task(taskId, "01-09-2024", "Example Task", "medium", false);

//   // Add task to the user
//   user.addTask(taskId, task);

//   // Save user to Firebase
//   return createUserInFirebase(user)
//     .then(() => {
//       // Save task to Firebase
//       return addTaskToUserInFirebase(user.userId, task);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };
