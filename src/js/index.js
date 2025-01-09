import { ProjectManager, projectCreateDiv, showTodoList } from "./barrel.js";

const addProjectbtn = document.createElement("button");

addProjectbtn.textContent = "Add Project ";
addProjectbtn.addEventListener("click", () => {
  ProjectManager.addProject(prompt("Name of project"));

  projectCreateDiv(ProjectManager.showStorage());
});

document.body.appendChild(addProjectbtn);

//add task
