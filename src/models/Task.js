import { ref, set, get } from "firebase/database";
import { realDb } from "../firebase";

export class Task {
  constructor(taskId, date, taskname, level, is_done, priority) {
    this.taskId = taskId;
    this.date = date;
    this.taskname = taskname;
    this.level = level;
    this.is_done = is_done;
    this.priority = priority;
  }

  save(userId) {
    const taskRef = ref(realDb, `users/${userId}/tasks/${this.taskId}`);
    return set(taskRef, {
      date: this.date,
      taskname: this.taskname,
      level: this.level,
      is_done: this.is_done,
      priority: this.priority,
    });
  }

  static fetch(userId, taskId) {
    const taskRef = ref(realDb, `users/${userId}/tasks/${taskId}`);
    return get(taskRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        return new Task(
          taskId,
          data.date,
          data.taskname,
          data.level,
          data.is_done,
          data.priority
        );
      } else {
        throw new Error("Task not found");
      }
    });
  }

  async update(userId) {
    const taskRef = ref(realDb, `users/${userId}/tasks/${this.taskId}`);
    return set(taskRef, {
      date: this.date,
      taskname: this.taskname,
      level: this.level,
      is_done: this.is_done,
      priority: this.priority,
    });
  }

  static async getNextPriority(userId, date) {
    const userRef = ref(realDb, `users/${userId}/tasks`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const tasks = snapshot.val();
      const priorities = Object.values(tasks)
        .filter((task) => task.date === date)
        .map((task) => task.priority || 0);
      return Math.max(...priorities, 0) + 1;
    }
    return 1;
  }
}
