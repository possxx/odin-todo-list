import { projects } from "./project-navigation.js";
import { createTodo, removeAllTodos, removeTodo } from "./todo-navigation.js";
import { updateAttribute } from "./project-navigation-dom.js";
import { createInitialTodoEditContentElement, createTodoEditContentElement, content, contentChild } from "../content/todo-edit-content.js";
import { renderTodoContent } from "../content/todo-render-content.js";
import { renderProjectContent } from "../content/project-render-content.js";

export { createTodoDom, removeAllTodosDom };

function createTodoDomElement(projectIndex, todoIndex) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoNavigation = document.createElement("div");
    todoNavigation.classList.add("todo-navigation");
    todoNavigation.setAttribute("project", projectIndex);
    todoNavigation.setAttribute("todo", todoIndex);

    const todoIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const todoIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoIconSvg.setAttribute("viewBox", "0 -960 960 960");
    todoIconPath.setAttribute("d", "M319.33-246.67h321.34v-66.66H319.33v66.66Zm0-166.66h321.34V-480H319.33v66.67ZM226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-666.66q0-27 19.83-46.84Q199.67-880 226.67-880H574l226 226v507.33q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm314-542.67v-190.66h-314v666.66h506.66v-476H540.67Zm-314-190.66v190.66-190.66 666.66-666.66Z");
    todoIconSvg.appendChild(todoIconPath);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.innerText = projects[projectIndex].todos[todoIndex].title;

    const todoIcons = document.createElement("div");
    todoIcons.classList.add("todo-icons");

    const todoEditIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const todoEditIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoEditIconSvg.classList.add("todo-edit");
    todoEditIconSvg.setAttribute("viewBox", "0 -960 960 960");
    todoEditIconPath.setAttribute("d", "M186.67-186.67H235L680-631l-48.33-48.33-445 444.33v48.33ZM120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm652.67-606-46-46 46 46Zm-117 71-24-24.33L680-631l-24.33-24Z");
    todoEditIconSvg.appendChild(todoEditIconPath);

    const todoDeleteIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const todoDeleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoDeleteIconSvg.classList.add("todo-delete");
    todoDeleteIconSvg.setAttribute("viewBox", "0 -960 960 960");
    todoDeleteIconPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z");
    todoDeleteIconSvg.appendChild(todoDeleteIconPath);

    todoNavigation.appendChild(todoIconSvg);
    todoNavigation.appendChild(todoTitle);

    todoIcons.appendChild(todoEditIconSvg);
    todoIcons.appendChild(todoDeleteIconSvg);

    todo.appendChild(todoNavigation);
    todo.appendChild(todoIcons);

    todoNavigation.addEventListener("click", () => renderTodoContentNavigation(todoNavigation));

    return [todo, todoDeleteIconSvg, todoEditIconSvg];
}

function createTodoDom(project, todos) {
    const projectIndex = project.getAttribute("project");
    const todoIndex = projects[projectIndex].todos.length;
    createTodo(projectIndex);
    const todoValues = createTodoDomElement(projectIndex, todoIndex);
    const todo = todoValues[0];
    const todoDeleteIcon = todoValues[1];
    const todoEditIcon = todoValues[2];
    todoDeleteIcon.addEventListener("click", () => removeTodoDom(todo, projectIndex));
    todoEditIcon.addEventListener("click", () => createTodoEditContentElement(projectIndex, todo.getAttribute("todo")));
    todo.setAttribute("todo", `${todoIndex}`);
    todo.setAttribute("project", `${projectIndex}`);
    todos.appendChild(todo);
    createInitialTodoEditContentElement(projectIndex, todoIndex);
}

function removeAllTodosDom(project) {
    const projectIndex = project.getAttribute("project");
    removeAllTodos(projectIndex);
    const todos = document.querySelector(`[project='${projectIndex}']`)
    const todosChildren = todos.querySelectorAll("*");
    todosChildren.forEach(element => element.remove());
    const todoEditContent = content.querySelector(".todo-edit-content");
    const todoRenderContent = content.querySelector(".todo-render-content");
    const projectRenderContent = content.querySelector(".project-render-content");
    if (todoEditContent) {
        if (todoEditContent.getAttribute("project") == projectIndex) {
            todoEditContent.replaceWith(contentChild);
        }
    }
    if (todoRenderContent) {
        if (todoRenderContent.getAttribute("project") == projectIndex) {
            todoRenderContent.replaceWith(contentChild);
        }
    }
    if (projectRenderContent && projectRenderContent.getAttribute("project") == projectIndex) {
        projectRenderContent.replaceWith(contentChild);
    }
}

function removeTodoDom(todo, projectIndex) {
    let index = todo.getAttribute("todo");
    removeTodo(projectIndex, index);
    todo.remove();
    const todoWrapper = document.querySelector(`.todos[project='${projectIndex}']`);
    const todoElements = todoWrapper.querySelectorAll("[todo]");
    updateAttribute(todoElements, index, "todo");
    const todoEditContent = content.querySelector(".todo-edit-content");
    const todoEditContentElements = [todoEditContent];
    const todoRenderContent = content.querySelector(".todo-render-content");
    const todoRenderContentElements = [todoRenderContent];
    const projectRenderContent = content.querySelector(".project-render-content");
    const project = document.querySelector(`.project [project='${projectIndex}']`);
    if (todoEditContent) {
        if (todoEditContent.getAttribute("project") == projectIndex && todoEditContent.getAttribute("todo") == index) {
            todoEditContent.replaceWith(contentChild);
        }
        updateAttribute(todoEditContentElements, index, "todo");
    }
    if (todoRenderContent) {
        if (todoRenderContent.getAttribute("project") == projectIndex && todoRenderContent.getAttribute("todo") == index) {
            todoRenderContent.replaceWith(contentChild);
        }
        updateAttribute(todoRenderContentElements, index, "todo");
    }
    if (projectRenderContent && projectRenderContent.getAttribute("project") == projectIndex) {
        renderProjectContent(project);
    }
}

function renderTodoContentNavigation(element) {
    const projectIndex = element.getAttribute("project");
    const todoIndex = element.getAttribute("todo");
    renderTodoContent(projectIndex, todoIndex);
}



