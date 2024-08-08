import { projects } from "../navigation/project-navigation";
import { removeTodo, saveChecklist } from "../navigation/todo-navigation";
import { renderTodoContent } from "./todo-render-content";

export { createInitialTodoEditContentElement, createTodoEditContentElement, content, contentChild };

const content = document.querySelector(".content");
const contentChild = document.createElement("div");
content.appendChild(contentChild);

function createInitialTodoEditContentElement(projectIndex, todoIndex) {
    const contentChild = content.children[0];
    const todoEditContent = document.createElement("div");
    todoEditContent.classList.add("todo-edit-content");
    todoEditContent.setAttribute("project", `${projectIndex}`);
    todoEditContent.setAttribute("todo", `${todoIndex}`);

    const todoEditTitle = document.createElement("div");
    todoEditTitle.classList.add("todo-edit-title");
    const todoTitleLabel = document.createElement("label");
    todoTitleLabel.setAttribute("for", "todo-title");
    todoTitleLabel.innerText = "Title:";
    const todoTitleInput = document.createElement("input");
    todoTitleInput.setAttribute("type", "text");
    todoTitleInput.setAttribute("id", "todo-title");
    todoTitleInput.setAttribute("autocomplete", "off");
    todoTitleInput.setAttribute("maxlength", "20");
    todoTitleInput.setAttribute("name", "todo_title");
    todoTitleInput.setAttribute("placeholder", "(Max 20 char.)");
    todoEditTitle.appendChild(todoTitleLabel);
    todoEditTitle.appendChild(todoTitleInput);

    const todoEditDescription = document.createElement("div");
    todoEditDescription.classList.add("todo-edit-description");
    const todoDescriptionLabel = document.createElement("label");
    todoDescriptionLabel.setAttribute("for", "todo-description");
    todoDescriptionLabel.innerText = "Description:";
    const todoDescriptionTextarea = document.createElement("textarea");
    todoDescriptionTextarea.setAttribute("name", "todo_description");
    todoDescriptionTextarea.setAttribute("id", "todo-description");
    todoDescriptionTextarea.setAttribute("maxlength", "200");
    todoDescriptionTextarea.setAttribute("placeholder", "(Max 200 char.)");
    todoEditDescription.appendChild(todoDescriptionLabel);
    todoEditDescription.appendChild(todoDescriptionTextarea);

    const todoEditDueDate = document.createElement("div");
    todoEditDueDate.classList.add("todo-edit-due-date");
    const todoEditDueDateLabel = document.createElement("label");
    todoEditDueDateLabel.setAttribute("for", "todo-due-date");
    todoEditDueDateLabel.innerText = "Due Date:";
    const todoEditDueDateInput = document.createElement("input");
    todoEditDueDateInput.setAttribute("type", "date");
    todoEditDueDateInput.setAttribute("name", "todo_dueDate");
    todoEditDueDateInput.setAttribute("id", "todo-due-date");
    todoEditDueDate.appendChild(todoEditDueDateLabel);
    todoEditDueDate.appendChild(todoEditDueDateInput);
    todoEditDueDateInput.value = projects[projectIndex].todos[todoIndex].dueDate;

    const todoEditPriority = document.createElement("div");
    todoEditPriority.classList.add("todo-edit-priority");
    const todoEditPriorityFieldset = document.createElement("fieldset");
    const todoEditPriorityLegend = document.createElement("legend");
    todoEditPriorityLegend.innerText = "Priority";

    const todoLowPriority = document.createElement("div");
    todoLowPriority.classList.add("todo-low-priority");
    const todoLowPriorityLabel = document.createElement("label");
    todoLowPriorityLabel.setAttribute("for", "todo-low-priority");
    todoLowPriorityLabel.innerText = "Low Priority";
    const todoLowPriorityInput = document.createElement("input");
    todoLowPriorityInput.setAttribute("type", "radio");
    todoLowPriorityInput.setAttribute("name", "todo_priority");
    todoLowPriorityInput.setAttribute("id", "todo-low-priority");
    todoLowPriorityInput.setAttribute("value", "low");
    todoLowPriorityInput.setAttribute("checked", "");
    const todoLowPrioritySpan = document.createElement("span");
    todoLowPrioritySpan.classList.add("checkmark");
    todoLowPriorityLabel.appendChild(todoLowPriorityInput);
    todoLowPriorityLabel.appendChild(todoLowPrioritySpan);
    todoLowPriority.appendChild(todoLowPriorityLabel);

    const todoMediumPriority = document.createElement("div");
    todoMediumPriority.classList.add("todo-medium-priority");
    const todoMediumPriorityLabel = document.createElement("label");
    todoMediumPriorityLabel.setAttribute("for", "todo-medium-priority");
    todoMediumPriorityLabel.innerText = "Medium Priority";
    const todoMediumPriorityInput = document.createElement("input");
    todoMediumPriorityInput.setAttribute("type", "radio");
    todoMediumPriorityInput.setAttribute("name", "todo_priority");
    todoMediumPriorityInput.setAttribute("id", "todo-medium-priority");
    todoMediumPriorityInput.setAttribute("value", "medium");
    const todoMediumPrioritySpan = document.createElement("span");
    todoMediumPrioritySpan.classList.add("checkmark");
    todoMediumPriorityLabel.appendChild(todoMediumPriorityInput);
    todoMediumPriorityLabel.appendChild(todoMediumPrioritySpan);
    todoMediumPriority.appendChild(todoMediumPriorityLabel);

    const todoHighPriority = document.createElement("div");
    todoHighPriority.classList.add("todo-high-priority");
    const todoHighPriorityLabel = document.createElement("label");
    todoHighPriorityLabel.setAttribute("for", "todo-high-priority");
    todoHighPriorityLabel.innerText = "High Priority";
    const todoHighPriorityInput = document.createElement("input");
    todoHighPriorityInput.setAttribute("type", "radio");
    todoHighPriorityInput.setAttribute("name", "todo_priority");
    todoHighPriorityInput.setAttribute("id", "todo-high-priority");
    todoHighPriorityInput.setAttribute("value", "high");
    const todoHighPrioritySpan = document.createElement("span");
    todoHighPrioritySpan.classList.add("checkmark");
    todoHighPriorityLabel.appendChild(todoHighPriorityInput);
    todoHighPriorityLabel.appendChild(todoHighPrioritySpan);
    todoHighPriority.appendChild(todoHighPriorityLabel);

    todoEditPriorityFieldset.appendChild(todoEditPriorityLegend);
    todoEditPriorityFieldset.appendChild(todoLowPriority);
    todoEditPriorityFieldset.appendChild(todoMediumPriority);
    todoEditPriorityFieldset.appendChild(todoHighPriority);
    todoEditPriority.appendChild(todoEditPriorityFieldset);

    const todoEditChecklist = document.createElement("div");
    todoEditChecklist.classList.add("todo-edit-checklist");
    const todoEditChecklistFieldset = document.createElement("fieldset");
    const todoEditChecklistLegend = document.createElement("legend");
    todoEditChecklistLegend.innerText = "Checklist";

    const todoEditChecklistItems = document.createElement("div");
    todoEditChecklistItems.classList.add("todo-edit-checklist-items");
    const todoChecklistAddItem = document.createElement("div");
    todoChecklistAddItem.classList.add("checklist-add-item");
    const todoChecklistAddItemIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    todoChecklistAddItemIcon.setAttribute("viewBox", "0 -960 960 960");
    const todoChecklistAddItemPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoChecklistAddItemPath.setAttribute("d", "M448.67-280h66.66v-164H680v-66.67H515.33V-680h-66.66v169.33H280V-444h168.67v164Zm31.51 200q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Z");
    todoChecklistAddItemIcon.appendChild(todoChecklistAddItemPath);
    const todoChecklistAddItemText = document.createElement("p");
    todoChecklistAddItemText.innerText = "Add checklist item";
    todoChecklistAddItem.appendChild(todoChecklistAddItemIcon);
    todoChecklistAddItem.appendChild(todoChecklistAddItemText);
    todoChecklistAddItem.addEventListener("click", () => addChecklistItemElement(todoChecklistAddItem));
    todoEditChecklistItems.appendChild(todoChecklistAddItem);

    todoEditChecklistFieldset.appendChild(todoEditChecklistLegend);
    todoEditChecklistFieldset.appendChild(todoEditChecklistItems);
    todoEditChecklist.appendChild(todoEditChecklistFieldset);

    const todoEditButtons = document.createElement("div");
    todoEditButtons.classList.add("todo-edit-buttons");
    const saveTodoButton = document.createElement("button");
    saveTodoButton.innerText = "Save Todo";
    saveTodoButton.classList.add("save-todo");
    saveTodoButton.addEventListener("click", () => saveInitialTodoEditContentElement(projectIndex, todoIndex));
    const discardTodoButton = document.createElement("button");
    discardTodoButton.innerText = "Delete Todo";
    discardTodoButton.classList.add("discard-todo");
    discardTodoButton.addEventListener("click", () => deleteTodoEditContentElement(todoEditContent, projectIndex, todoIndex));
    todoEditButtons.appendChild(saveTodoButton);
    todoEditButtons.appendChild(discardTodoButton);

    todoEditContent.appendChild(todoEditTitle);
    todoEditContent.appendChild(todoEditDescription);
    todoEditContent.appendChild(todoEditDueDate);
    todoEditContent.appendChild(todoEditPriority);
    todoEditContent.appendChild(todoEditChecklist);
    todoEditContent.appendChild(todoEditButtons);

    contentChild.replaceWith(todoEditContent);
    todoTitleInput.focus();
}

