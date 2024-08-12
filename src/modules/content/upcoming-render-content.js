import { projects } from "../navigation/project-navigation";
import { content } from "./todo-edit-content";
import { renderTodoContent } from "./todo-render-content";
import { isFuture } from "date-fns";
import { shortenTodoDescription, createRenderTodoPriorityElement } from "./project-render-content";
import { createTodosRenderContentElement } from "./today-render-content";

export { renderUpcomingContent };

function filterTodosUpcoming() {
    const projectsCopy = projects.slice();
    const todosUpcoming = [];
    
    projectsCopy.forEach((project, pIndex) => {
        let projectIndex = pIndex;
        project.todos.forEach((todo, tIndex) => {
            if (isFuture(todo.dueDate)) {
                todo.todoIndex = tIndex;
                todo.projectIndex = projectIndex;
                todosUpcoming.push(todo);
            }
        })
    })
    return todosUpcoming;
}

function createTodayRenderContentElement() {
    let heading = "Upcoming";
    let todos = filterTodosUpcoming();

    const projectRenderContent = document.createElement("div");
    projectRenderContent.classList.add("upcoming-render-content");

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

function renderUpcomingContent() {
    const contentChild = content.children[0];
    contentChild.replaceWith(createTodayRenderContentElement());
}