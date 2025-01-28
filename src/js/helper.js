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
  renderTodoCallback
) {
  clearOldElementCallback(".add-task");
  addTaskBtnCallback(project);
  addTaskListenerCallback(project, clearOldElementCallback, renderTodoCallback);
}

export function addDefaultProject(
  ProjectManagerClass,
  renderProjectsCallback,
  clearOldElementCallback,
  removeProjectListenerCallback,
  renderTodoCallback,
  addTaskBtnCallback,
  addTaskListenerCallback,
  imagePath
) {
  ProjectManagerClass.addProject("Default");

  renderProjectsCallback(
    ProjectManagerClass.showProjectStorage(),
    clearOldElementCallback,
    imagePath
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
    renderTodoCallback
  );
}
