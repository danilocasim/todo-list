import style from "../css/style.css";

import deleteBtn from "../assets/images/del-btn.png";

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
  deleteBtn
);

//create proj button

createProjectListener(
  ProjectManager,
  renderProjects,
  clearOldElement,
  renderTodo,
  addTaskBtn,
  removeProjectListener,
  deleteBtn
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
