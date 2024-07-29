const projects = [];

function Project (title, ...todos) {
    return { title, todos };
}

function addProject(title, ...todos) {
    const project = Project(title, ...todos);
    projects.push(project);
}

addProject("Project 1");

function Todo (title, description, dueDate, priority, notes, ...checklist) {
    return { title, description, dueDate, priority, notes, checklist };
}

export { projects, addProject };














