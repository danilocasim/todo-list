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
  isTodoImportantListener,
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
isTodoImportantListener(ProjectManager);

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
// Render all todo
const allTasks = document.createElement("button");
allTasks.textContent = "All Tasks";

allTasks.addEventListener("click", () => {
  clearOldElement(".todo-wrapper");
  renderAllTodo();
});

document.body.appendChild(allTasks);

// filter all important

const allImportant = document.createElement("button");
allImportant.textContent = "Important";

allImportant.addEventListener("click", () => {
  ProjectManager.showProjectStorage().forEach((project) => {
    project.getTodoStorage().forEach((todo) => {
      if (todo.isImportant) {
        console.log(todo);
      }
    });
  });
});

document.body.appendChild(allImportant);
