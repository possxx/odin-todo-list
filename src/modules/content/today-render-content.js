import { projects } from "../navigation/project-navigation";
import { content } from "./todo-edit-content";
import { renderTodoContent } from "./todo-render-content";
import { isToday } from "date-fns";
import { shortenTodoDescription, createRenderTodoPriorityElement } from "./project-render-content";

export { renderTodayContent };

function filterTodosToday() {
    const projectsCopy = projects.slice();
    const todosToday = [];
    
    projectsCopy.forEach((project, pIndex) => {
        let projectIndex = pIndex;
        project.todos.forEach((todo, tIndex) => {
            if (isToday(todo.dueDate)) {
                todo.todoIndex = tIndex;
                todo.projectIndex = projectIndex;
                todosToday.push(todo);
            }
        })
    })
    return todosToday;
}

function createTodayRenderContentElement() {
    let heading = "Today";
    let todos = filterTodosToday();

    const projectRenderContent = document.createElement("div");
    projectRenderContent.classList.add("project-render-content");

    const projectRenderHeadingContainer = document.createElement("div");
    projectRenderHeadingContainer.classList.add("project-render-heading");
    const projectRenderHeading = document.createElement("h1");
    projectRenderHeading.innerText = heading;
    projectRenderHeadingContainer.appendChild(projectRenderHeading);

    let renderTodos = document.createElement("div");
    if (todos) {
        renderTodos = (createTodosRenderContentElement(todos));
    } 

    projectRenderContent.appendChild(projectRenderHeadingContainer);
    projectRenderContent.appendChild(renderTodos);

    return projectRenderContent;
}

function renderTodayContent() {
    const contentChild = content.children[0];
    contentChild.replaceWith(createTodayRenderContentElement());
}

function createTodosRenderContentElement(todos) {
    const renderTodos = document.createElement("div");
    renderTodos.classList.add("render-todos");

    todos.forEach((todo) => {
        let title;
        if (todo.title) {
            title = todo.title;
        } else {
            title = "-";
        }
        let description;
        if (todo.description) {
            description = shortenTodoDescription(todo.description);
        } else {
            description = "-";
        }
        let dueDate;
        if (todo.dueDate) {
            dueDate = todo.dueDate;
        } else {
            dueDate = "-";
        } 
        let priority = todo.priority;

        const renderTodoItem = document.createElement("div");
        renderTodoItem.classList.add("render-todo-item");
        renderTodoItem.setAttribute("project", todo.projectIndex);
        renderTodoItem.setAttribute("todo", todo.todoIndex);
        renderTodoItem.addEventListener("click", () => renderTodoContent(todo.projectIndex, todo.todoIndex));

        const renderTodoMeta = document.createElement("div");
        renderTodoMeta.classList.add("render-todo-meta");
        const renderTodoDueDate = document.createElement("div");
        renderTodoDueDate.classList.add("render-todo-due-date");
        renderTodoDueDate.innerText = `Due by ${dueDate}`;
        const renderTodoPriority = createRenderTodoPriorityElement(priority);
        renderTodoMeta.appendChild(renderTodoDueDate);
        renderTodoMeta.appendChild(renderTodoPriority);

        const renderTodoTitleElement = document.createElement("div");
        renderTodoTitleElement.classList.add("render-todo-title");
        const renderTodoTitle = document.createElement("h2");
        renderTodoTitle.innerText = title;
        renderTodoTitleElement.appendChild(renderTodoTitle);

        const renderTodoDescriptionElement = document.createElement("div");
        renderTodoDescriptionElement.classList.add("render-todo-description");
        const renderTodoDescription = document.createElement("p");
        renderTodoDescription.innerText = description;
        renderTodoDescriptionElement.appendChild(renderTodoDescription);
        
        renderTodoItem.appendChild(renderTodoMeta);
        renderTodoItem.appendChild(renderTodoTitleElement);
        renderTodoItem.appendChild(renderTodoDescriptionElement);

        renderTodos.appendChild(renderTodoItem);
    })

    return renderTodos;
}