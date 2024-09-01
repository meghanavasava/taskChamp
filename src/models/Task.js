import { ref, set, get } from "firebase/database";
import { realDb } from "../firebase";

export class Task {
  constructor(taskId, date, taskname, level, is_done) {
    this.taskId = taskId;
    this.date = date;
    this.taskname = taskname;
    this.level = level;
    this.is_done = is_done;
  }

  save(userId) {
    const taskRef = ref(realDb, `users/${userId}/tasks/${this.taskId}`);
    return set(taskRef, {
      date: this.date,
      taskname: this.taskname,
      level: this.level,
      is_done: this.is_done,
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
          data.is_done
        );
      } else {
        throw new Error("Task not found");
      }
    });
  }

  update(userId) {
    const taskRef = ref(realDb, `users/${userId}/tasks/${this.taskId}`);
    return set(taskRef, {
      date: this.date,
      taskname: this.taskname,
      level: this.level,
      is_done: this.is_done,
    });
  }
}
