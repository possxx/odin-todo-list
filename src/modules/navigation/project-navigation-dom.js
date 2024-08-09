import { projects, createProject, editProject, removeProject } from "./project-navigation.js";
import { createTodoDom, removeAllTodosDom } from "./todo-navigation-dom.js";
import { renderProjectContent } from "../content/project-render-content.js";

export { updateAttribute, createInitialProjectDom };

const projectsDom = document.querySelector(".projects");

const addProjectButtonDom = document.querySelector(".add-project");

addProjectButtonDom.addEventListener("click", () => {
    if (!(document.querySelector(".project-add"))) {
        projectsDom.insertBefore(addProjectDomElement(), initialProject.nextSibling);
    }
    document.querySelector("input[name='project_title']").focus();
})

function createInitialProjectDomElement(title) {
    const attribute = projects.length;

    const projectWrapper = document.createElement("div");
    projectWrapper.classList.add("project-wrapper");
    projectWrapper.classList.add("initial-project");

    const project = document.createElement("div");
    project.classList.add("project");
    project.setAttribute("project", `${attribute}`);

    const todos = document.createElement("div");
    todos.classList.add("todos");
    todos.setAttribute("project", `${attribute}`);

    const projectNavigation = document.createElement("div");
    projectNavigation.classList.add("project-navigation");
    projectNavigation.addEventListener("click", () => renderProjectContent(project));

    const projectIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectIconPath.setAttribute("d", "M146.67-160q-27 0-46.84-20.17Q80-200.33 80-226.67v-506.66q0-26.34 19.83-46.5Q119.67-800 146.67-800H414l66.67 66.67h332.66q26.34 0 46.5 20.16Q880-693 880-666.67v440q0 26.34-20.17 46.5Q839.67-160 813.33-160H146.67Zm0-66.67h666.66v-440H453l-66.67-66.66H146.67v506.66Zm0 0v-506.66V-226.67Z");
    projectIconSvg.appendChild(projectIconPath);

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");
    projectTitle.innerText = title;

    const projectIcons = document.createElement("div");
    projectIcons.classList.add("project-icons");

    const projectAddListIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectAddListIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectAddListIconSvg.classList.add("project-add-list");
    projectAddListIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectAddListIconPath.setAttribute("d", "M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z");
    projectAddListIconSvg.appendChild(projectAddListIconPath);
    projectAddListIconSvg.setAttribute("project", `${attribute}`);
    
    projectNavigation.appendChild(projectIconSvg);
    projectNavigation.appendChild(projectTitle);

    projectIcons.appendChild(projectAddListIconSvg);

    project.appendChild(projectNavigation);
    project.appendChild(projectIcons);

    projectWrapper.appendChild(project);
    projectWrapper.appendChild(todos);

    projectAddListIconSvg.addEventListener("click", () => createTodoDom(project, todos));
    
    return projectWrapper;
}

function createInitialProjectDom(title) {
    const project = createInitialProjectDomElement(title);
    createProject(title);
    projectsDom.appendChild(project);
}

createInitialProjectDom("Home");

const initialProject = document.querySelector(".initial-project");

function createProjectDomElement(title) {
    const attribute = projects.length;

    const projectWrapper = document.createElement("div");
    projectWrapper.classList.add("project-wrapper");

    const project = document.createElement("div");
    project.classList.add("project");
    project.setAttribute("project", `${attribute}`);

    const todos = document.createElement("div");
    todos.classList.add("todos");
    todos.setAttribute("project", `${attribute}`);

    const projectNavigation = document.createElement("div");
    projectNavigation.classList.add("project-navigation");
    projectNavigation.addEventListener("click", () => renderProjectContent(project));

    const projectIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectIconPath.setAttribute("d", "M146.67-160q-27 0-46.84-20.17Q80-200.33 80-226.67v-506.66q0-26.34 19.83-46.5Q119.67-800 146.67-800H414l66.67 66.67h332.66q26.34 0 46.5 20.16Q880-693 880-666.67v440q0 26.34-20.17 46.5Q839.67-160 813.33-160H146.67Zm0-66.67h666.66v-440H453l-66.67-66.66H146.67v506.66Zm0 0v-506.66V-226.67Z");
    projectIconSvg.appendChild(projectIconPath);

    const projectTitle = document.createElement("div");
    projectTitle.classList.add("project-title");
    projectTitle.innerText = title;

    const projectIcons = document.createElement("div");
    projectIcons.classList.add("project-icons");

    const projectEditIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectEditIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectEditIconSvg.classList.add("project-edit");
    projectEditIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectEditIconPath.setAttribute("d", "M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z");
    projectEditIconSvg.appendChild(projectEditIconPath);
    projectEditIconSvg.setAttribute("project", `${attribute}`);

    const projectAddListIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectAddListIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectAddListIconSvg.classList.add("project-add-list");
    projectAddListIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectAddListIconPath.setAttribute("d", "M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z");
    projectAddListIconSvg.appendChild(projectAddListIconPath);
    projectAddListIconSvg.setAttribute("project", `${attribute}`);

    const projectDeleteIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectDeleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectDeleteIconSvg.classList.add("project-delete");
    projectDeleteIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectDeleteIconPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z");
    projectDeleteIconSvg.appendChild(projectDeleteIconPath);
    projectDeleteIconSvg.setAttribute("project", `${attribute}`);
    
    projectNavigation.appendChild(projectIconSvg);
    projectNavigation.appendChild(projectTitle);

    projectIcons.appendChild(projectEditIconSvg);
    projectIcons.appendChild(projectAddListIconSvg);
    projectIcons.appendChild(projectDeleteIconSvg);

    project.appendChild(projectNavigation);
    project.appendChild(projectIcons);

    projectWrapper.appendChild(project);
    projectWrapper.appendChild(todos);

    projectEditIconSvg.addEventListener("click", () => editProjectTitleDom(project, projectTitle));
    projectAddListIconSvg.addEventListener("click", () => createTodoDom(project, todos));
    projectDeleteIconSvg.addEventListener("click", () => removeProjectDom(project, projectWrapper));

    return projectWrapper;
}