function createTodoEditContentElement(projectIndex, todoIndex) {
    const contentChild = content.children[0];
    const title = projects[projectIndex].todos[todoIndex].title;
    const description = projects[projectIndex].todos[todoIndex].description;
    const dueDate = projects[projectIndex].todos[todoIndex].dueDate;
    const priority = projects[projectIndex].todos[todoIndex].priority;
    const checklist = projects[projectIndex].todos[todoIndex].checklists;

    const todoEditContent = document.createElement("div");
    todoEditContent.classList.add("todo-edit-content");
    todoEditContent.setAttribute("project", `${projectIndex}`);
    todoEditContent.setAttribute("todo", `${todoIndex}`);

    const todoEditTitle = document.createElement("div");
    todoEditTitle.classList.add("todo-edit-title");
    const todoTitleLabel = document.createElement("label");
    todoTitleLabel.setAttribute("for", "todo-title");
    todoTitleLabel.innerText = "Title:";
    const todoTitleInput = document.createElement("input");
    todoTitleInput.setAttribute("type", "text");
    todoTitleInput.setAttribute("id", "todo-title");
    todoTitleInput.setAttribute("autocomplete", "off");
    todoTitleInput.setAttribute("maxlength", "20");
    todoTitleInput.setAttribute("name", "todo_title");
    todoTitleInput.setAttribute("placeholder", "(Max 20 char.)");
    todoTitleInput.value = title;
    todoEditTitle.appendChild(todoTitleLabel);
    todoEditTitle.appendChild(todoTitleInput);

    const todoEditDescription = document.createElement("div");
    todoEditDescription.classList.add("todo-edit-description");
    const todoDescriptionLabel = document.createElement("label");
    todoDescriptionLabel.setAttribute("for", "todo-description");
    todoDescriptionLabel.innerText = "Description:";
    const todoDescriptionTextarea = document.createElement("textarea");
    todoDescriptionTextarea.setAttribute("name", "todo_description");
    todoDescriptionTextarea.setAttribute("id", "todo-description");
    todoDescriptionTextarea.setAttribute("maxlength", "200");
    todoDescriptionTextarea.setAttribute("placeholder", "(Max 200 char.)");
    todoDescriptionTextarea.value = description;
    todoEditDescription.appendChild(todoDescriptionLabel);
    todoEditDescription.appendChild(todoDescriptionTextarea);

    const todoEditDueDate = document.createElement("div");
    todoEditDueDate.classList.add("todo-edit-due-date");
    const todoEditDueDateLabel = document.createElement("label");
    todoEditDueDateLabel.setAttribute("for", "todo-due-date");
    todoEditDueDateLabel.innerText = "Due Date:";
    const todoEditDueDateInput = document.createElement("input");
    todoEditDueDateInput.setAttribute("type", "date");
    todoEditDueDateInput.setAttribute("name", "todo_dueDate");
    todoEditDueDateInput.setAttribute("id", "todo-due-date");
    todoEditDueDate.appendChild(todoEditDueDateLabel);
    todoEditDueDate.appendChild(todoEditDueDateInput);
    todoEditDueDateInput.value = dueDate;

    const todoEditPriority = document.createElement("div");
    todoEditPriority.classList.add("todo-edit-priority");
    const todoEditPriorityFieldset = document.createElement("fieldset");
    const todoEditPriorityLegend = document.createElement("legend");
    todoEditPriorityLegend.innerText = "Priority";

    const todoLowPriority = document.createElement("div");
    todoLowPriority.classList.add("todo-low-priority");
    const todoLowPriorityLabel = document.createElement("label");
    todoLowPriorityLabel.setAttribute("for", "todo-low-priority");
    todoLowPriorityLabel.innerText = "Low Priority";
    const todoLowPriorityInput = document.createElement("input");
    todoLowPriorityInput.setAttribute("type", "radio");
    todoLowPriorityInput.setAttribute("name", "todo_priority");
    todoLowPriorityInput.setAttribute("id", "todo-low-priority");
    todoLowPriorityInput.setAttribute("value", "low");
    const todoLowPrioritySpan = document.createElement("span");
    todoLowPrioritySpan.classList.add("checkmark");
    todoLowPriorityLabel.appendChild(todoLowPriorityInput);
    todoLowPriorityLabel.appendChild(todoLowPrioritySpan);
    todoLowPriority.appendChild(todoLowPriorityLabel);

    const todoMediumPriority = document.createElement("div");
    todoMediumPriority.classList.add("todo-medium-priority");
    const todoMediumPriorityLabel = document.createElement("label");
    todoMediumPriorityLabel.setAttribute("for", "todo-medium-priority");
    todoMediumPriorityLabel.innerText = "Medium Priority";
    const todoMediumPriorityInput = document.createElement("input");
    todoMediumPriorityInput.setAttribute("type", "radio");
    todoMediumPriorityInput.setAttribute("name", "todo_priority");
    todoMediumPriorityInput.setAttribute("id", "todo-medium-priority");
    todoMediumPriorityInput.setAttribute("value", "medium");
    const todoMediumPrioritySpan = document.createElement("span");
    todoMediumPrioritySpan.classList.add("checkmark");
    todoMediumPriorityLabel.appendChild(todoMediumPriorityInput);
    todoMediumPriorityLabel.appendChild(todoMediumPrioritySpan);
    todoMediumPriority.appendChild(todoMediumPriorityLabel);

    const todoHighPriority = document.createElement("div");
    todoHighPriority.classList.add("todo-high-priority");
    const todoHighPriorityLabel = document.createElement("label");
    todoHighPriorityLabel.setAttribute("for", "todo-high-priority");
    todoHighPriorityLabel.innerText = "High Priority";
    const todoHighPriorityInput = document.createElement("input");
    todoHighPriorityInput.setAttribute("type", "radio");
    todoHighPriorityInput.setAttribute("name", "todo_priority");
    todoHighPriorityInput.setAttribute("id", "todo-high-priority");
    todoHighPriorityInput.setAttribute("value", "high");
    const todoHighPrioritySpan = document.createElement("span");
    todoHighPrioritySpan.classList.add("checkmark");
    todoHighPriorityLabel.appendChild(todoHighPriorityInput);
    todoHighPriorityLabel.appendChild(todoHighPrioritySpan);
    todoHighPriority.appendChild(todoHighPriorityLabel);

    switch (priority) {
        case "low":
            todoLowPriorityInput.setAttribute("checked", "");
            break;
        case "medium":
            todoMediumPriorityInput.setAttribute("checked", "");
            break;
        case "high":
            todoHighPriorityInput.setAttribute("checked", "");
    }

    todoEditPriorityFieldset.appendChild(todoEditPriorityLegend);
    todoEditPriorityFieldset.appendChild(todoLowPriority);
    todoEditPriorityFieldset.appendChild(todoMediumPriority);
    todoEditPriorityFieldset.appendChild(todoHighPriority);
    todoEditPriority.appendChild(todoEditPriorityFieldset);

    const todoEditChecklist = document.createElement("div");
    todoEditChecklist.classList.add("todo-edit-checklist");
    const todoEditChecklistFieldset = document.createElement("fieldset");
    const todoEditChecklistLegend = document.createElement("legend");
    todoEditChecklistLegend.innerText = "Checklist";

    const todoEditChecklistItems = document.createElement("div");
    todoEditChecklistItems.classList.add("todo-edit-checklist-items");
    const todoChecklistAddItem = document.createElement("div");
    todoChecklistAddItem.classList.add("checklist-add-item");
    const todoChecklistAddItemIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    todoChecklistAddItemIcon.setAttribute("viewBox", "0 -960 960 960");
    const todoChecklistAddItemPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    todoChecklistAddItemPath.setAttribute("d", "M448.67-280h66.66v-164H680v-66.67H515.33V-680h-66.66v169.33H280V-444h168.67v164Zm31.51 200q-82.83 0-155.67-31.5-72.84-31.5-127.18-85.83Q143-251.67 111.5-324.56T80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.46q-54 54.21-127 85.84Q563-80 480.18-80Z");
    todoChecklistAddItemIcon.appendChild(todoChecklistAddItemPath);
    const todoChecklistAddItemText = document.createElement("p");
    todoChecklistAddItemText.innerText = "Add checklist item";
    todoChecklistAddItem.appendChild(todoChecklistAddItemIcon);
    todoChecklistAddItem.appendChild(todoChecklistAddItemText);
    todoChecklistAddItem.addEventListener("click", () => addChecklistItemElement(todoChecklistAddItem));
    todoEditChecklistItems.appendChild(todoChecklistAddItem);

    todoEditChecklistFieldset.appendChild(todoEditChecklistLegend);
    todoEditChecklistFieldset.appendChild(todoEditChecklistItems);
    todoEditChecklist.appendChild(todoEditChecklistFieldset);

    if (checklist) {
        renderChecklistItemElements(checklist, todoEditChecklistItems);
    }

    const todoEditButtons = document.createElement("div");
    todoEditButtons.classList.add("todo-edit-buttons");
    const saveTodoButton = document.createElement("button");
    saveTodoButton.innerText = "Save Changes";
    saveTodoButton.classList.add("save-todo");
    saveTodoButton.addEventListener("click", () => saveTodoEditContentElement(projectIndex, todoIndex));
    const discardTodoButton = document.createElement("button");
    discardTodoButton.innerText = "Discard Changes";
    discardTodoButton.classList.add("discard-todo");
    discardTodoButton.addEventListener("click", () => renderTodoContent(projectIndex, todoIndex));
    todoEditButtons.appendChild(saveTodoButton);
    todoEditButtons.appendChild(discardTodoButton);

    todoEditContent.appendChild(todoEditTitle);
    todoEditContent.appendChild(todoEditDescription);
    todoEditContent.appendChild(todoEditDueDate);
    todoEditContent.appendChild(todoEditPriority);
    todoEditContent.appendChild(todoEditChecklist);
    todoEditContent.appendChild(todoEditButtons);

    contentChild.replaceWith(todoEditContent);
    todoTitleInput.focus();
}

