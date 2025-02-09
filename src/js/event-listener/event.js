import {
  ProjectManager,
  renderProjects,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  addTodoBtn,
  addDefaultProject,
  dialogProject,
  dialogAddTodo,
  Project,
} from "../barrel.js";

function addTaskListener(
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
      clearOldElementCallback(".project-todo");

      renderTodoCallback(project);

      const form = document.querySelector("form");
      form.reset();
    });
  });
}

function projectListener() {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "project") {
      const allProjects = document.querySelectorAll(".project");
      allProjects.forEach((project, index) => {
        if (e.target == project) {
          addTodoBtn(
            ProjectManager.accessProject(index),
            clearOldElement,
            addTaskBtn,
            addTaskListener,
            renderTodo,
            dialogAddTodo
          );
          clearOldElement(".project-todo");
          renderTodo(ProjectManager.accessProject(index));
        }
      });
    }
  });
}

function removeProjectListener() {
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

          ProjectManager.removeProject(index);

          renderProjects(ProjectManager.showProjectStorage(), clearOldElement);

          if (
            ProjectManager.showProjectStorage().length > 0 &&
            ProjectManager.accessProject(index - 1) != null
          ) {
            renderTodo(ProjectManager.accessProject(index - 1));

            addTaskBtn(ProjectManager.accessProject(index - 1));

            addTaskListener(
              ProjectManager.accessProject(index - 1),
              clearOldElement,
              renderTodo
            );
          }
          if (
            ProjectManager.showProjectStorage().length > 0 &&
            ProjectManager.accessProject(index - 1) == null &&
            ProjectManager.accessProject(index) != null
          ) {
            renderTodo(ProjectManager.accessProject(index));

            addTaskBtn(ProjectManager.accessProject(index));

            addTaskListener(
              ProjectManager.accessProject(index),
              clearOldElement,
              renderTodo
            );
          }

          if (ProjectManager.showProjectStorage().length == 0) {
            const projectName = document.querySelector(".project-name");
            projectName.textContent = "No projects here";
          }
        }
      });
    }
  });
}

function editTodoListener() {
  const body = document.body;

  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "edit-todo") {
      const allEditTodoBtn = document.querySelectorAll(".edit-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allEditTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            clearOldElement(".todo-wrapper");
            clearOldElement(".project-todo");
            clearOldElement("dialog");

            const currentTitle = ProjectManager.accessProject(
              ProjectManager.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].title;

            const currentDescription = ProjectManager.accessProject(
              ProjectManager.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].description;

            const currentDueDate = ProjectManager.accessProject(
              ProjectManager.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].dueDate;

            const currentPriority = ProjectManager.accessProject(
              ProjectManager.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).getTodoStorage()[todoWrapper[index].dataset.index].priority;

            dialogAddTodo(
              currentTitle,
              currentDescription,
              currentDueDate,
              currentPriority
            );
            const dialog = document.querySelector(".dialog-add-todo");

            dialog.showModal();

            dialog.addEventListener("submit", () => {
              clearOldElement(".todo-wrapper");

              const title = document.querySelector("#title").value;
              const description = document.querySelector("#description").value;
              const dueDate = document.querySelector("#dueDate").value;
              const priority = document.querySelector("#priority").value;

              ProjectManager.accessProject(
                ProjectManager.showProjectStorage().findIndex((project) => {
                  return project.name == todoWrapper[index].dataset.projectName;
                })
              ).editTodo(
                todoWrapper[index].dataset.index,
                title,
                description,
                dueDate,
                priority
              );

              renderTodo(
                ProjectManager.accessProject(
                  ProjectManager.showProjectStorage().findIndex((project) => {
                    return (
                      project.name == todoWrapper[index].dataset.projectName
                    );
                  })
                )
              );
            });
            renderTodo(
              ProjectManager.accessProject(
                ProjectManager.showProjectStorage().findIndex((project) => {
                  return project.name == todoWrapper[index].dataset.projectName;
                })
              )
            );
          }
        }
      });
    }
  });
}

function removeTodoListener() {
  const body = document.body;
  body.addEventListener("click", (e) => {
    if (e.target.classList.value == "remove-todo") {
      const allRemoveTodoBtn = document.querySelectorAll(".remove-todo");
      const todoWrapper = document.querySelectorAll(".todo-wrapper");

      allRemoveTodoBtn.forEach((button, index) => {
        if (e.target == button) {
          if (todoWrapper[index]) {
            Project.removeTodo(
              todoWrapper[index].dataset.projectName,
              todoWrapper[index].dataset.index
            );

            todoWrapper[index].remove();
            button.remove();
            clearOldElement(".project-todo");

            renderTodo(
              ProjectManager.accessProject(
                ProjectManager.showProjectStorage().findIndex((project) => {
                  return project.name == todoWrapper[index].dataset.projectName;
                })
              )
            );
          }
        }
      });
    }
  });
}

function isTodoCompleteListener() {
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
            ProjectManager.accessProject(
              ProjectManager.showProjectStorage().findIndex((project) => {
                return project.name == todoWrapper[index].dataset.projectName;
              })
            ).isCompleteTodo(todoWrapper[index].dataset.index);

            if (
              ProjectManager.accessProject(
                ProjectManager.showProjectStorage().findIndex((project) => {
                  return project.name == todoWrapper[index].dataset.projectName;
                })
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

function createProjectListener() {
  const createProject = document.querySelector(".create-project-btn");

  createProject.addEventListener("click", () => {
    clearOldElement("dialog");
    dialogProject();
    const dialog = document.querySelector(".dialog-project");

    dialog.showModal();

    dialog.addEventListener("submit", () => {
      const projectName = document.querySelector("#createdProjectName").value;
      ProjectManager.addProject(projectName);

      renderProjects(ProjectManager.showProjectStorage(), clearOldElement);

      removeProjectListener(
        ProjectManager,
        renderProjects,
        clearOldElement,
        renderTodo,
        addTaskBtn
      );

      clearOldElement(".project-todo");
      clearOldElement(".add-task");

      renderTodo(
        ProjectManager.accessProject(
          ProjectManager.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        )
      );

      addTaskBtn(
        ProjectManager.accessProject(
          ProjectManager.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        )
      );

      addTaskListener(
        ProjectManager.accessProject(
          ProjectManager.showProjectStorage().findIndex((project) => {
            return project.name == projectName;
          })
        ),
        clearOldElement,
        renderTodo,
        dialogAddTodo
      );

      const form = document.querySelector("form");
      form.reset();
    });
  });
}

export const eventListeners = () => {
  addDefaultProject(
    ProjectManager,
    renderProjects,
    clearOldElement,
    removeProjectListener,
    renderTodo,
    addTaskBtn,
    addTaskListener,
    dialogAddTodo
  );

  createProjectListener();

  projectListener();
  removeTodoListener();
  editTodoListener();
  isTodoCompleteListener();
};
