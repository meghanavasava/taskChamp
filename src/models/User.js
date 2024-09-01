export class User {
  constructor(username, password, birthdate, country) {
    this.username = username;
    this.password = password;
    this.birthdate = birthdate;
    this.country = country;
    this.tasks = {};
  }

  addTask(taskId, task) {
    this.tasks[taskId] = task;
  }
}

// Format is provided on WhatsApp
