// //---ToDoLists functionality---

import ToDoList from "../models/todoList";
// import {tasksViewButton_Click} from "../events/taskEvents";
import UserService from "../services/userService";
import UsersService from '../services/userService';
import ToDoListService from '../services/todoListService';
import todoLists from '../views/pages/todoLists';
import createToDoList from '../views/components/lists/createToDoList';
import AuthenticationService from '../services/authenticationService';
import editToDoList from '../views/components/lists/editToDoList';
import { renderTask, renderView } from '../utilities/helpers';
import tasks from '../views/pages/tasks';
import shareListUsers from '../views/pages/shareListUsers';
import User from "../models/user";

export async function loadTodoLists(): Promise<void> {
    renderView(todoLists())
    const todoListsTable: HTMLElement = document.getElementById('lists-view') as HTMLElement;
    const items: Array<ToDoList> = await ToDoListService.getAllToDoLists();
  
    if (!items) {
      return;
    }
  
    for (const currentItem of items) {
        todoListsTable.appendChild(addTodoListRow(currentItem));
    }
}


function addTodoListRow(currentItem: ToDoList): HTMLElement {
    const { id, title, createDate, updateDate} = currentItem;
    const row: HTMLElement = document.createElement('tr');
  
    row.innerHTML = `
        <td class="titleTd" id="titLe">${title}</td>
        <td class="dateTd">${createDate.substring(0,10)}</td>
        <td class="dateTd">${updateDate.substring(0,10)}</td>
        <td class="shareListTd"><i class="far fa-share-square"></i></td>
        <td class="todo-tasks-button" ></td>
        <td class="todo-edit-button" ></td>
        <td class="todo-delete-button" id="deleteList"></td>
    `;

    row.querySelector('.shareListTd')
    .addEventListener('click', () => loadUsersToShare(id));
    row.querySelector('.todo-tasks-button')
    .addEventListener('click', () => renderTask(tasks(id), id));
    row.querySelector('.todo-edit-button')
    .addEventListener('click', () => editTodoList(id));
    row.querySelector('.todo-delete-button')
    .addEventListener('click', () => todoListDeleteButton_Click(id));
  
    return row;
}

export function createNewList():void {
    renderView(createToDoList());
}

export async function submitCreateToDoListForm() : Promise<void> {
    const loggedUser =  AuthenticationService.getLoggedUser();
    
    const title = (document.getElementById('list-title') as HTMLInputElement).value;

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    let creatorId = loggedUser.id;
    let updaterId = loggedUser.id;
    let updateDate = dateToday;

    const todoList = new ToDoList('',title,dateToday, creatorId, updaterId, updateDate );
    await ToDoListService.addToDoList(todoList);
    await loadTodoLists();
}


export async function todoListDeleteButton_Click(id) {

    await ToDoListService.deleteToDoList(id);
    await loadTodoLists();
} 

export async function editTodoList(id) :Promise<void> {
    renderView(editToDoList());
    const list = await ToDoListService.getToDoListById(id);
    
    (document.getElementById('list-id') as HTMLInputElement).value = list.id;
    (document.getElementById('titleEdit') as HTMLInputElement).value = list.title;
}

export async function submitEditToDoListForm() : Promise<void> {
    const loggedUser =  AuthenticationService.getLoggedUser();
    const id = (document.getElementById('list-id') as HTMLInputElement).value
    const title = (document.getElementById('titleEdit') as HTMLInputElement).value;

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    let updaterId = loggedUser.id;
    let updateDate = dateToday;

    let todoList = new ToDoList(id, title, dateToday, updaterId, updaterId,updateDate);
    
    await ToDoListService.updateToDoList(todoList, id);
    await loadTodoLists();
}


export async function loadUsersToShare(listId:string): Promise<void> {
    renderView(shareListUsers());

    const shareListsTable: HTMLElement = document.getElementById('shareUsers') as HTMLElement;
    const items: Array<User> = await UserService.getAll();
    
    if (!items) {
      return;
    }
  
    for (const currentItem of items) {
        shareListsTable.appendChild(addShareListRow(currentItem, listId));
    }
}

function  addShareListRow(currentItem: User, listId:string): HTMLElement {
    const { id, username, firstName, lastName} = currentItem;
    const row: HTMLElement = document.createElement('tr');
  
    row.innerHTML = `
        <td class="usernameTd" id="titLe">${username}</td>
        <td class="firstNameTd">${firstName}</td>
        <td class="lastNameTd">${lastName}</td>
        <td class="shareListTd"><i class="far fa-share-square"></i></td>        
    `;

    row.querySelector('.shareListTd')
    .addEventListener('click', () => userShareListButton_Click(id, listId));   
  
    return row;
}

async function userShareListButton_Click(userId, listId) {
    
    await ToDoListService.shareToDoList(listId, userId);
}