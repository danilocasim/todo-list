export function renderProjects(projects) {
  const oldProjects = document.querySelectorAll(".project");

  oldProjects.forEach((project) => {
    project.remove();
  });

  for (const project of projects) {
    const projectDiv = document.createElement("button");
    projectDiv.style.display = "block";
    projectDiv.classList.add("project");
    projectDiv.textContent += project.name;
    projectDiv.dataset.projectName = project.name;
    document.body.appendChild(projectDiv);
  }
}

export function showTodoList(todo, project) {
  const todoWrapper = document.createElement("div");
  todoWrapper.classList.add("todo-wrapper");
  todoWrapper.dataset.projectName = project.name;
  const title = document.createElement("p");
  title.textContent = todo.title;
  const description = document.createElement("p");
  description.textContent = todo.description;
  const dueDate = document.createElement("p");
  dueDate.textContent = todo.dueDate;
  const priority = document.createElement("p");
  priority.textContent = todo.priority;

  todoWrapper.appendChild(title);
  todoWrapper.appendChild(description);
  todoWrapper.appendChild(dueDate);
  todoWrapper.appendChild(priority);

  document.body.appendChild(todoWrapper);
}

export function addTaskBtn(project) {
  const addTask = document.createElement("button");
  addTask.classList.add("add-task");
  addTask.textContent = "Add task";
  addTask.dataset.projectName = project.name;
  document.body.appendChild(addTask);
}

export function createProjectBtn() {
  const createProject = document.createElement("button");
  createProject.classList.add("create-project-btn");
  createProject.textContent = "Create Project";
  document.body.appendChild(createProject);
}

export function deleteProjectBtn() {
  const removeProjectBtn = document.createElement("button");
  removeProjectBtn.classList.add("remove-project");
  removeProjectBtn.style.display = "block";
  removeProjectBtn.textContent = "Remove Project";
  document.body.appendChild(removeProjectBtn);
}
