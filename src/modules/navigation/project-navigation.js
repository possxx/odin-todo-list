const projects = [];

function Project (title, ...todos) {
    return { title, todos };
}

function addProject(title, ...todos) {
    const project = Project(title, ...todos);
    projects.push(project);
}

function editProject(project, title) {
    project.title = title;
}

function Todo (title, description, dueDate, priority, notes, ...checklist) {
    return { title, description, dueDate, priority, notes, checklist };
}

export { projects, addProject, editProject };














