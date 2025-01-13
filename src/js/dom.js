export function renderProjects(projects) {
  const oldProjects = document.querySelectorAll(".project");

  oldProjects.forEach((project) => {
    project.remove();
  });

  // const projectWrapper = document.createElement("div");

  for (const project of projects) {
    const projectDiv = document.createElement("button");
    projectDiv.style.display = "block";
    projectDiv.classList.add("project");
    projectDiv.style.backgroundColor = "skyblue";
    projectDiv.textContent += project.name;
    projectDiv.dataset.projectName = project.name;
    document.body.appendChild(projectDiv);
  }
  // document.body.appendChild(projectWrapper);
}

export function renderTodo(project) {
  const projectTodoList = document.createElement("div");
  projectTodoList.dataset.projectName = project.name;
  projectTodoList.classList.add("project-todo");
  project.getTodoStorage().forEach((todo) => {
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

    const removeTodo = document.createElement("button");
    removeTodo.classList.add("remove-todo");
    removeTodo.textContent = "Delete Todo";
    todoWrapper.appendChild(title);
    todoWrapper.appendChild(description);
    todoWrapper.appendChild(dueDate);
    todoWrapper.appendChild(priority);
    todoWrapper.appendChild(removeTodo);

    projectTodoList.appendChild(todoWrapper);
  });
  document.body.appendChild(projectTodoList);
}

export function addTaskBtn(project) {
  const addTask = document.createElement("button");
  addTask.classList.add("add-task");
  addTask.textContent = "Add task";
  addTask.style.backgroundColor = "green";
  addTask.dataset.projectName = project.name;
  document.body.appendChild(addTask);
}

export function createProjectBtn() {
  const createProject = document.createElement("button");
  createProject.classList.add("create-project-btn");
  createProject.textContent = "Create Project";
  createProject.style.display = "block  ";
  document.body.appendChild(createProject);
}
