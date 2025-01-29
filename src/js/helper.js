export function clearOldElement(cl) {
  const oldTodoWrapper = document.querySelectorAll(cl);
  oldTodoWrapper.forEach((el) => {
    el.remove();
  });
}

export function addTodoBtn(
  project,
  clearOldElementCallback,
  addTaskBtnCallback,
  addTaskListenerCallback,
  renderTodoCallback,
  dialogAddTodoCallback
) {
  clearOldElementCallback(".add-task");
  addTaskBtnCallback(project);
  addTaskListenerCallback(
    project,
    clearOldElementCallback,
    renderTodoCallback,
    dialogAddTodoCallback
  );
}

export function addDefaultProject(
  ProjectManagerClass,
  renderProjectsCallback,
  clearOldElementCallback,
  removeProjectListenerCallback,
  renderTodoCallback,
  addTaskBtnCallback,
  addTaskListenerCallback,
  dialogAddTodoCallback
) {
  ProjectManagerClass.addProject("Default");

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

  renderTodoCallback(
    ProjectManagerClass.accessProject(
      ProjectManagerClass.showProjectStorage().findIndex((project) => {
        return project.name == "Default";
      })
    )
  );

  addTaskBtnCallback(
    ProjectManagerClass.accessProject(
      ProjectManagerClass.showProjectStorage().findIndex((project) => {
        return project.name == "Default";
      })
    )
  );

  addTaskListenerCallback(
    ProjectManagerClass.accessProject(
      ProjectManagerClass.showProjectStorage().findIndex((project) => {
        return project.name == "Default";
      })
    ),
    clearOldElementCallback,
    renderTodoCallback,
    dialogAddTodoCallback
  );
}
