export function renderProjects(projects, clearOldElementCallback) {
  clearOldElementCallback(".project");
  clearOldElementCallback(".project-wrapper");

  const projectWrapper = document.createElement("div");
  projectWrapper.classList.add("project-wrapper");

  for (const project of projects) {
    const projectDiv = document.createElement("button");
    projectDiv.style.display = "block";
    projectDiv.classList.add("project");
    projectDiv.style.backgroundColor = "skyblue";
    projectDiv.textContent += project.name;
    projectDiv.dataset.projectName = project.name;
    projectWrapper.appendChild(projectDiv);
  }
  document.body.appendChild(projectWrapper);
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
    title.classList.add("todo-title");
    const description = document.createElement("p");
    description.textContent = todo.description;
    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;
    const priority = document.createElement("p");
    priority.textContent = todo.priority;

    const isTodoComplete = document.createElement("input");
    isTodoComplete.checked = todo.complete;
    isTodoComplete.setAttribute("type", "checkbox");
    isTodoComplete.classList.add("complete-todo");

    const editTodo = document.createElement("button");
    editTodo.classList.add("edit-todo");
    editTodo.textContent = "Edit Todo";

    const removeTodo = document.createElement("button");
    removeTodo.classList.add("remove-todo");
    removeTodo.textContent = "Delete Todo";
    todoWrapper.appendChild(isTodoComplete);
    todoWrapper.appendChild(title);
    todoWrapper.appendChild(description);
    todoWrapper.appendChild(dueDate);
    todoWrapper.appendChild(priority);
    todoWrapper.appendChild(editTodo);
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

export function removeProjectBtn(projectName) {
  const delBtn = document.createElement("button");
  delBtn.textContent = "delete";
  delBtn.classList.add("remove-project");
  delBtn.dataset.projectName = projectName;
  delBtn.style.display = "block";
  delBtn.style.backgroundColor = "red";
  document.body.appendChild(delBtn);
}