function createChecklistItemElement(count) {
    const checklistItem = document.createElement("div");
    checklistItem.setAttribute("checklist", count);
    checklistItem.classList.add("checklist-item");

    const checklistItemLabel = document.createElement("label");
    checklistItemLabel.setAttribute("for", `checklist-item-${count}`);
    checklistItemLabel.innerText = `Item ${count}:`;
    const checklistItemInput = document.createElement("input");
    checklistItemInput.setAttribute("type", "text");
    checklistItemInput.setAttribute("id", `checklist-item-${count}`);
    checklistItemInput.setAttribute("autocomplete", "off");
    checklistItemInput.setAttribute("maxlength", "40");
    checklistItemInput.setAttribute("placeholder", "(Max 40 char.)");

    const checklistItemIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    checklistItemIcon.setAttribute("viewBox", "0 -960 960 960");
    const checklistItemPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    checklistItemPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z")
    checklistItemIcon.appendChild(checklistItemPath);
    checklistItemIcon.addEventListener("click", () => removeChecklistItemElement(checklistItem));

    checklistItem.appendChild(checklistItemLabel);
    checklistItem.appendChild(checklistItemInput);
    checklistItem.appendChild(checklistItemIcon);

    return [checklistItem, checklistItemInput];
}

function addChecklistItemElement() {
    const checklistItems = document.querySelectorAll(".checklist-item");
    const checklistCount = checklistItems.length + 1;

    const todoEditChecklistItems = document.querySelector(".todo-edit-checklist-items");
    const checklistItemValues = createChecklistItemElement(checklistCount);
    const checklistItemElement = checklistItemValues[0];
    const checklistItemInput = checklistItemValues[1];
    todoEditChecklistItems.appendChild(checklistItemElement);
    checklistItemInput.focus();
}

