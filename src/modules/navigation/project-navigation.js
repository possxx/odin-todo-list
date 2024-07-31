const projects = [];

function Project (title, ...todos) {
    return { title, todos };
}

function createProject(title, ...todos) {
    const project = Project(title, ...todos);
    projects.push(project);
}

function editProject(project, title) {
    project.title = title;
}

function removeProject(index) {
    projects.splice(index, 1);
}

function Todo (title, description, dueDate, priority, notes, ...checklist) {
    return { title, description, dueDate, priority, notes, checklist };
}

export { projects, createProject, editProject, removeProject };














