import { Task } from "./Task";

describe("Task Class", () => {
  it("should create a Task instance with the correct attributes", () => {
    const task = new Task(
      "taskId1",
      "01-09-2024",
      "Example Task",
      "medium",
      false
    );

    expect(task.taskId).toBe("taskId1");
    expect(task.date).toBe("01-09-2024");
    expect(task.taskname).toBe("Example Task");
    expect(task.level).toBe("medium");
    expect(task.is_done).toBe(false);
  });
});