function renderChecklistItemElements(checklist, parentElement) {
    let count = 1;
    checklist.forEach(function(item) {
        const checklistItem = document.createElement("div");
        checklistItem.setAttribute("checklist", count);
        checklistItem.classList.add("checklist-item");
    
        const checklistItemLabel = document.createElement("label");
        checklistItemLabel.setAttribute("for", `checklist-item-${count}`);
        checklistItemLabel.innerText = `Item ${count}:`;
        const checklistItemInput = document.createElement("input");
        checklistItemInput.setAttribute("type", "text");
        checklistItemInput.setAttribute("id", `checklist-item-${count}`);
        checklistItemInput.setAttribute("autocomplete", "off");
        checklistItemInput.setAttribute("maxlength", "40");
        checklistItemInput.setAttribute("placeholder", "(Max 40 char.)");
        checklistItemInput.setAttribute("value", item.title);
    
        const checklistItemIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        checklistItemIcon.setAttribute("viewBox", "0 -960 960 960");
        const checklistItemPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        checklistItemPath.setAttribute("d", "M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z")
        checklistItemIcon.appendChild(checklistItemPath);
        checklistItemIcon.addEventListener("click", () => removeChecklistItemElement(checklistItem));
    
        checklistItem.appendChild(checklistItemLabel);
        checklistItem.appendChild(checklistItemInput);
        checklistItem.appendChild(checklistItemIcon);

        parentElement.appendChild(checklistItem);
        count++;
    })
}

