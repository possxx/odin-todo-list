import { projects } from "../..";

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

export { createProject, editProject, removeProject };














