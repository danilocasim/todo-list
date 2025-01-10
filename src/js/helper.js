export function clearOldElement(cl) {
  const oldTodoWrapper = document.querySelectorAll(cl);
  oldTodoWrapper.forEach((el) => {
    el.remove();
  });
}

// first arg ProjectManager.accessProject(index)
export function renderTodo(project, callback) {
  project.getTodoStorage().forEach((todo) => {
    console.log(project.name);
    callback(todo);
  });
}
