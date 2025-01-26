import style from "../css/style.css";

import {
  ProjectManager,
  renderProjects,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  createProjectBtn,
  addTaskListener,
  projectListener,
  removeProjectListener,
  editTodoListener,
  removeTodoListener,
  isTodoCompleteListener,
  navBar,
  addTodoBtn,
} from "./barrel.js";

navBar();
//create proj button
createProjectBtn();
const createProject = document.querySelector(".create-project-btn");

createProject.addEventListener("click", () => {
  const projectName = prompt("Project?");
  ProjectManager.addProject(projectName);

  renderProjects(ProjectManager.showProjectStorage(), clearOldElement);

  removeProjectListener(
    ProjectManager,
    renderProjects,
    clearOldElement,
    renderTodo,
    addTaskBtn
  );
});

projectListener(
  ProjectManager,
  addTodoBtn,
  clearOldElement,
  renderTodo,
  addTaskBtn,
  addTaskListener
);
removeTodoListener(ProjectManager, renderTodo, clearOldElement);
editTodoListener(ProjectManager, clearOldElement, renderTodo);
isTodoCompleteListener(ProjectManager);