function removeChecklistItemElement(element) {
    const checklistCount = +(element.getAttribute("checklist"));
    element.remove();
    updateChecklistItemElementCount(checklistCount);
}

function updateChecklistItemElementCount(count) {
    const checklistItems = document.querySelectorAll(".checklist-item");
    checklistItems.forEach(item => {
        let checklistItemCount = item.getAttribute("checklist");
        if (checklistItemCount > count) {
            let checklistItemLabel = item.querySelector("label");
            let checklistItemInput = item.querySelector("input");
            item.setAttribute("checklist", checklistItemCount - 1);
            checklistItemLabel.setAttribute("for", `checklist-item-${checklistItemCount - 1}`);
            checklistItemLabel.innerText = `Item ${checklistItemCount - 1}:`;
            checklistItemInput.setAttribute("id", `checklist-item-${checklistItemCount - 1}`);
        }
    })
}

function changeTodoTitleDom(title, projectIndex, todoIndex) {
    const todoDom = document.querySelector(`.todo[todo="${todoIndex}"][project="${projectIndex}"]`);
    const todoTitle = todoDom.querySelector(".todo-title");
    todoTitle.innerText = title;
}

function saveInitialTodoEditContentElement(projectIndex, todoIndex) {
    const title = document.querySelector("input[name='todo_title']").value;
    const description = document.querySelector("textarea[name='todo_description']").value;
    const dueDate = document.querySelector("input[name='todo_dueDate']").value;
    const priority = document.querySelector("input[name='todo_priority']:checked").value;
    const checklist = document.querySelectorAll(".checklist-item input[type='text']");

    projects[projectIndex].todos[todoIndex].title = title;
    projects[projectIndex].todos[todoIndex].description = description;
    projects[projectIndex].todos[todoIndex].dueDate = dueDate;
    projects[projectIndex].todos[todoIndex].priority = priority;

    projects[projectIndex].todos[todoIndex].checklists.splice(0);

    checklist.forEach(item => {
        let checklistTitle = item.value;
        saveChecklist(projectIndex, todoIndex, checklistTitle);
    })

    changeTodoTitleDom(title, projectIndex, todoIndex);
    renderTodoContent(projectIndex, todoIndex);
}

