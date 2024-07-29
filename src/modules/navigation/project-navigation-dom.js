import { projects, addProject } from "./project-navigation.js";

const addProjectButtonDom = document.querySelector(".add-project");

addProjectButtonDom.addEventListener("click", () => {
    projectsDom.appendChild(addProjectDom());
})

const projectsDom = document.querySelector(".projects");

function addProjectDom(title) {
    const project = document.createElement("div");
    project.classList.add("project");

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

    const projectAddListIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectAddListIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectAddListIconSvg.classList.add("project-add-list");
    projectAddListIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectAddListIconPath.setAttribute("d", "M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z");
    projectAddListIconSvg.appendChild(projectAddListIconPath);

    const projectDeleteIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const projectDeleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    projectDeleteIconSvg.classList.add("project-delete");
    projectDeleteIconSvg.setAttribute("viewBox", "0 -960 960 960");
    projectDeleteIconPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z");
    projectDeleteIconSvg.appendChild(projectDeleteIconPath);
    
    projectNavigation.appendChild(projectIconSvg);
    projectNavigation.appendChild(projectTitle);

    projectIcons.appendChild(projectEditIconSvg);
    projectIcons.appendChild(projectAddListIconSvg);
    projectIcons.appendChild(projectDeleteIconSvg);

    project.appendChild(projectNavigation);
    project.appendChild(projectIcons);

    return project;
}


