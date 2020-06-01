import AuthenticationService from '../services/authenticationService';
import { Listener, LoggedUser } from './types';
import homePage from '../views/pages/homePage';
import login from '../views/pages/login';
import { loadUsers } from '../controllers/usersController';
import { loadTodoLists } from '../controllers/todoListController';
import ToDoListService from '../services/todoListService';
import ToDoList from '../models/todoList';
import {editTodoList, todoListDeleteButton_Click} from '../controllers/todoListController';

export function renderView(renderData: {template: string, listeners: Listener[]}): void {
      const contentDiv = document.getElementById('content') as HTMLElement;
      contentDiv.innerHTML = renderData.template;
    
      if (renderData && renderData.listeners && renderData.listeners.length) {
        for (const listener of renderData.listeners) {
          const target = document.getElementById(listener.targetId);
          target.addEventListener(listener.eventType, listener.callback);
        }
    }    
}


export async function renderTask(renderData: {template: string, listeners: Listener[]}, listId:string): Promise<void> {
  const contentDiv = document.getElementById('content') as HTMLElement;
  contentDiv.innerHTML = renderData.template;
  let wrapper = document.getElementsByClassName('task-wrapper')[0];

  const list:ToDoList = await ToDoListService.getToDoListById(listId);
  let row: HTMLElement = document.createElement('section');
  row.classList.add('task-manager');
  row.innerHTML = `
  <section class="list-properties"> 
  <header class="list-manager">
  <h2 id="todo-title">${list.title}</h2>
  <section class="list-buttons">
      <button class="todo-edit-button" id="list-editor"></button>
      <button class="todo-delete-button" id="list-deleter"></button>
  </section>
  </header>
  <section class="list-dates">
  <p>Date Of Creation: ${list.createDate.substring(0,10)}</p>
  <p>Date Of last edit: ${list.updateDate.substring(0,10)}</p>
  </section>
  </section>
  `
  row.querySelector('.todo-edit-button')
    .addEventListener('click', () => editTodoList(listId));
    row.querySelector('.todo-delete-button')
    .addEventListener('click', () => todoListDeleteButton_Click(listId));
  
    
  wrapper.appendChild(row);
  let taskLoader = document.getElementsByClassName('task-viewer')[0];
  taskLoader.id = "task-visualizer";
  taskLoader.innerHTML = `
  <section class="task-viewer-nav">
  <p>
      <a id="allTasks"><i class="fas fa-plus"></i></a>                        
  </p>
  </section>`
  wrapper.appendChild(taskLoader);

  if (renderData && renderData.listeners && renderData.listeners.length) {
    for (const listener of renderData.listeners) {
      const target = document.getElementById(listener.targetId);
      target.addEventListener(listener.eventType, listener.callback);
    }
  }    
}

export function handleMenu(): void {
  const loggedUser = AuthenticationService.getLoggedUser();

  // cast to HTMLelement in case of null
  const homeLink = (document.getElementById('homeLink') as HTMLElement);
  homeLink.addEventListener('click', clickHomeLink);

  const loginLink = (document.getElementById('loginLink') as HTMLElement);
  loginLink.addEventListener('click', clickLoginLink);

  const usersLink = (document.getElementById('usersLink') as HTMLElement);
  usersLink.addEventListener('click', loadUsers);

   const todoListLink = (document.getElementById('todoListLink') as HTMLElement);
   todoListLink.addEventListener('click', loadTodoLists);

   const logoutLink = (document.getElementById('logoutLink') as HTMLElement);
   logoutLink.addEventListener('click', clickLogoutLink);

  if (loggedUser === null) {
    loginLink.style.display = '';
    usersLink.style.display = 'none';
    todoListLink.style.display = 'none';
    logoutLink.style.display = 'none';
  } else {
    loginLink.style.display = 'none';
    usersLink.style.display = loggedUser.isAdmin ? '' : 'none';
    todoListLink.style.display = '';
    logoutLink.style.display = '';
  }
}

export function clickLoginLink() {
      renderView(login());
    }
  
export function clickHomeLink() {
      renderView(homePage());
}

  export function clickLogoutLink() {
    AuthenticationService.logout();
    handleMenu();
    renderView(homePage());
  }



export function render(selector, renderData: { template: string, listeners: Listener[] }): void {
  const container: HTMLElement = (document.querySelector(selector) as HTMLElement);
  container.innerHTML = renderData.template;

  if (renderData && renderData.listeners && renderData.listeners.length) {
    for (const listener of renderData.listeners) {
      const target: HTMLElement = (document.getElementById(listener.targetId) as HTMLElement);
      target.addEventListener(listener.eventType, listener.callback);
    }
  }
}

/**
 * Based on logged user handles if the navigation should be rendered or not
 */
export function handleNavigation(): void {
  const loggedUser: LoggedUser = AuthenticationService.getLoggedUser();

  if (loggedUser) {
    //render('.nav-container', navigation());
    renderView(homePage());
  } else {
    //render('.nav-container', { template: '', listeners: [] });
  }
}

/**
 * By given response return either parsed `response.json` or throws an error
 */
export async function handleResponse(response: Response) {
  if (response && response.ok) {
    return await response.json();
  } else {
    return new Error(`Failed with status code ${response.status}`);
  }
}
