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
} from "./barrel.js";

//create proj button
createProjectBtn();
const createProject = document.querySelector(".create-project-btn");

createProject.addEventListener("click", () => {
  const projectName = prompt("Project?");
  ProjectManager.addProject(projectName);

  removeProjectBtn(projectName);
  removeProjectListener(ProjectManager, renderProjects, clearOldElement);
  renderProjects(ProjectManager.showProjectStorage(), clearOldElement);
});

projectListener(ProjectManager, addTodoBtn, clearOldElement, renderTodo);
removeTodoListener(ProjectManager);
editTodoListener(ProjectManager, clearOldElement, renderTodo);
isTodoCompleteListener(ProjectManager);

// show all todo
function renderAllTodo() {
  ProjectManager.showProjectStorage().forEach((project) => {
    project.getTodoStorage().forEach((todo) => {
      // showTodoList(todo);
      console.log(todo);
    });
  });
}

function addTodoBtn(project) {
  clearOldElement(".add-task");

  addTaskBtn(project);
  addTaskListener(project, clearOldElement, renderTodo);
}
