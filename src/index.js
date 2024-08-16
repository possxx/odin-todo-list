import { renderTodayContent } from "./modules/content/today-render-content";
import { renderUpcomingContent } from "./modules/content/upcoming-render-content";
import { renderPriorityContent } from "./modules/content/priority-render-content";
import { createInitialProjectDom, createProjectDom, projectsDom } from "./modules/navigation/project-navigation-dom";
import { createTodoDomElement, removeTodoDom } from "./modules/navigation/todo-navigation-dom";
import { createTodoEditContentElement, changeTodoTitleDom } from "./modules/content/todo-edit-content";
import { createTodo, saveChecklist } from "./modules/navigation/todo-navigation";

export { initialProject, saveToStorage, retrieveFromStorage, projects, changeActiveElement };

const todayNavigation = document.querySelector(".today");
todayNavigation.addEventListener("click", () => {
  renderTodayContent();
  changeActiveElement(todayNavigation);
});

const upcomingNavigation = document.querySelector(".upcoming");
upcomingNavigation.addEventListener("click", () => {
  renderUpcomingContent();
  changeActiveElement(upcomingNavigation);
});

const highPriorityNavigation = document.querySelector(".high-priority");
highPriorityNavigation.addEventListener("click", () => {
  renderPriorityContent("high");
  changeActiveElement(highPriorityNavigation);
});

const mediumPriorityNavigation = document.querySelector(".medium-priority");
mediumPriorityNavigation.addEventListener("click", () => {
  renderPriorityContent("medium");
  changeActiveElement(mediumPriorityNavigation);
});

const lowPriorityNavigation = document.querySelector(".low-priority");
lowPriorityNavigation.addEventListener("click", () => {
  renderPriorityContent("low");
  changeActiveElement(lowPriorityNavigation);
});

let initialProject;
let projects;

if (localStorage.getItem("projects")) {
  const oldProjects = retrieveFromStorage();
  projects = [];
  oldProjects.forEach((oldProject, projectIndex) => {
    if (projectIndex == 0) {
      createInitialProjectDom(oldProject.title);
      initialProject = document.querySelector(".initial-project");
      let todos = document.querySelector(`.todos[project='${projectIndex}']`);
      oldProject.todos.forEach((todo, todoIndex) => {
        pageLoadCreateTodo(projectIndex, todoIndex, todos);
        pageLoadSaveTodo(projectIndex, todoIndex, todo);
      })
    } else if (projectIndex > 0) {
      projectsDom.insertBefore(createProjectDom(oldProject.title), initialProject.nextSibling);
      let todos = document.querySelector(`.todos[project='${projectIndex}']`);
      oldProject.todos.forEach((todo, todoIndex) => {
        pageLoadCreateTodo(projectIndex, todoIndex, todos);
        pageLoadSaveTodo(projectIndex, todoIndex, todo);
      })
    } 
  })
} else {
  projects = [];
  createInitialProjectDom("Home");
  initialProject = document.querySelector(".initial-project");
}

function saveToStorage() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function retrieveFromStorage() {
    const oldProjects = JSON.parse(localStorage.getItem("projects"));
    return oldProjects;
}

function pageLoadCreateTodo(projectIndex, todoIndex, todos) {
  createTodo(projectIndex);
  let todoValues = createTodoDomElement(projectIndex, todoIndex);
  let todo = todoValues[0];
  let todoDeleteIcon = todoValues[1];
  let todoEditIcon = todoValues[2];
  todoDeleteIcon.addEventListener("click", () => removeTodoDom(todo, projectIndex));
  todoEditIcon.addEventListener("click", () => createTodoEditContentElement(projectIndex, todo.getAttribute("todo")));
  todo.setAttribute("todo", `${todoIndex}`);
  todo.setAttribute("project", `${projectIndex}`);
  todos.appendChild(todo);
}

function pageLoadSaveTodo(projectIndex, todoIndex, todo) {
  let title = todo.title;
  let description = todo.description;
  let dueDate = todo.dueDate;
  let priority = todo.priority;
  let checklist = todo.checklists;

  projects[projectIndex].todos[todoIndex].title = title;
  projects[projectIndex].todos[todoIndex].description = description;
  projects[projectIndex].todos[todoIndex].dueDate = dueDate;
  projects[projectIndex].todos[todoIndex].priority = priority;
  checklist.forEach((item, index) => {
    let checklistTitle = item.title;
    let checklistStatus = item.status;
    saveChecklist(projectIndex, todoIndex, checklistTitle);
    projects[projectIndex].todos[todoIndex].checklists[index].status = checklistStatus;
  })

  changeTodoTitleDom(title, projectIndex, todoIndex);
}

function changeActiveElement(navigationElement) {
  removeActiveElement();
  const svg = navigationElement.children[0];
  const title = navigationElement.children[1];
  console.log(svg);
  console.log(title);
  svg.classList.add("active-element");
  title.classList.add("active-element");
}

function removeActiveElement() {
  const navigationElements = document.querySelectorAll(".navigation-item");

  navigationElements.forEach(element => {
    element.children[0].classList.remove("active-element");
    element.children[1].classList.remove("active-element");
  })
}
