class Restore {
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
    const todoInstance = new Todo();

    projectStorage.forEach((project) => {
      Object.assign(Object.getPrototypeOf(project), {
        getTodoStorage: projectInstance.getTodoStorage,
        addTodo: projectInstance.addTodo,
        editTodo: projectInstance.editTodo,
        isCompleteTodo: projectInstance.isCompleteTodo,
      });

      Object.assign(Object.getPrototypeOf(project), {
        editTask: todoInstance.editTask,
        isCompleteTask: todoInstance.isCompleteTask,
      });
    });
  }

  static restoreTodoStorageData(todoStorageJson, currentProject) {
    const todoStorageArr = JSON.parse(todoStorageJson);

    console.log(todoStorageArr);

    todoStorageArr.forEach((todo) => {
      currentProject.push({
        title: todo.title,
        description: todo.description,
        dueDate: todo.dueDate,
        priority: todo.priority,
        isComplete: todo.isComplete,
      });
    });
  }
}

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

export class Project {
  todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  static removeTodo(todoProjectName, todoIndex) {
    const projectStorageJson = localStorage.getItem("project-storage");
    const projectStorage = JSON.parse(projectStorageJson);

    projectStorage[
      projectStorage.findIndex((project) => {
        return project.name == todoProjectName;
      })
    ].todoStorage.splice(todoIndex, 1);

    const newProjectStorageJson = JSON.stringify(projectStorage);
    localStorage.setItem("project-storage", newProjectStorageJson);
  }

  addTodo(title, description, dueDate, priority) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      projectStorage[
        projectStorage.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage.push(new Todo(title, description, dueDate, priority));

      console.log(projectStorage);
      const newProjectStorageJson = JSON.stringify(projectStorage);
      localStorage.setItem("project-storage", newProjectStorageJson);
    }
  }

  getTodoStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");
      const projectStorage = JSON.parse(projectStorageJson);

      return projectStorage[
        projectStorage.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage;
    }
  }

  editTodo(index, newTitle, newDescription, newDueDate, newPriority) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      projectStorage[
        projectStorage.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage[index].editTask(
        newTitle,
        newDescription,
        newDueDate,
        newPriority
      );

      const newProjectStorageJson = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", newProjectStorageJson);
    }
  }

  isCompleteTodo(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);

      projectStorage[
        projectStorage.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage[index].isCompleteTask();

      const newProjectStorageJson = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", newProjectStorageJson);
    }
  }
}

export class ProjectManager {
  static #projectStorage = [];

  static getProjectStorage = () => {
    return this.#projectStorage;
  };

  static addProject(name) {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const json = Restore.restoreTodoStorage(projectStorageJson);

      const projectStorage = JSON.parse(json);

      projectStorage.push(new Project(name));

      const finalJson = JSON.stringify(projectStorage);

      localStorage.setItem("project-storage", finalJson);
    } else {
      this.#projectStorage.push(new Project(name));

      const projectStorage = Restore.restoreTodoStorage(
        JSON.stringify(this.#projectStorage)
      );

      localStorage.setItem("project-storage", projectStorage);
    }
  }

  static removeProject(index) {
    this.showProjectStorage().splice(index, 1);

    const newProjectStorageJson = JSON.stringify(this.getProjectStorage());
    localStorage.setItem("project-storage", newProjectStorageJson);
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorageJson = localStorage.getItem("project-storage");

      const projectStorage = JSON.parse(projectStorageJson);
      this.#projectStorage = projectStorage;

      Restore.restoreTodoMethods(this.#projectStorage);
      return this.#projectStorage;
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

      Restore.restoreTodoMethods(projectStorage);

      const newProjectStorageJson = JSON.stringify(projectStorage);
      localStorage.setItem("project-storage", newProjectStorageJson);

      return projectStorage[index];
    } else {
      localStorage.setItem("project-storage", this.#projectStorage);

      return this.#projectStorage[index];
    }
  }
}
