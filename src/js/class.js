class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  editTask(newTitle, newDescription, newDueDate, newPriority) {
    this.title = newTitle;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
  }

  isCompleteTask() {
    this.isComplete = this.isComplete == false ? true : false;
  }
}

class Project {
  todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  addTodo(title, description, dueDate, priority) {
    this.todoStorage.push(new Todo(title, description, dueDate, priority));
  }

  getTodoStorage() {
    return this.todoStorage;
  }

  editTodo(index, newTitle, newDescription, newDueDate, newPriority) {
    this.todoStorage[index].editTask(
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
  }

  isCompleteTodo(index) {
    this.todoStorage[index].isCompleteTask();
  }
}

class RestoreMethod {
  static restoreTodoStorage(json) {
    const projectStorage = JSON.parse(json);
    console.log(projectStorage);
    projectStorage.forEach((project) => {
      Object.assign(project, {
        todoStorage: project.todoStorage,
      });
    });

    return JSON.stringify(projectStorage);
  }

  static restoreTodoMethods(projectStorage) {
    const projectInstance = new Project();

    projectStorage.forEach((project) => {
      Object.assign(Object.getPrototypeOf(project), {
        getTodoStorage: projectInstance.getTodoStorage,
        addTodo: projectInstance.addTodo,
        editTodo: projectInstance.editTodo,
        isCompleteTodo: projectInstance.isCompleteTodo,
      });

      const todoInstance = new Todo();

      Object.assign(Object.getPrototypeOf(project.todoStorage), {
        editTask: todoInstance.editTask,
        isCompleteTask: todoInstance.isCompleteTask,
      });
    });
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static addProject(name) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const json = RestoreMethod.restoreTodoStorage(projectStorageJson);

      const projectStorage = JSON.parse(json);

      projectStorage.push(new Project(name));

      const finalJson = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", finalJson);
    } else {
      this.#projectStorage.push(new Project(name));

      const projectStorage = RestoreMethod.restoreTodoStorage(
        JSON.stringify(this.#projectStorage)
      );

      localStorage.setItem("project-storage", projectStorage);
    }
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      RestoreMethod.restoreTodoMethods(projectStorage);

      const newProjectStorageJson = JSON.stringify(projectStorage);
      localStorage.setItem("project-storage", newProjectStorageJson);

      return projectStorage;
    } else {
      localStorage.setItem("project-storage", this.#projectStorage);
      return this.#projectStorage;
    }
  }

  static accessProject(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      RestoreMethod.restoreTodoMethods(projectStorage, new Project());

      const newProjectStorageJson = JSON.stringify(projectStorage);
      localStorage.setItem("project-storage", newProjectStorageJson);

      return projectStorage[index];
    } else {
      localStorage.setItem("project-storage", this.#projectStorage);

      return this.#projectStorage[index];
    }
  }
}
