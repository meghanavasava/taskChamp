import { createUser, addTask } from "./UserServices";

export const initializeFirebase = () => {
  // Initialize Firebase or any setup you need
};

// Also format and other things are provided in Whatsapp msg
export const setupUserAndTask = () => {
  const userId = "userId1"; // Dynamically generated
  const userData = {
    username: "user1",
    password: "password1",
    birthdate: "01-01-2000", // DD-MM-YYYY
    country: "CountryName",
    tasks: {
      taskId1: {
        date: "01-09-2024", // DD-MM-YYYY
        taskname: "Example Task",
        level: "medium", // easy, medium, hard
        is_done: false,
      },
    },
  };

  return createUser(userId, userData)
    .then(() => {
      console.log("User created successfully!");
      return addTask(userId, "taskId1", userData.tasks.taskId1);
    })
    .then(() => {
      console.log("Task added successfully!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
