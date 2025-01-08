class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  editTodo(newTitle, newDescription, newDueDate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
  }
}

class Project {
  #todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  addTask(title, description, dueDate, priority) {
    this.#todoStorage.push(new Todo(title, description, dueDate, priority));
  }

  getTodoStorage() {
    return this.#todoStorage;
  }

  editTask(index, newTitle, newDescription, newDueDate, newPriority) {
    this.#todoStorage[index].editTodo(
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static addProject(name) {
    this.#projectStorage.push(new Project(name));
  }

  static showStorage() {
    return this.#projectStorage;
  }

  static accessProject(index) {
    return this.#projectStorage[index];
  }
}
