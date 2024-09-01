import { User } from "./User";

describe("User Class", () => {
  it("should create a User instance with the correct attributes", () => {
    const user = new User(
      "userId1",
      "username",
      "password",
      "01-01-2000",
      "CountryName"
    );

    expect(user.userId).toBe("userId1");
    expect(user.username).toBe("username");
    expect(user.password).toBe("password");
    expect(user.birthdate).toBe("01-01-2000");
    expect(user.country).toBe("CountryName");
  });

  it("should add a task to the user", () => {
    const user = new User(
      "userId1",
      "username",
      "password",
      "01-01-2000",
      "CountryName"
    );
    const task = {
      taskId: "taskId1",
      date: "01-09-2024",
      taskname: "Example Task",
      level: "medium",
      is_done: false,
    };

    user.addTask("taskId1", task);

    expect(user.tasks["taskId1"]).toEqual(task);
  });
});
