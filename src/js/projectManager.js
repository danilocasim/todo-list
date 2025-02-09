import { Project, Restore } from "./barrel";

export class ProjectManager {
  static #projectStorage = [];

  static getProjectStorage = () => {
    return this.#projectStorage;
  };

  static addProject(name) {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );

      projectStorage.push(new Project(name));

      localStorage.setItem("project-storage", JSON.stringify(projectStorage));
    } else {
      this.#projectStorage.push(new Project(name));
      localStorage.setItem("project-storage", this.#projectStorage);
    }
  }

  static removeProject(index) {
    this.showProjectStorage().splice(index, 1);
    localStorage.setItem(
      "project-storage",
      JSON.stringify(this.getProjectStorage())
    );
  }

  static showProjectStorage() {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );
      this.#projectStorage = Restore.restoreMethods(projectStorage);
      return this.#projectStorage;
    } else {
      localStorage.setItem(
        "project-storage",
        JSON.stringify(this.#projectStorage)
      );
      return this.#projectStorage;
    }
  }

  static accessProject(index) {
    if (localStorage.getItem("project-storage")) {
      const projectStorage = JSON.parse(
        localStorage.getItem("project-storage")
      );

      const projectStorageWithMethods = Restore.restoreMethods(projectStorage);

      localStorage.setItem(
        "project-storage",
        JSON.stringify(projectStorageWithMethods)
      );
      return projectStorageWithMethods[index];
    } else {
      localStorage.setItem(
        "project-storage",
        JSON.stringify(this.#projectStorage)
      );
      return this.#projectStorage[index];
    }
  }
}
