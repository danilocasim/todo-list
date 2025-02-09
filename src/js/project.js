import { Todo, Restore } from "./barrel";

export class Project {
  todoStorage = [];

  constructor(name) {
    this.name = name;
  }

  static removeTodo(todoProjectName, todoIndex) {
    const projectStorage = JSON.parse(localStorage.getItem("project-storage"));

    const projectStorageWithMethods = Restore.restoreMethods(projectStorage);

    projectStorageWithMethods[
      projectStorageWithMethods.findIndex((project) => {
        return project.name == todoProjectName;
      })
    ].todoStorage.splice(todoIndex, 1);

    localStorage.setItem(
      "project-storage",
      JSON.stringify(projectStorageWithMethods)
    );
  }

  addTodo(title, description, dueDate, priority) {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );

      const projectStorageWithMethods = Restore.restoreMethods(projectStorage);

      projectStorageWithMethods[
        projectStorageWithMethods.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage.push(new Todo(title, description, dueDate, priority));
      localStorage.setItem(
        "project-storage",
        JSON.stringify(projectStorageWithMethods)
      );
    }
  }

  getTodoStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );
      const projectStorageWithMethods = Restore.restoreMethods(projectStorage);
      return projectStorageWithMethods[
        projectStorageWithMethods.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage;
    }
  }

  editTodo(index, newTitle, newDescription, newDueDate, newPriority) {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );

      const projectStorageWithMethods = Restore.restoreMethods(projectStorage);
      projectStorageWithMethods[
        projectStorageWithMethods.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage[index].editTask(
        newTitle,
        newDescription,
        newDueDate,
        newPriority
      );
      localStorage.setItem(
        "project-storage",
        JSON.stringify(projectStorageWithMethods)
      );
    }
  }

  isCompleteTodo(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );

      const projectStorageWithMethods = Restore.restoreMethods(projectStorage);

      projectStorageWithMethods[
        projectStorageWithMethods.findIndex((project) => {
          return project.name == this.name;
        })
      ].todoStorage[index].isCompleteTask();
      localStorage.setItem(
        "project-storage",
        JSON.stringify(projectStorageWithMethods)
      );
    }
  }
}
