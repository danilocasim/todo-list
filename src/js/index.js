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

projectListener(ProjectManager, addTodoBtn, clearOldElement, renderTodo);
removeTodoListener(ProjectManager, renderTodo, clearOldElement);
editTodoListener(ProjectManager, clearOldElement, renderTodo, renderAllTodo);
isTodoCompleteListener(ProjectManager);

// show all todo
function renderAllTodo() {
  ProjectManager.showProjectStorage().forEach((project) => {
    renderTodo(project);
  });
}

function addTodoBtn(project) {
  clearOldElement(".add-task");

  addTaskBtn(project);
  addTaskListener(project, clearOldElement, renderTodo);
}