function createProjectDom(title) {
    const project = createProjectDomElement(title);
    createProject(title);
    return project;
}

function addProjectDomElement() {
    const projectAdd = document.createElement("div");
    projectAdd.classList.add("project-add");

    const projectEditTitleInput = document.createElement("div");
    projectEditTitleInput.classList.add("project-edit-title-input");

    const projectTitleInput = document.createElement("input");
    projectTitleInput.setAttribute("type", "text");
    projectTitleInput.setAttribute("autocomplete", "off");
    projectTitleInput.setAttribute("maxlength", "20");
    projectTitleInput.setAttribute("name", "project_title")
    projectTitleInput.setAttribute("placeholder", "(Max 20 char.)");

    projectEditTitleInput.appendChild(projectTitleInput);

    const projectButtons = document.createElement("div");
    projectButtons.classList.add("project-buttons");

    const saveProjectButton = document.createElement("button");
    saveProjectButton.classList.add("save-project");
    saveProjectButton.innerText = "Save Project";
    saveProjectButton.addEventListener("click", () => saveProjectDomElement());
    const discardProjectButton = document.createElement("button");
    discardProjectButton.classList.add("discard-project");
    discardProjectButton.innerText = "Discard Project";
    discardProjectButton.addEventListener("click", () => closeProjectDomElement());

    projectButtons.appendChild(saveProjectButton);
    projectButtons.appendChild(discardProjectButton);

    projectAdd.appendChild(projectEditTitleInput);
    projectAdd.appendChild(projectButtons);

    return projectAdd;
}

function saveProjectDomElement() {
    const titleInput = document.querySelector("input[name='project_title']");
    const title = titleInput.value;

    projectsDom.insertBefore(createProjectDom(title), initialProject.nextSibling);
    closeProjectDomElement();
}

function closeProjectDomElement() {
    const projectAdd = document.querySelector(".project-add");
    projectAdd.remove();
}

function editProjectDomElement(project, projectDom, projectTitle) {
    const projectEdit = document.createElement("div");
    projectEdit.classList.add("project-edit");

    const projectEditTitleInput = document.createElement("div");
    projectEditTitleInput.classList.add("project-edit-title-input");

    const projectTitleInput = document.createElement("input");
    projectTitleInput.setAttribute("type", "text");
    projectTitleInput.setAttribute("autocomplete", "off");
    projectTitleInput.setAttribute("maxlength", "20");
    projectTitleInput.setAttribute("name", "edit_project_title")
    projectTitleInput.setAttribute("placeholder", `${project.title}`);

    projectEditTitleInput.appendChild(projectTitleInput);

    const projectButtons = document.createElement("div");
    projectButtons.classList.add("project-buttons");

    const changeTitleButton = document.createElement("button");
    changeTitleButton.classList.add("change-title");
    changeTitleButton.innerText = "Change Title";
    changeTitleButton.addEventListener("click", () => changeProjectTitleDom(project, projectDom, projectTitle, projectEdit, projectTitleInput));
    const discardChangesButton = document.createElement("button");
    discardChangesButton.classList.add("discard-changes");
    discardChangesButton.innerText = "Discard Changes";
    discardChangesButton.addEventListener("click", () => discardChangesProjectTitleDom(projectDom, projectEdit));

    projectButtons.appendChild(changeTitleButton);
    projectButtons.appendChild(discardChangesButton);

    projectEdit.appendChild(projectEditTitleInput);
    projectEdit.appendChild(projectButtons);

    return [ projectEdit, projectTitleInput ];
}

function editProjectTitleDom(projectElement, projectTitle) {
    const projectDom = projectElement;
    const index = projectDom.getAttribute("project");
    const project = projects[index];
    const projectValues = editProjectDomElement(project, projectDom, projectTitle);
    const projectEdit = projectValues[0];
    const projectInput = projectValues[1];
    projectDom.replaceWith(projectEdit);
    projectInput.focus();
}

function changeProjectTitleDom(project, projectDom, projectTitle, projectEdit, input) {
    const title = input.value;
    editProject(project, title);
    projectTitle.innerText = title;
    projectEdit.replaceWith(projectDom);
}

function discardChangesProjectTitleDom(projectDom, projectEdit) {
    projectEdit.replaceWith(projectDom);
}

function removeProjectDom(projectDom, projectWrapper) {
    const index = projectDom.getAttribute("project");
    removeAllTodosDom(projectDom);
    removeProject(index);
    projectWrapper.remove();
    const project = document.querySelectorAll("[project]");
    updateAttribute(project, index, "project");
}

function updateAttribute(element, index, attribute) {
    let attributeValue;
    element.forEach(item => {
        attributeValue = +(item.getAttribute(attribute));
        if (attributeValue > index) {
            item.setAttribute(attribute, attributeValue - 1);
        }
    })
}



