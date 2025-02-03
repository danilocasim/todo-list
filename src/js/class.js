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

  isCompleteTodo(index) {
    this.#todoStorage[index].isCompleteTodo();
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static restoreMethod(projectStorage) {
    projectStorage.forEach((project) => {
      Object.assign(project, {
        "#todoStorage": project.getTodoStorage(),
      });
    });
  }

  static addProject(name) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");
      const projectStorage = JSON.parse(projectStorageJson);
      projectStorage.push(new Project(name));

      this.restoreMethod(projectStorage);
      const json = JSON.stringify(projectStorage);
      console.log(json);
      localStorage.setItem("project-storage", json);
    } else {
      this.#projectStorage.push(new Project(name));

      this.restoreMethod(this.#projectStorage);
      const projectStorage = JSON.stringify(this.#projectStorage);
      localStorage.setItem("project-storage", projectStorage);
    }
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      return projectStorage;
    }
  }

  static accessProject(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      return projectStorage[index];
    }
  }
}
