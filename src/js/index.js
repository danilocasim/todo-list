import { ProjectManager, projectCreateBtn, showTodoList } from "./barrel.js";

const createProject = document.createElement("button");
createProject.textContent = "Create Project";
createProject.addEventListener("click", () => {
  const projectName = prompt("Project?");
  ProjectManager.addProject(projectName);
  projectCreateBtn(ProjectManager.showProjectStorage());
});
document.body.appendChild(createProject);

// show all todo
function renderAllTodo() {
  ProjectManager.showProjectStorage().forEach((project) => {
    project.getTodoStorage().forEach((todo) => {
      showTodoList(todo);
      console.log(todo);
    });
  });
}

function renderTodo(project) {
  project.getTodoStorage().forEach((todo) => {
    console.log(project.name);
    showTodoList(todo);
  });
}
