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
    });
  }

  addTask(task) {
    this.tasks[task.taskId] = task;
    const userRef = ref(realDb, `users/${this.userId}`);
    return set(userRef, {
      username: this.username,
      password: this.password,
      birthdate: this.birthdate,
      country: this.country,
      tasks: this.tasks,
    });
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
        return user;
      } else {
        throw new Error("User not found");
      }
    });
  }
}
