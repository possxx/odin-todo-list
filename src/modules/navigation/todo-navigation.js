import { projects } from "./project-navigation.js";
import { format } from "date-fns";

export { createTodo, removeAllTodos, removeTodo, editTodoTitle, editTodoDescription, editTodoDueDate, editTodoPriority };

function Todo(title, description, dueDate, priority, ...checklist) {
    return { title, description, dueDate, priority, checklist };
}

function createTodo(projectIndex) {
    const title = "";
    const description = "";
    const dueDate = format(new Date(), "yyyy-MM-dd");
    const priority = "low";

    projects[projectIndex].todos.push(Todo(title, description, dueDate, priority));
}

function removeAllTodos(projectIndex) {
    projects[projectIndex].todos.splice(0);
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