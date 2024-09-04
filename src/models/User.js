import { ref, set, get } from "firebase/database";
import { realDb } from "../firebase";
import { Streak } from "./Streak";

export class User {
  constructor(userId, username, password, birthdate, country) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.birthdate = birthdate;
    this.country = country;
    this.tasks = {};
    this.streak = new Streak();
  }

  save() {
    const userRef = ref(realDb, `users/${this.userId}`);
    return set(userRef, {
      username: this.username,
      password: this.password,
      birthdate: this.birthdate,
      country: this.country,
      tasks: this.tasks,
      streak: this.streak.getDates(),
    });
  }

  addTask(task) {
    this.tasks[task.taskId] = task;
    return this.save();
  }

  updateTask(taskId, updates) {
    if (this.tasks[taskId]) {
      Object.assign(this.tasks[taskId], updates);
      return this.save().then(() => this.updateStreak());
    }
  }

  updateStreak() {
    const today = new Date().toLocaleDateString("en-GB");
    const allTasksDone = Object.values(this.tasks).every(
      (task) => task.is_done
    );

    if (allTasksDone) {
      this.streak.addDate(today);
    } else {
      this.streak.removeDate(today);
    }

    return this.save();
  }

  static fetch(userId) {
    const userRef = ref(realDb, `users/${userId}`);
    return get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const user = new User(
          userId,
          data.username,
          data.password,
          data.birthdate,
          data.country
        );
        user.tasks = data.tasks || {};
        user.streak = new Streak();
        user.streak.dates = data.streak || [];
        return user;
      } else {
        throw new Error("User not found");
      }
    });
  }
}
