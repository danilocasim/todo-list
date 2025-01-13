import {
  ProjectManager,
  renderProjects,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  createProjectBtn,
  addTaskListener,
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
    const projectTodo = document.querySelector(".project-todo");
    allDelBtn.forEach((btn, index) => {
      if (e.target == btn) {
        const addTask = document.querySelector(".add-task");

        if (addTask) {
          addTask.remove();
        }

        if (projectTodo) {
          projectTodo[index].remove();
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
        clearOldElement(".project-todo");
        renderTodo(ProjectManager.accessProject(index));
      }
    });
  } else if (e.target.classList.value == "remove-todo") {
    const allRemoveTodoBtn = document.querySelectorAll(".remove-todo");
    const todoWrapper = document.querySelectorAll(".todo-wrapper");

    allRemoveTodoBtn.forEach((button, index) => {
      if (e.target == button) {
        if (todoWrapper[index]) {
          todoWrapper[index].remove();
          button.remove();

          ProjectManager.accessProject(
            ProjectManager.showProjectStorage().findIndex((project) => {
              return project.name == todoWrapper[index].dataset.projectName;
            })
          )
            .getTodoStorage()
            .splice(index, 1);
        }
      }
    });
  }
});

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
