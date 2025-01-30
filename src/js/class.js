class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  editTodo(newTitle, newDescription, newDueDate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
  }

  isCompleteTodo() {
    this.isComplete = this.isComplete == false ? true : false;
  }
}

class Project {
  #todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  addTodo(title, description, dueDate, priority) {
    if (localStorage.getItem("todo-storage")) {
      const todoStorageJson = localStorage.getItem("todo-storage");

      const todoStorage = JSON.parse(todoStorageJson);

      todoStorage.push(new Todo(title, description, dueDate, priority));

      const json = JSON.stringify(todoStorage);

      localStorage.setItem("todo-storage", json);
    } else {
      this.#todoStorage.push(new Todo(title, description, dueDate, priority));

      const todoStorageJson = JSON.stringify(this.#todoStorage);

      localStorage.setItem("todo-storage", todoStorageJson);
    }
  }

  getTodoStorage() {
    if (localStorage.getItem("todo-storage")) {
      const todoStorageJson = localStorage.getItem("todo-storage");

      const todoStorage = JSON.parse(todoStorageJson);

      return todoStorage;
    } else {
      const todoStorageJson = JSON.stringify(this.#todoStorage);

      localStorage.setItem("todo-storage", todoStorageJson);

      return this.#todoStorage;
    }
  }

  editTodo(index, newTitle, newDescription, newDueDate, newPriority) {
    if (localStorage.getItem("todo-storage")) {
      const todoStorageJson = localStorage.getItem("todo-storage");

      const todoStorage = JSON.parse(todoStorageJson);

      todoStorage[index].editTodo(
        newTitle,
        newDescription,
        newDueDate,
        newPriority
      );

      const json = JSON.stringify(todoStorage);

      localStorage.setItem("todo-storage", json);
    }
  }

  isCompleteTodo(index) {
    if (localStorage.getItem("todo-storage")) {
      const todoStorageJson = localStorage.getItem("todo-storage");

      const todoStorage = JSON.parse(todoStorageJson);

      todoStorage[index].isCompleteTodo();

      const json = JSON.stringify(todoStorage);

      localStorage.setItem("todo-storage", json);
    }
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static addProject(name) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      projectStorage.push(new Project(name));

      const json = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", json);
    } else {
      this.#projectStorage.push(new Project(name));

      const projectStorage = JSON.stringify(this.#projectStorage);

      localStorage.setItem("project-storage", projectStorage);
    }
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      return projectStorage;
    } else {
      const projectStorageJson = JSON.stringify(this.#projectStorage);

      localStorage.setItem("project-storage", projectStorageJson);

      return this.#projectStorage;
    }
  }

  static accessProject(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      return projectStorage[index];
    } else {
      const projectStorageJson = JSON.stringify(this.#projectStorage);

      localStorage.setItem("project-storage", projectStorageJson);

      return this.#projectStorage[index];
    }
  }
}