function saveTodoEditContentElement(projectIndex, todoIndex) {
    const title = document.querySelector("input[name='todo_title']").value;
    const description = document.querySelector("textarea[name='todo_description']").value;
    const dueDate = document.querySelector("input[name='todo_dueDate']").value;
    const priority = document.querySelector("input[name='todo_priority']:checked").value;
    const checklist = document.querySelectorAll(".checklist-item input[type='text']");

    projects[projectIndex].todos[todoIndex].title = title;
    projects[projectIndex].todos[todoIndex].description = description;
    projects[projectIndex].todos[todoIndex].dueDate = dueDate;
    projects[projectIndex].todos[todoIndex].priority = priority;

    let oldChecklist = [];
    projects[projectIndex].todos[todoIndex].checklists.forEach(item => {
        let checklistTitle = item.title;
        let checklistStatus = item.status;
        let checklistItem = { checklistTitle, checklistStatus };
        oldChecklist.push(checklistItem);
    })
    console.log(oldChecklist);

    projects[projectIndex].todos[todoIndex].checklists.splice(0);

    checklist.forEach((item, index) => {
        let checklistTitle = item.value;
        saveChecklist(projectIndex, todoIndex, checklistTitle);
        oldChecklist.forEach(item => {
            if (item.checklistTitle == checklistTitle && item.checklistStatus == "checked") {
                projects[projectIndex].todos[todoIndex].checklists[index].status = "checked";
            }
        })
    })

    changeTodoTitleDom(title, projectIndex, todoIndex);
    renderTodoContent(projectIndex, todoIndex);
}

function deleteTodoEditContentElement(element, projectIndex, todoIndex) {
    const todoDomElement = document.querySelector(`.todo[todo="${todoIndex}"][project="${projectIndex}"]`);
    removeTodo(projectIndex, todoIndex);
    element.replaceWith(contentChild);
    todoDomElement.remove();
}