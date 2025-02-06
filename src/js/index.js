import style from "../css/style.css";

import {
  ProjectManager,
  renderProjects,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  addTaskListener,
  projectListener,
  editTodoListener,
  removeTodoListener,
  isTodoCompleteListener,
  mainDOM,
  addTodoBtn,
  createProjectListener,
  removeProjectListener,
  addDefaultProject,
  dialogProject,
  dialogAddTodo,
} from "./barrel.js";

mainDOM();

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

createProjectListener(
  ProjectManager,
  renderProjects,
  clearOldElement,
  renderTodo,
  addTaskBtn,
  removeProjectListener,
  dialogProject,
  dialogAddTodo
);

projectListener(
  ProjectManager,
  addTodoBtn,
  clearOldElement,
  renderTodo,
  addTaskBtn,
  addTaskListener,
  dialogAddTodo
);
removeTodoListener(ProjectManager, renderTodo, clearOldElement);
editTodoListener(ProjectManager, clearOldElement, renderTodo, dialogAddTodo);
isTodoCompleteListener(ProjectManager);
