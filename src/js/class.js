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
    this.todoStorage[index].editTodo(
      newTitle,
      newDescription,
      newDueDate,
      newPriority
    );
  }

  isCompleteTodo(index) {
    this.todoStorage[index].isCompleteTodo();
  }
}

class RestoreMethod {
  static #arrayWithMethods;

  static sendTheArrayWithMethods(obj) {
    if (localStorage.getItem("todo-methods")) {
      let methods = localStorage.getItem("todo-methods");
      let parsedJson = JSON.parse(methods);
      this.#arrayWithMethods = parsedJson;
    } else {
      this.#arrayWithMethods = obj;

      localStorage.setItem("todo-methods", obj);
    }
  }

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

  static restoreTodoMethods(projectStorage, instance) {
    projectStorage.forEach((project) => {
      Object.assign(Object.getPrototypeOf(project), {
        getTodoStorage: instance.getTodoStorage,
        addTodo: instance.addTodo,
        editTodo: instance.editTodo,
        isCompleteTodo: instance.isCompleteTodo,
      });
    });
  }

  static getArrayWithMethods = () => {
    return this.#arrayWithMethods;
  };
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
      console.log(json);

      localStorage.setItem("project-storage", finalJson);
    } else {
      this.#projectStorage.push(new Project(name));

      RestoreMethod.sendTheArrayWithMethods(this.#projectStorage[0]);

      const projectStorage = RestoreMethod.restoreTodoStorage(
        JSON.stringify(this.#projectStorage)
      );

      console.log(RestoreMethod.getArrayWithMethods());

      localStorage.setItem("project-storage", projectStorage);
    }
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      RestoreMethod.restoreTodoMethods(projectStorage, new Project("Instance"));

      const newProjectStorage = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", newProjectStorage);
      return projectStorage;
    } else {
      localStorage.setItem("project-storage", this.#projectStorage);
    }
  }

  static accessProject(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);
      RestoreMethod.restoreTodoMethods(projectStorage, new Project("Instance"));

      return projectStorage[index];
    } else {
      localStorage.setItem("project-storage", this.#projectStorage);
    }
  }
}
