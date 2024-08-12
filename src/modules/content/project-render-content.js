import { projects } from "../navigation/project-navigation";
import { content } from "./todo-edit-content";
import { renderTodoContent } from "./todo-render-content";
import { format } from "date-fns";

export { renderProjectContent, shortenTodoDescription, createRenderTodoPriorityElement };

function createProjectRenderContentElement(project) {
    const projectIndex = project.getAttribute("project");

    let heading;
    if (projects[projectIndex].title) {
        heading = projects[projectIndex].title;
    } else {
        heading = "-";
    }
    let todos;
    if (projects[projectIndex].todos) {
        todos = projects[projectIndex].todos;
    } else {
        todos = false;
    }

    const projectRenderContent = document.createElement("div");
    projectRenderContent.classList.add("project-render-content");
    projectRenderContent.setAttribute("project", projectIndex);

    const projectRenderHeadingContainer = document.createElement("div");
    projectRenderHeadingContainer.classList.add("project-render-heading");
    const projectRenderHeading = document.createElement("h1");
    projectRenderHeading.innerText = heading;
    projectRenderHeadingContainer.appendChild(projectRenderHeading);

    let renderTodos = document.createElement("div");
    if (todos) {
        renderTodos = (createTodosRenderContentElement(todos, projectIndex));
    } 

    projectRenderContent.appendChild(projectRenderHeadingContainer);
    projectRenderContent.appendChild(renderTodos);

    return projectRenderContent;
}

function renderProjectContent(projectIndex) {
    const contentChild = content.children[0];
    contentChild.replaceWith(createProjectRenderContentElement(projectIndex));
}

