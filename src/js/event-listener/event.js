export function addTaskListener(
  project,
  clearOldElementCallback,
  renderTodoCallback,
  dialogAddTodoCallback
) {
  const addTask = document.querySelector(".add-task");

  addTask.addEventListener("click", () => {
    clearOldElementCallback("dialog");
    dialogAddTodoCallback();

    const dialog = document.querySelector(".dialog-add-todo");

    dialog.showModal();

    dialog.addEventListener("submit", () => {
      const title = document.querySelector("#title").value;
      const description = document.querySelector("#description").value;
      const dueDate = document.querySelector("#dueDate").value;
      const priority = document.querySelector("#priority").value;
      project.addTodo(title, description, dueDate, priority);
      //remove old todo wrapper
      clearOldElementCallback(".project-todo");

      renderTodoCallback(project);

      const form = document.querySelector("form");
      form.reset();
    });
  });
}

export function projectListener(
  ProjectManagerClass,
  addTodoBtnCallback,
  clearOldElementCallback,
  renderTodoCallback,
  addTaskBtnCallback,
  addTaskListenerCallback,
  dialogAddTodoCallback
) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "project") {
      const allProjects = document.querySelectorAll(".project");
      allProjects.forEach((project, index) => {
        if (e.target == project) {
          addTodoBtnCallback(
            ProjectManagerClass.accessProject(index),
            clearOldElementCallback,
            addTaskBtnCallback,
            addTaskListenerCallback,
            renderTodoCallback,
            dialogAddTodoCallback
          );
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
  clearOldElementCallback,
  renderTodoCallback,
  addTaskBtnCallback,
  imagePath
) {
  const body = document.body;

  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "remove-project") {
      const deleteProjectButtons = document.querySelectorAll(".remove-project");
      deleteProjectButtons.forEach((delBtn, index) => {
        if (e.target == delBtn) {
          const projectTodo = document.querySelector(".project-todo");

          const addTask = document.querySelector(".add-task");
          if (addTask) {
            addTask.remove();
          }

          if (projectTodo) {
            projectTodo.remove();
          }

          delBtn.remove();

          ProjectManagerClass.removeProject(index);

          renderProjectsCallback(
            ProjectManagerClass.showProjectStorage(),
            clearOldElementCallback,
            imagePath
          );

          if (
            ProjectManagerClass.showProjectStorage().length > 0 &&
            ProjectManagerClass.accessProject(index - 1) != null
          ) {
            renderTodoCallback(ProjectManagerClass.accessProject(index - 1));

            addTaskBtnCallback(ProjectManagerClass.accessProject(index - 1));

            addTaskListener(
              ProjectManagerClass.accessProject(index - 1),
              clearOldElementCallback,
              renderTodoCallback
            );
          }
          if (
            ProjectManagerClass.showProjectStorage().length > 0 &&
            ProjectManagerClass.accessProject(index - 1) == null &&
            ProjectManagerClass.accessProject(index) != null
          ) {
            renderTodoCallback(ProjectManagerClass.accessProject(index));

            addTaskBtnCallback(ProjectManagerClass.accessProject(index));

            addTaskListener(
              ProjectManagerClass.accessProject(index),
              clearOldElementCallback,
              renderTodoCallback
            );
          }

          if (ProjectManagerClass.showProjectStorage().length == 0) {
            const projectName = document.querySelector(".project-name");
            projectName.textContent = "No projects here";
          }
        }
      });
    }
  });
}

