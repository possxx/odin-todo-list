import { projects, createProject, editProject, removeProject } from "./project-navigation.js";

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
    projectWrapper.classList.add("projectWrapper");

    const project = document.createElement("div");
    project.classList.add("project");
    project.classList.add("initial-project");
    project.setAttribute("data", `${attribute}`);

    const todos = document.createElement("div");
    todos.classList.add("todos");

    const projectNavigation = document.createElement("div");
    projectNavigation.classList.add("project-navigation");

    const projectIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectIconPath.setAttribute("d", "M280-280h533.33v-466.67H280V-280Zm0 66.67q-27 0-46.83-19.84Q213.33-253 213.33-280v-533.33q0-27 19.84-46.84Q253-880 280-880h533.33q27 0 46.84 19.83Q880-840.33 880-813.33V-280q0 27-19.83 46.83-19.84 19.84-46.84 19.84H280ZM146.67-80q-27 0-46.84-19.83Q80-119.67 80-146.67v-600h66.67v600h600V-80h-600ZM280-813.33V-280v-533.33Z");
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
    projectEditIconSvg.setAttribute("data", `${attribute}`);

    const projectAddListIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectAddListIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectAddListIconSvg.classList.add("project-add-list");
    projectAddListIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectAddListIconPath.setAttribute("d", "M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z");
    projectAddListIconSvg.appendChild(projectAddListIconPath);
    projectAddListIconSvg.setAttribute("data", `${attribute}`);
    
    projectNavigation.appendChild(projectIconSvg);
    projectNavigation.appendChild(projectTitle);

    projectIcons.appendChild(projectEditIconSvg);
    projectIcons.appendChild(projectAddListIconSvg);

    project.appendChild(projectNavigation);
    project.appendChild(projectIcons);

    projectWrapper.appendChild(project);
    projectWrapper.appendChild(todos);

    projectEditIconSvg.addEventListener("click", () => editProjectTitleDom(project, projectTitle));

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
    projectWrapper.classList.add("projectWrapper");

    const project = document.createElement("div");
    project.classList.add("project");
    project.setAttribute("data", `${attribute}`);

    const todos = document.createElement("div");
    todos.classList.add("todos");

    const projectNavigation = document.createElement("div");
    projectNavigation.classList.add("project-navigation");

    const projectIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectIconPath.setAttribute("d", "M280-280h533.33v-466.67H280V-280Zm0 66.67q-27 0-46.83-19.84Q213.33-253 213.33-280v-533.33q0-27 19.84-46.84Q253-880 280-880h533.33q27 0 46.84 19.83Q880-840.33 880-813.33V-280q0 27-19.83 46.83-19.84 19.84-46.84 19.84H280ZM146.67-80q-27 0-46.84-19.83Q80-119.67 80-146.67v-600h66.67v600h600V-80h-600ZM280-813.33V-280v-533.33Z");
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
    projectEditIconSvg.setAttribute("data", `${attribute}`);

    const projectAddListIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectAddListIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectAddListIconSvg.classList.add("project-add-list");
    projectAddListIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectAddListIconPath.setAttribute("d", "M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z");
    projectAddListIconSvg.appendChild(projectAddListIconPath);
    projectAddListIconSvg.setAttribute("data", `${attribute}`);

    const projectDeleteIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectDeleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectDeleteIconSvg.classList.add("project-delete");
    projectDeleteIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectDeleteIconPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z");
    projectDeleteIconSvg.appendChild(projectDeleteIconPath);
    projectDeleteIconSvg.setAttribute("data", `${attribute}`);
    
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
    projectDeleteIconSvg.addEventListener("click", () => removeProjectDom(project));

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
    const index = projectDom.getAttribute("data");
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

function removeProjectDom(projectDom) {
    const index = projectDom.getAttribute("data");
    removeProject(index);
    projectDom.remove();
    updateDataAttribute(index);
    console.log(projects);
}

function updateDataAttribute(index) {
    const data = document.querySelectorAll("[data]");
    let attribute;
    data.forEach(item => {
        attribute = +(item.getAttribute("data"));
        if (item.getAttribute("data") > index) {
            item.setAttribute("data", `${attribute - 1}`)
        }
    })
}



