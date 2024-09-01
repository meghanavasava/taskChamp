export class User {
  constructor(username, password, birthdate, country) {
    this.username = username;
    this.password = password;
    this.birthdate = birthdate; // Format: DD-MM-YYYY
    this.country = country;
    this.tasks = {};
  }

  addTask(taskId, task) {
    this.tasks[taskId] = task;
  }
}
