import { ids } from "webpack";
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

  const delBtn = document.createElement("button");
  delBtn.textContent = "delete";
  delBtn.classList.add("remove-project");
  delBtn.style.display = "block";
  delBtn.addEventListener("click", (e) => {
    const allDelBtn = document.querySelectorAll(".remove-project");
    const todoList = document.querySelectorAll(".todo-wrapper");
    allDelBtn.forEach((btn, index) => {
      if (e.target == btn) {
        const addTask = document.querySelector(".add-task");

        if (
          addTask &&
          addTask.dataset.projectName ==
            ProjectManager.accessProject(index).name
        ) {
          addTask.remove();
        }

        if (
          ProjectManager.accessProject(index).name ==
          todoList[index].dataset.projectName
        ) {
          todoList[index].remove();
        }
        ProjectManager.showProjectStorage().splice(index, 1);
        renderProjects(ProjectManager.showProjectStorage());
        allDelBtn[index].remove();
      }
    });
  });
  document.body.appendChild(delBtn);
});

const body = document.body;
body.addEventListener("click", (e) => {
  if (e.target.classList.value == "project") {
    const allProjects = document.querySelectorAll(".project");
    allProjects.forEach((project, index) => {
      if (e.target == project) {
        addTodoBtn(ProjectManager.accessProject(index), project);
        console.log(index);
        //remove old  todo wrapper
        clearOldElement(".todo-wrapper");
        renderTodo(ProjectManager.accessProject(index), showTodoList);
      }
    });
  }
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
  addTaskBtn(project);
  addTaskListener(project, clearOldElement, renderTodo, showTodoList);
}

function deleteProject() {
  deleteProjectBtn();
  const deleteProjectButtons = document.querySelectorAll(".remove-project");
  deleteProjectButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      console.log(index);
      console.log(deleteProjectButtons);
    });
  });
}
