export function projectCreateBtn(projects) {
  const oldProjects = document.querySelectorAll(".project");

  oldProjects.forEach((project) => {
    project.remove();
  });

  for (const project of projects) {
    const projectDiv = document.createElement("button");
    projectDiv.style.display = "block";
    projectDiv.classList.add("project");
    projectDiv.textContent += project.name;
    projectDiv.dataset.projectName = project.name;
    document.body.appendChild(projectDiv);
  }
}

export function showTodoList(project) {
  const title = document.createElement("p");
  title.textContent = project.title;
  const description = document.createElement("p");
  description.textContent = project.description;
  const dueDate = document.createElement("p");
  dueDate.textContent = project.dueDate;
  const priority = document.createElement("p");
  priority.textContent = project.priority;

  document.body.appendChild(title);
  document.body.appendChild(description);
  document.body.appendChild(dueDate);
  document.body.appendChild(priority);
}
