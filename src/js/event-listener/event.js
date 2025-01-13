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
