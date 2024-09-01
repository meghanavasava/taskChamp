export class User {
  constructor(userId, username, password, birthdate, country) {
    this.userId = userId; 
    this.username = username;
    this.password = password;
    this.birthdate = birthdate;
    this.country = country;
    this.tasks = {};
  }

  addTask(task) {
    this.tasks[task.taskId] = task;
  }
}

// Format is provided on WhatsApp
