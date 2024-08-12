import { renderTodayContent } from "./modules/content/today-render-content";
import { renderUpcomingContent } from "./modules/content/upcoming-render-content";
import { renderPriorityContent } from "./modules/content/priority-render-content";

const todayNavigation = document.querySelector(".today");
todayNavigation.addEventListener("click", () => renderTodayContent());

const upcomingNavigation = document.querySelector(".upcoming");
upcomingNavigation.addEventListener("click", () => renderUpcomingContent());

const highPriorityNavigation = document.querySelector(".high-priority");
highPriorityNavigation.addEventListener("click", () => renderPriorityContent("high"));

const mediumPriorityNavigation = document.querySelector(".medium-priority");
mediumPriorityNavigation.addEventListener("click", () => renderPriorityContent("medium"));

const lowPriorityNavigation = document.querySelector(".low-priority");
lowPriorityNavigation.addEventListener("click", () => renderPriorityContent("low"));