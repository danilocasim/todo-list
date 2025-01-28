function removeProjectBtn(projectName, el) {
  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.classList.add("remove-project");
  delBtn.dataset.projectName = projectName;
  delBtn.style.backgroundColor = "red";
  delBtn.style.border = "none";

  delBtn.style.width = "25px";
  el.appendChild(delBtn);
}

export function renderProjects(projects, clearOldElementCallback) {
  clearOldElementCallback(".project");
  clearOldElementCallback(".project-wrapper");

  const projectSidebar = document.querySelector(".projects-sidebar");

  const projectWrapper = document.createElement("div");
  projectWrapper.classList.add("project-wrapper");

  projects.forEach((project) => {
    const wrapper = document.createElement("div");

    const projectDiv = document.createElement("button");
    removeProjectBtn(project.name, wrapper);
    projectDiv.style.display = "block";
    projectDiv.classList.add("project");

    projectDiv.textContent += project.name;
    projectDiv.dataset.projectName = project.name;
    wrapper.appendChild(projectDiv);

    projectWrapper.appendChild(wrapper);
  });

  projectSidebar.appendChild(projectWrapper);
}

export function renderTodo(project) {
  const projectTodoList = document.createElement("div");
  const projectTodoContainer = document.querySelector(
    ".project-todo-container"
  );

  const projectName = document.querySelector(".project-name");
  projectName.textContent = project.name;

  projectTodoList.classList.add("project-todo");
  project.getTodoStorage().forEach((todo, index) => {
    const todoWrapper = document.createElement("div");
    projectName.textContent = project.name;
    todoWrapper.classList.add("todo-wrapper");
    todoWrapper.dataset.projectName = project.name;
    todoWrapper.dataset.index = index;
    const title = document.createElement("p");
    title.textContent = todo.title;
    title.classList.add("todo-title");
    const description = document.createElement("p");
    description.textContent = todo.description;
    const dueDate = document.createElement("p");
    dueDate.textContent = todo.dueDate;
    dueDate.classList.add("todo-date");

    const priority = document.createElement("p");
    priority.textContent = todo.priority;

    const isTodoComplete = document.createElement("input");
    isTodoComplete.checked = todo.isComplete;
    isTodoComplete.setAttribute("type", "checkbox");
    isTodoComplete.classList.add("complete-todo");

    if (todo.isComplete) {
      title.style.textDecoration = "line-through";
      dueDate.style.textDecoration = "line-through";
    } else {
      title.style.removeProperty("text-direction");
      dueDate.style.removeProperty("text-direction");
    }

    const editTodo = document.createElement("button");

    editTodo.classList.add("edit-todo");

    editTodo.textContent = "Edit Todo";
    editTodo.dataset.projectName = project.name;

    const removeTodo = document.createElement("button");
    removeTodo.classList.add("remove-todo");
    removeTodo.textContent = "Delete Todo";

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add("title-wrapper");
    const buttonsWrapper = document.createElement("div");

    titleWrapper.appendChild(isTodoComplete);
    titleWrapper.appendChild(title);

    todoWrapper.appendChild(titleWrapper);
    // todoWrapper.appendChild(description);
    todoWrapper.appendChild(dueDate);
    // todoWrapper.appendChild(priority);

    buttonsWrapper.appendChild(editTodo);
    buttonsWrapper.appendChild(removeTodo);

    todoWrapper.appendChild(buttonsWrapper);

    projectTodoList.appendChild(todoWrapper);
  });
  projectTodoContainer.appendChild(projectTodoList);
}

export function addTaskBtn(project) {
  const addTaskContainer = document.querySelector(".add-task-container");

  const addTask = document.createElement("button");
  addTask.classList.add("add-task");
  addTask.textContent = "Add task";
  addTask.style.backgroundColor = "green";
  addTask.dataset.projectName = project.name;
  addTaskContainer.appendChild(addTask);
}

export function createProjectBtn(el) {
  const createProject = document.createElement("button");
  createProject.classList.add("create-project-btn");
  createProject.textContent = "Create Project";
  createProject.style.display = "block  ";
  el.appendChild(createProject);
}

function sideBar(el) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("side-bar");

  const logo = document.createElement("div");
  logo.textContent = "Todo";
  logo.classList.add("logo");

  const projectText = document.createElement("div");
  projectText.textContent = "Projects";
  projectText.classList.add("projects-header");

  const projectsWrapper = document.createElement("div");
  projectsWrapper.classList.add("projects-sidebar");

  wrapper.appendChild(logo);
  wrapper.appendChild(projectText);
  wrapper.appendChild(projectsWrapper);
  createProjectBtn(wrapper);

  el.appendChild(wrapper);
}

function heroTodo(el) {
  const heroTodoContainer = document.createElement("div");
  heroTodoContainer.classList.add("hero-todo-container");
  const heroTodoNav = document.createElement("div");
  heroTodoNav.classList.add("hero-todo-nav");
  const addTaskContainer = document.createElement("div");
  addTaskContainer.classList.add("add-task-container");
  const projectName = document.createElement("div");
  projectName.classList.add("project-name");

  const projectTodo = document.createElement("div");
  projectTodo.classList.add("project-todo-container");

  heroTodoNav.appendChild(addTaskContainer);
  heroTodoNav.appendChild(projectName);

  heroTodoContainer.appendChild(heroTodoNav);
  heroTodoContainer.appendChild(projectTodo);
  el.appendChild(heroTodoContainer);
}

export function mainDOM() {
  const container = document.createElement("div");
  container.classList.add("container");
  sideBar(container);
  heroTodo(container);

  document.body.appendChild(container);
}
