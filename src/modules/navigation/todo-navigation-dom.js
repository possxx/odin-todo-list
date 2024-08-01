import { projects } from "./project-navigation.js";
import { createTodo, removeAllTodos, removeTodo } from "./todo-navigation.js";
import { updateAttribute } from "./project-navigation-dom.js";

export { createTodoDom, removeAllTodosDom };

function createTodoDomElement(title) {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoNavigation = document.createElement("div");
    todoNavigation.classList.add("todo-navigation");

    const todoIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const todoIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoIconSvg.setAttribute("viewBox", "0 -960 960 960");
    todoIconPath.setAttribute("d", "M186.67-120q-27 0-46.84-19.83Q120-159.67 120-186.67v-586.66q0-27 19.83-46.84Q159.67-840 186.67-840h586.66q27 0 46.84 19.83Q840-800.33 840-773.33v586.66q0 27-19.83 46.84Q800.33-120 773.33-120H186.67Zm0-66.67h586.66v-482H186.67v482Z");
    todoIconSvg.appendChild(todoIconPath);

    const todoTitle = document.createElement("div");
    todoTitle.classList.add("todo-title");
    todoTitle.innerText = title;

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

    return [todo, todoDeleteIconSvg];
}

function createTodoDom(project, todos) {
    const projectIndex = project.getAttribute("data");
    const todoIndex = projects[projectIndex].todos.length;
    let todoTitle;
    if (todoIndex == 0) {
        todoTitle = "Untitled";
    } else {
        todoTitle = `Untitled ${todoIndex}`;
    }
    const todoValues = createTodoDomElement(todoTitle);
    const todo = todoValues[0];
    const todoDeleteIcon = todoValues[1];
    todoDeleteIcon.addEventListener("click", () => removeTodoDom(todo, projectIndex));
    createTodo(todoTitle, projectIndex);
    todo.setAttribute("todo", `${todoIndex}`);
    todo.setAttribute("data", `${projectIndex}`);
    todos.appendChild(todo);
}

function removeAllTodosDom(project) {
    const projectIndex = project.getAttribute("data");
    removeAllTodos(projectIndex);
    const todos = document.querySelector(`[data='${projectIndex}']`)
    const todosChildren = todos.querySelectorAll("*");
    todosChildren.forEach(element => element.remove());
    console.table(projects[projectIndex].todos);
}

function removeTodoDom(todo, projectIndex) {
    let index = todo.getAttribute("todo");
    removeTodo(projectIndex, index);
    todo.remove();
    const todoWrapper = document.querySelector(`.todos[data='${projectIndex}']`);
    const todoElements = todoWrapper.querySelectorAll(".todo");
    updateAttribute(todoElements, index, "todo");
}



