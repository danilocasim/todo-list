export function projectCreateDiv(projects) {
  for (const project of projects) {
    const projectDiv = document.createElement("div");
    projectDiv.textContent = project.name;
    document.body.appendChild(projectDiv);
  }
}
