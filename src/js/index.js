import {
  ProjectManager,
  renderProjects,
  showTodoList,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  createProjectBtn,
  addTaskListener,
  deleteProjectBtn,
} from "./barrel.js";

//create proj button
createProjectBtn();
const createProject = document.querySelector(".create-project-btn");

createProject.addEventListener("click", () => {
  const projectName = prompt("Project?");
  ProjectManager.addProject(projectName);
  renderProjects(ProjectManager.showProjectStorage());

  deleteProject();

  // fetch project's todo
  const allProject = document.querySelectorAll(".project");
  allProject.forEach((project, index) => {
    project.addEventListener("click", (e) => {
      addTodoBtn(ProjectManager.accessProject(index));
      console.log(allProject);

      //remove old todo wrapper
      clearOldElement(".todo-wrapper");
      renderTodo(ProjectManager.accessProject(index), showTodoList);
    });
  });
});

// show all todo
function renderAllTodo() {
  ProjectManager.showProjectStorage().forEach((project) => {
    project.getTodoStorage().forEach((todo) => {
      showTodoList(todo);
      console.log(todo);
    });
  });
}

function addTodoBtn(project) {
  clearOldElement(".add-task");
  addTaskBtn();
  addTaskListener(project, clearOldElement, renderTodo, showTodoList);
}

function deleteProject() {
  deleteProjectBtn();
  const deleteProjectButtons = document.querySelectorAll(".remove-project");
  deleteProjectButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      console.log(index);
    });
  });
}
