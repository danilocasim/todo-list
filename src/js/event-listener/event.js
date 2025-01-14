export function addTaskListener(
  project,
  clearOldElementCallback,
  renderTodoCallback
) {
  const addTask = document.querySelector(".add-task");

  addTask.addEventListener("click", () => {
    const title = prompt("Title");
    const description = prompt("Description");
    const dueDate = prompt("Due date");
    const priority = prompt("Priority");
    project.addTodo(title, description, dueDate, priority);
    //remove old todo wrapper
    clearOldElementCallback(".project-todo");

    renderTodoCallback(project);
  });
}

export function projectListener(
  ProjectManagerClass,
  addTodoBtnCallback,
  clearOldElementCallback,
  renderTodoCallback
) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "project") {
      const allProjects = document.querySelectorAll(".project");
      allProjects.forEach((project, index) => {
        if (e.target == project) {
          addTodoBtnCallback(ProjectManagerClass.accessProject(index), project);
          console.log(index);
          //remove old  todo wrapper
          clearOldElementCallback(".project-todo");
          renderTodoCallback(ProjectManagerClass.accessProject(index));
        }
      });
    }
  });
}

export function removeProjectListener(
  ProjectManagerClass,
  renderProjectsCallback,
  clearOldElementCallback
) {
  const deleteProjectButtons = document.querySelectorAll(".remove-project");
  deleteProjectButtons.forEach((delBtn) => {
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
            projectTodo.remove();
          }
          ProjectManagerClass.showProjectStorage().splice(index, 1);
          renderProjectsCallback(
            ProjectManagerClass.showProjectStorage(),
            clearOldElementCallback
          );
          allDelBtn[index].remove();
        }
      });
    });
  });
}

export function editTodoListener(
  ProjectManagerClass,
  clearOldElementCallback,
  renderTodoCallback
) {
  const body = document.body;

  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "edit-todo") {
      const allEditTodoBtn = document.querySelectorAll(".edit-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allEditTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            clearOldElementCallback(".todo-wrapper");

            const title = prompt("Title");
            const description = prompt("Description");
            const dueDate = prompt("Due date");
            const priority = prompt("Priority");

            ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).editTodo(index, title, description, dueDate, priority);

            renderTodoCallback(
              ProjectManagerClass.accessProject(
                ProjectManagerClass.showProjectStorage().findIndex(
                  (project) => {
                    return (
                      project.name == todoWrapper[index].dataset.projectName
                    );
                  }
                )
              )
            );
          }
        }
      });
    }
  });
}

export function removeTodoListener(ProjectManagerClass) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "remove-todo") {
      const allRemoveTodoBtn = document.querySelectorAll(".remove-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allRemoveTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            todoWrapper[index].remove();
            button.remove();

            ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
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
}

export function isTodoCompleteListener(ProjectManagerClass) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "complete-todo") {
      const allIsCompleteTodoBtn = document.querySelectorAll(".complete-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allIsCompleteTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).completeTodo(index);
          }
        }
      });
    }
  });
}
