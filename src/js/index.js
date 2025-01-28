import style from "../css/style.css";

import {
  ProjectManager,
  renderProjects,
  clearOldElement,
  addTaskBtn,
  renderTodo,
  createProjectBtn,
  addTaskListener,
  projectListener,
  editTodoListener,
  removeTodoListener,
  isTodoCompleteListener,
  mainDOM,
  addTodoBtn,
  createProjectListener,
} from "./barrel.js";

mainDOM();
//create proj button

createProjectListener(
  ProjectManager,
  renderProjects,
  clearOldElement,
  renderTodo,
  addTaskBtn
);

projectListener(
  ProjectManager,
  addTodoBtn,
  clearOldElement,
  renderTodo,
  addTaskBtn,
  addTaskListener
);
removeTodoListener(ProjectManager, renderTodo, clearOldElement);
editTodoListener(ProjectManager, clearOldElement, renderTodo);
isTodoCompleteListener(ProjectManager);
