import React, { useState } from "react";
import { User } from "../models/User";
import { Task } from "../models/Task";

const MyComponent = () => {
  const [user, setUser] = useState(null);
  const [taskAdded, setTaskAdded] = useState(false);

  const handleCreateUser = async () => {
    try {
      const userId = `user_${Date.now()}`;
      const newUser = new User(
        userId,
        "Khushi",
        "khushi_1304",
        "13-04-2004",
        "India"
      );

      await newUser.save();
      console.log("User created successfully!");
      setUser(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleAddTask = async () => {
    if (!user) {
      console.error("User must be created before adding a task.");
      return;
    }

    try {
      const today = new Date().toLocaleDateString("en-GB");
      const newTask = new Task(
        `task_${Date.now()}`,
        today,
        "Sample Task2",
        "Medium",
        false,
        1
      );

      await newTask.save(user.userId);
      console.log("Task added successfully!");

      newTask.is_done = true;
      await newTask.update(user.userId);
      console.log("Task updated successfully!");

      user.streak.addDate(today);
      console.log("Streak updated successfully!");
      setTaskAdded(true);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleAddTask} disabled={!user || taskAdded}>
        Add Task
      </button>
      {taskAdded && <p>Task has been added and updated!</p>}
    </div>
  );
};

export default MyComponent;
