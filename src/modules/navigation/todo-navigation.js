import { projects } from "./project-navigation.js";

export { createTodo, removeTodo, editTodoTitle, editTodoDescription, editTodoDueDate, editTodoPriority };

function Todo(title, description, dueDate, priority, ...checklist) {
    return { title, description, dueDate, priority, checklist };
}

function createTodo(title, index) {
    projects[index].todos.push(Todo(title));
}

function removeTodo(projectIndex, todoIndex) {
    projects[projectIndex].todos.splice(todoIndex, 1);
}

function editTodoTitle(projectIndex, todoIndex, newTitle) {
    projects[projectIndex].todos[todoIndex].title = newTitle;
}

function editTodoDescription(projectIndex, todoIndex, newDescription) {
    projects[projectIndex].todos[todoIndex].description = newDescription;
}

function editTodoDueDate(projectIndex, todoIndex, newDueDate) {
    projects[projectIndex].todos[todoIndex].dueDate = newDueDate;
}

function editTodoPriority(projectIndex, todoIndex, newPriority) {
    projects[projectIndex].todos[todoIndex].priority = newPriority;
}