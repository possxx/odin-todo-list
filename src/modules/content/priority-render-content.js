import { projects } from "../..";
import { content } from "./todo-edit-content";
import { createTodosRenderContentElement } from "./today-render-content";

export { renderPriorityContent };

function filterTodosPriority(priority) {
    const projectsCopy = projects.slice();
    const todosPriority = [];
    
    projectsCopy.forEach((project, pIndex) => {
        let projectIndex = pIndex;
        project.todos.forEach((todo, tIndex) => {
            if (todo.priority == priority) {
                todo.todoIndex = tIndex;
                todo.projectIndex = projectIndex;
                todosPriority.push(todo);
            }
        })
    })
    return todosPriority;
}

function createPriorityRenderContentElement(priority) {
    let heading;
    if (priority == "high") heading = "High Priority";
    if (priority == "medium") heading = "Medium Priority";
    if (priority == "low") heading = "Low Priority";
    let todos = filterTodosPriority(priority);

    const projectRenderContent = document.createElement("div");
    projectRenderContent.classList.add(`${priority}-priority-render-content`);

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

function renderPriorityContent(priority) {
    const contentChild = content.children[0];
    contentChild.replaceWith(createPriorityRenderContentElement(priority));
}