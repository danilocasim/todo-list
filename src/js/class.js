class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  editTodo(newTitle, newDescription, newDueDate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
  }

  completeTodo() {
    this.complete = this.complete == false ? true : false;
  }
}

class Project {
  #todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  addTodo(title, description, dueDate, priority) {
    this.#todoStorage.push(new Todo(title, description, dueDate, priority));
  }

  getTodoStorage() {
    return this.#todoStorage;
  }

  editTodo(index, newTitle, newDescription, newDueDate, newPriority) {
    this.#todoStorage[index].editTodo(
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
  }

  completeTodo(index) {
    this.#todoStorage[index].completeTodo();
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static addProject(name) {
    this.#projectStorage.push(new Project(name));
  }

  static showProjectStorage() {
    return this.#projectStorage;
  }

  static accessProject(index) {
    return this.#projectStorage[index];
  }
}
