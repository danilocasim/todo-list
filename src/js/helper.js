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