export function editTodoListener(
  ProjectManagerClass,
  clearOldElementCallback,
  renderTodoCallback,
  dialogAddTodoCallback
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
            clearOldElementCallback(".project-todo");
            clearOldElementCallback("dialog");

            const currentTitle = ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].title;

            const currentDescription = ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].description;

            const currentDueDate = ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].dueDate;

            const currentPriority = ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].priority;

            dialogAddTodoCallback(
              currentTitle,
              currentDescription,
              currentDueDate,
              currentPriority
            );

            const dialog = document.querySelector(".dialog-add-todo");

            dialog.showModal();

            dialog.addEventListener("submit", () => {
              clearOldElementCallback(".todo-wrapper");

              const title = document.querySelector("#title").value;
              const description = document.querySelector("#description").value;
              const dueDate = document.querySelector("#dueDate").value;
              const priority = document.querySelector("#priority").value;

              ProjectManagerClass.accessProject(
                ProjectManagerClass.showProjectStorage().findIndex(
                  (project) => {
                    return (
                      project.name == todoWrapper[index].dataset.projectName
                    );
                  }
                )
              ).editTodo(
                todoWrapper[index].dataset.index,
                title,
                description,
                dueDate,
                priority
              );

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
            });
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

export function removeTodoListener(
  ProjectManagerClass,
  ProjectClass,
  renderTodoCallback,
  clearOldElementCallback
) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "remove-todo") {
      const allRemoveTodoBtn = document.querySelectorAll(".remove-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allRemoveTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            ProjectClass.removeTodo(
              todoWrapper[index].dataset.projectName,
              todoWrapper[index].dataset.index
            );

            todoWrapper[index].remove();
            button.remove();
            clearOldElementCallback(".project-todo");

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

export function isTodoCompleteListener(ProjectManagerClass) {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "complete-todo") {
      const allIsCompleteTodoBtn = document.querySelectorAll(".complete-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");
      const allTitle = document.querySelectorAll(".todo-title");
      const allDate = document.querySelectorAll(".todo-date");

      allIsCompleteTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            ProjectManagerClass.accessProject(
              ProjectManagerClass.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).isCompleteTodo(todoWrapper[index].dataset.index);

            if (
              ProjectManagerClass.accessProject(
                ProjectManagerClass.showProjectStorage().findIndex(
                  (project) => {
                    return (
                      project.name == todoWrapper[index].dataset.projectName
                    );
                  }
                )
              ).getTodoStorage()[todoWrapper[index].dataset.index].isComplete
            ) {
              allTitle[todoWrapper[index].dataset.index].style.textDecoration =
                "line-through";

              allDate[todoWrapper[index].dataset.index].style.textDecoration =
                "line-through";
            } else {
              allTitle[todoWrapper[index].dataset.index].style.removeProperty(
                "text-decoration"
              );
              allDate[todoWrapper[index].dataset.index].style.removeProperty(
                "text-decoration"
              );
            }
          }
        }
      });
    }
  });
}

export function createProjectListener(
  ProjectManagerClass,
  renderProjectsCallback,
  clearOldElementCallback,
  renderTodoCallback,
  addTaskBtnCallback,
  removeProjectListenerCallback,
  dialogProjectCallback,
  dialogAddTodoCallback
) {
  const createProject = document.querySelector(".create-project-btn");

  createProject.addEventListener("click", () => {
    clearOldElementCallback("dialog");
    dialogProjectCallback();
    const dialog = document.querySelector(".dialog-project");

    dialog.showModal();

    dialog.addEventListener("submit", () => {
      const projectName = document.querySelector("#createdProjectName").value;
      ProjectManagerClass.addProject(projectName);

      renderProjectsCallback(
        ProjectManagerClass.showProjectStorage(),
        clearOldElementCallback
      );

      removeProjectListenerCallback(
        ProjectManagerClass,
        renderProjectsCallback,
        clearOldElementCallback,
        renderTodoCallback,
        addTaskBtnCallback
      );

      clearOldElementCallback(".project-todo");
      clearOldElementCallback(".add-task");

      renderTodoCallback(
        ProjectManagerClass.accessProject(
          ProjectManagerClass.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        )
      );

      addTaskBtnCallback(
        ProjectManagerClass.accessProject(
          ProjectManagerClass.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        )
      );

      addTaskListener(
        ProjectManagerClass.accessProject(
          ProjectManagerClass.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        ),
        clearOldElementCallback,
        renderTodoCallback,
        dialogAddTodoCallback
      );

      const form = document.querySelector("form");
      form.reset();
    });
  });
}
