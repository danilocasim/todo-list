import { Project, Todo } from "./barrel";

export class Restore {
  static restoreMethods(projectStorage) {
    return projectStorage.map((project) => {
      const todoStorage = project.todoStorage.map((todo) => {
        return Object.assign(new Todo(), todo);
      });
      return Object.assign(new Project(), project, { todoStorage });
    });
  }
}
