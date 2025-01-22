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
  removeProjectBtn,
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

  removeProjectBtn(projectName);
  removeProjectListener(
    ProjectManager,
    renderProjects,
    clearOldElement,
    renderTodo,
    addTaskBtn
  );
  renderProjects(ProjectManager.showProjectStorage(), clearOldElement);
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