function createTodosRenderContentElement(todos, projectIndex) {
    const renderTodos = document.createElement("div");
    renderTodos.classList.add("render-todos");

    todos.forEach((todo, todoIndex) => {
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
            dueDate = format(todo.dueDate, "dd.MM.yyyy");
        } else {
            dueDate = "-";
        } 
        let priority = todo.priority;

        const renderTodoItem = document.createElement("div");
        renderTodoItem.classList.add("render-todo-item");
        renderTodoItem.setAttribute("project", projectIndex);
        renderTodoItem.setAttribute("todo", todoIndex);
        renderTodoItem.addEventListener("click", () => renderTodoContent(projectIndex, todoIndex));

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

function shortenTodoDescription(description) {
    let newDescription;
    if (description.length > 100) {
        newDescription = description.slice(0, 99).padEnd(102, ".");
    } else {
        newDescription = description;
    }
    return newDescription;
}

function createRenderTodoPriorityElement(priority) {
    if (priority == "low") {
        const todoRenderPriority = document.createElement("div");
        todoRenderPriority.classList.add("render-todo-priority");
        const todoRenderIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        todoRenderIconSvg.setAttribute("viewBox", "0 0 16 16");
        const todoRenderIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        todoRenderIconPath.setAttribute("style", "line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;isolation:auto;mix-blend-mode:normal");
        todoRenderIconPath.setAttribute("d", "M 7.5 0.00390625 C 7.2392937 0.00386484 6.9795353 0.10151474 6.7832031 0.296875 A 0.50005 0.50005 0 0 0 6.78125 0.296875 L 0.296875 6.7832031 C -0.09526663 7.1753448 -0.09384552 7.8241325 0.296875 8.2167969 A 0.50005 0.50005 0 0 0 0.296875 8.21875 L 6.78125 14.703125 C 7.173978 15.095853 7.8240689 15.095853 8.2167969 14.703125 L 14.701172 8.21875 C 15.093314 7.8266084 15.093799 7.1758675 14.703125 6.7832031 A 0.50005 0.50005 0 0 0 14.701172 6.7832031 L 8.2167969 0.296875 C 8.0207261 0.10080418 7.7607063 0.00394766 7.5 0.00390625 z M 7.5097656 1.0039062 L 13.994141 7.4902344 C 14.002641 7.4992444 14.003141 7.5026818 13.994141 7.5117188 L 7.5097656 13.996094 C 7.5004956 14.005394 7.4975532 14.005394 7.4882812 13.996094 L 1.0058594 7.5117188 C 0.99457988 7.5003827 0.99404475 7.5000924 1.0039062 7.4902344 L 7.4882812 1.0058594 C 7.4996173 0.99457988 7.4999076 0.99404475 7.5097656 1.0039062 z M 7 4 L 7 4.5 L 7 9.2363281 L 4.7128906 7.1328125 L 4.0371094 7.8671875 L 7.5 11.054688 L 10.962891 7.8671875 L 10.287109 7.1328125 L 8 9.2363281 L 8 4.5 L 8 4 L 7 4 z");
        todoRenderIconPath.setAttribute("font-weight", "400");
        todoRenderIconPath.setAttribute("font-family", "sans-serif");
        todoRenderIconPath.setAttribute("white-space", "normal");
        todoRenderIconPath.setAttribute("overflow", "visible");
        todoRenderIconSvg.appendChild(todoRenderIconPath);
        const todoRenderPriorityParagraph = document.createElement("p");
        todoRenderPriorityParagraph.innerText = "Low Priority";
        todoRenderPriority.appendChild(todoRenderIconSvg);
        todoRenderPriority.appendChild(todoRenderPriorityParagraph);
        return todoRenderPriority;
    } else if (priority == "medium") {
        const todoRenderPriority = document.createElement("div");
        todoRenderPriority.classList.add("render-todo-priority");
        const todoRenderIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        todoRenderIconSvg.setAttribute("viewBox", "0 0 16 16");
        const todoRenderIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        todoRenderIconPath.setAttribute("style", "line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;isolation:auto;mix-blend-mode:normal");
        todoRenderIconPath.setAttribute("d", "M 7.5 0.00390625 C 7.2392937 0.00386484 6.9795353 0.10151474 6.7832031 0.296875 A 0.50005 0.50005 0 0 0 6.78125 0.296875 L 0.296875 6.7832031 C -0.09526663 7.1753448 -0.09384552 7.8241325 0.296875 8.2167969 A 0.50005 0.50005 0 0 0 0.296875 8.21875 L 6.78125 14.703125 C 7.173978 15.095853 7.8240689 15.095853 8.2167969 14.703125 L 14.701172 8.21875 C 15.093314 7.8266084 15.093799 7.1758675 14.703125 6.7832031 A 0.50005 0.50005 0 0 0 14.701172 6.7832031 L 8.2167969 0.296875 C 8.0207261 0.10080418 7.7607063 0.00394766 7.5 0.00390625 z M 7.5097656 1.0039062 L 13.994141 7.4902344 C 14.002641 7.4992444 14.003141 7.5026818 13.994141 7.5117188 L 7.5097656 13.996094 C 7.5004956 14.005394 7.4975532 14.005394 7.4882812 13.996094 L 1.0058594 7.5117188 C 0.99457988 7.5003827 0.99404475 7.5000924 1.0039062 7.4902344 L 7.4882812 1.0058594 C 7.4996173 0.99457988 7.4999076 0.99404475 7.5097656 1.0039062 z M 4.5 7 A 0.5 0.5 0 0 0 4 7.5 A 0.5 0.5 0 0 0 4.5 8 A 0.5 0.5 0 0 0 5 7.5 A 0.5 0.5 0 0 0 4.5 7 z M 7.5 7 A 0.5 0.5 0 0 0 7 7.5 A 0.5 0.5 0 0 0 7.5 8 A 0.5 0.5 0 0 0 8 7.5 A 0.5 0.5 0 0 0 7.5 7 z M 10.5 7 A 0.5 0.5 0 0 0 10 7.5 A 0.5 0.5 0 0 0 10.5 8 A 0.5 0.5 0 0 0 11 7.5 A 0.5 0.5 0 0 0 10.5 7 z");
        todoRenderIconPath.setAttribute("font-weight", "400");
        todoRenderIconPath.setAttribute("font-family", "sans-serif");
        todoRenderIconPath.setAttribute("white-space", "normal");
        todoRenderIconPath.setAttribute("overflow", "visible");
        todoRenderIconSvg.appendChild(todoRenderIconPath);
        const todoRenderPriorityParagraph = document.createElement("p");
        todoRenderPriorityParagraph.innerText = "Medium Priority";
        todoRenderPriority.appendChild(todoRenderIconSvg);
        todoRenderPriority.appendChild(todoRenderPriorityParagraph);
        return todoRenderPriority;
    } else if (priority == "high") {
        const todoRenderPriority = document.createElement("div");
        todoRenderPriority.classList.add("render-todo-priority");
        const todoRenderIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        todoRenderIconSvg.setAttribute("viewBox", "0 0 16 16");
        const todoRenderIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        todoRenderIconPath.setAttribute("style", "line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;isolation:auto;mix-blend-mode:normal");
        todoRenderIconPath.setAttribute("d", "M 7.5 0.00390625 C 7.2392937 0.00386484 6.9795353 0.10151474 6.7832031 0.296875 A 0.50005 0.50005 0 0 0 6.78125 0.296875 L 0.296875 6.7832031 C -0.09526663 7.1753448 -0.09384552 7.8241325 0.296875 8.2167969 A 0.50005 0.50005 0 0 0 0.296875 8.21875 L 6.78125 14.703125 C 7.173978 15.095853 7.8240689 15.095853 8.2167969 14.703125 L 14.701172 8.21875 C 15.093314 7.8266084 15.093799 7.1758675 14.703125 6.7832031 A 0.50005 0.50005 0 0 0 14.701172 6.7832031 L 8.2167969 0.296875 C 8.0207261 0.10080418 7.7607063 0.00394766 7.5 0.00390625 z M 7.5097656 1.0039062 L 13.994141 7.4902344 C 14.002641 7.4992444 14.003141 7.5026818 13.994141 7.5117188 L 7.5097656 13.996094 C 7.5004956 14.005394 7.4975532 14.005394 7.4882812 13.996094 L 1.0058594 7.5117188 C 0.99457988 7.5003827 0.99404475 7.5000924 1.0039062 7.4902344 L 7.4882812 1.0058594 C 7.4996173 0.99457988 7.4999076 0.99404475 7.5097656 1.0039062 z M 7 4 L 7 4.5 L 7 8.5 L 7 9 L 8 9 L 8 8.5 L 8 4.5 L 8 4 L 7 4 z M 7 10 L 7 11 L 8 11 L 8 10 L 7 10 z");
        todoRenderIconPath.setAttribute("font-weight", "400");
        todoRenderIconPath.setAttribute("font-family", "sans-serif");
        todoRenderIconPath.setAttribute("white-space", "normal");
        todoRenderIconPath.setAttribute("overflow", "visible");
        todoRenderIconSvg.appendChild(todoRenderIconPath);
        const todoRenderPriorityParagraph = document.createElement("p");
        todoRenderPriorityParagraph.innerText = "High Priority";
        todoRenderPriority.appendChild(todoRenderIconSvg);
        todoRenderPriority.appendChild(todoRenderPriorityParagraph);
        return todoRenderPriority;
    }
}