import { projects } from "../navigation/project-navigation";
import { content } from "./todo-edit-content";
import { format } from "date-fns";

export { renderTodoContent };

function createTodoRenderContentElement(projectIndex, todoIndex) {
    let title;
    if (projects[projectIndex].todos[todoIndex].title) {
        title = projects[projectIndex].todos[todoIndex].title;
    } else {
        title = "-";
    }
    let description;
    if (projects[projectIndex].todos[todoIndex].description) {
        description = projects[projectIndex].todos[todoIndex].description;
    } else {
        description = "-";
    }
    let dueDate;
    if (projects[projectIndex].todos[todoIndex].dueDate) {
        dueDate = format(projects[projectIndex].todos[todoIndex].dueDate, "dd.MM.yyyy");
    } else {
        dueDate = "-";
    }
    const priority = projects[projectIndex].todos[todoIndex].priority;
    let checklists;
    if (projects[projectIndex].todos[todoIndex].checklists) {
        checklists = projects[projectIndex].todos[todoIndex].checklists;
    } else {
        checklists = false;
    }

    const todoRenderContent = document.createElement("div");
    todoRenderContent.classList.add("todo-render-content");
    todoRenderContent.setAttribute("project", `${projectIndex}`);
    todoRenderContent.setAttribute("todo", `${todoIndex}`);
    
    const todoRenderHeader = document.createElement("div");
    todoRenderHeader.classList.add("todo-render-header");
    const todoRenderMeta = document.createElement("div");
    todoRenderMeta.classList.add("todo-render-meta");
    const todoRenderDueDate = document.createElement("div");
    todoRenderDueDate.classList.add("todo-render-due-date");
    todoRenderDueDate.innerText = `Due by ${dueDate}`;
    const todoRenderPriority = createTodoRenderPriorityElement(priority);
    todoRenderMeta.appendChild(todoRenderDueDate);
    todoRenderMeta.appendChild(todoRenderPriority);
    const todoRenderTitleElement = document.createElement("div");
    todoRenderTitleElement.classList.add("todo-render-title-element");
    const todoRenderTitle = document.createElement("h2");
    todoRenderTitle.innerText = title;
    todoRenderTitleElement.appendChild(todoRenderTitle);
    todoRenderHeader.appendChild(todoRenderMeta);
    todoRenderHeader.appendChild(todoRenderTitleElement);

    const todoRenderDescription = document.createElement("div");
    todoRenderDescription.classList.add("todo-render-description");
    const todoRenderDescriptionText = document.createElement("p");
    todoRenderDescriptionText.innerText = description;
    todoRenderDescription.appendChild(todoRenderDescriptionText);

    const todoRenderChecklist = document.createElement("div");
    todoRenderChecklist.classList.add("todo-render-checklist");
    if (checklists.length > 0) {
        const todoRenderChecklistFieldset = document.createElement("fieldset");
        const todoRenderChecklistLegend = document.createElement("legend");
        const todoRenderChecklistLegendHeading = document.createElement("h3");
        todoRenderChecklistLegendHeading.innerText = "Checklist";
        todoRenderChecklistLegend.appendChild(todoRenderChecklistLegendHeading);
        const todoRenderChecklistItems = document.createElement("div");
        todoRenderChecklistItems.classList.add("todo-render-checklist-items");

        const todoRenderChecklistItemElements = createTodoRenderChecklistItemElement(checklists);
        todoRenderChecklistItemElements.forEach(element => {
            todoRenderChecklistItems.appendChild(element);
        })

        todoRenderChecklistFieldset.appendChild(todoRenderChecklistLegend);
        todoRenderChecklistFieldset.appendChild(todoRenderChecklistItems);
        todoRenderChecklist.appendChild(todoRenderChecklistFieldset);
    }

    todoRenderContent.appendChild(todoRenderHeader);
    todoRenderContent.appendChild(todoRenderDescription);
    todoRenderContent.appendChild(todoRenderChecklist);

    return todoRenderContent;
}

function renderTodoContent(projectIndex, todoIndex) {
    const contentChild = content.children[0];
    contentChild.replaceWith(createTodoRenderContentElement(projectIndex, todoIndex));
}

function createTodoRenderPriorityElement(priority) {
    if (priority == "low") {
        const todoRenderPriority = document.createElement("div");
        todoRenderPriority.classList.add("todo-render-priority");
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
        todoRenderPriority.classList.add("todo-render-priority");
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
        todoRenderPriority.classList.add("todo-render-priority");
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

function createTodoRenderChecklistItemElement(checklists) {
    const todoRenderChecklistItemElements = [];
    checklists.forEach((item, index) => {
        if (item.title) {
            let todoRenderChecklistItemLabel = document.createElement("label");
            todoRenderChecklistItemLabel.classList.add("todo-render-checklist-item");
            todoRenderChecklistItemLabel.setAttribute("for", `checklist-${index}`);
            todoRenderChecklistItemLabel.innerText = item.title;
            todoRenderChecklistItemLabel.addEventListener("click", () => setChecklistStatus(item, todoRenderChecklistItemInput));
            let todoRenderChecklistItemInput = document.createElement("input");
            if (item.status == "checked") {
                todoRenderChecklistItemInput.setAttribute("checked", "");
            }
            todoRenderChecklistItemInput.setAttribute("type", "checkbox");
            todoRenderChecklistItemInput.setAttribute("name", "todo-checklist");
            todoRenderChecklistItemInput.setAttribute("id", `checklist-${index}`);
            let todoRenderChecklistItemSpan = document.createElement("span");
            todoRenderChecklistItemSpan.classList.add("checkbox-checkmark");
            todoRenderChecklistItemLabel.appendChild(todoRenderChecklistItemInput);
            todoRenderChecklistItemLabel.appendChild(todoRenderChecklistItemSpan);
            todoRenderChecklistItemElements.push(todoRenderChecklistItemLabel);
        }
    })
    return todoRenderChecklistItemElements;
}

function setChecklistStatus(checklist, input) {
    if (input.checked) {
        checklist.status = "checked";
    } else {
        checklist.status = "";
    }
}