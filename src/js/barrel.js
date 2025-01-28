export { ProjectManager } from "./class.js";
export { renderProjects, renderTodo, addTaskBtn, mainDOM } from "./dom.js";

export { clearOldElement, addTodoBtn, addDefaultProject } from "./helper.js";

export {
  addTaskListener,
  projectListener,
  removeTodoListener,
  removeProjectListener,
  editTodoListener,
  isTodoCompleteListener,
  createProjectListener,
} from "./event-listener/event.js";
