// //---Tasks Management---

import Task from "../models/task";
import TaskService from "../services/taskService";
import { renderTask, renderView } from '../utilities/helpers';
import tasks from '../views/pages/tasks';
import AuthenticationService from "../services/authenticationService";
import assignTask from '../views/pages/assignTask';
import UserService from '../services/userService';
import User from '../models/user';

export async function loadTasks(listId:string): Promise<void>{
    //renderView(tasks(listId));

    const allTasks: HTMLElement = document.getElementById('task-visualizer') as HTMLElement;
    const items: Array<Task> = await TaskService.getAllTasksInAList(listId);
    
    if (items.length > 0) {
      for (const currentItem of items) {
        allTasks.appendChild(addTaskRow(currentItem));
        }
        let taskLoader: HTMLElement = document.getElementById('allTasks') as HTMLElement;
        taskLoader.innerHTML = '<i class="fas fa-minus"></i>';
    }    
}

export function unloadTasks(){
    let allTasks: HTMLElement = document.getElementById('task-visualizer') as HTMLElement;

    let items = allTasks.children;

    while (items.length > 1) {
        allTasks.removeChild(items[items.length-1]);
    }
    let taskLoader: HTMLElement = document.getElementById('allTasks') as HTMLElement;
    taskLoader.innerHTML = '<i class="fas fa-plus"></i>';
} 

export async function taskLoader(listId:string) {
    let taskLoader: HTMLElement = document.getElementById('allTasks') as HTMLElement;

    if (taskLoader.innerHTML === '<i class="fas fa-plus"></i>') {
        await loadTasks(listId);
    }else{
        unloadTasks();
    }
}

function addTaskRow(currentItem: Task): HTMLElement {
    const { id, title, description, taskListId, isComplete, creatorId, updatorId, createDate, updateDate} = currentItem;
    const row: HTMLElement = document.createElement('section');
    row.classList.add('task-selector');

    row.innerHTML = `
    <section class="task-props">
        <div>
        <input type="checkbox" class="taskFilter" id="taskChecker">
        </div>
        <h4>${title}</h4>
        <div class="delete-task">
        <button class="delete-task-btn" id="delete-task-btn"></button>
        </div>
    </section>
    <p>${description}</p>
    <section class="task-props">
        <div>
        <button class="assigner"><i class="far fa-share-square"></i></button>
        </div>
        <h4>Assign</h4>        
    </section>
    `;

    row.querySelector('.assigner')
    .addEventListener('click', () => loadUsersToAssign(taskListId, id));
    row.querySelector('.delete-task-btn')
    .addEventListener('click', () => deleteTask(currentItem));
    row.querySelector('.taskFilter')
    .addEventListener('click', () => formManager(taskListId, id));
    return row;
}

export async function createNewTask(listId){
    event.preventDefault();
    const loggedUser =  AuthenticationService.getLoggedUser();
    let taskId = (document.getElementById('taskId') as HTMLInputElement).value;
    const title = (document.getElementById('taskTitle') as HTMLInputElement).value;
    const description = (document.getElementById('taskDescrpition') as HTMLInputElement).value;
    let isComplete = (document.getElementById('myCheck') as HTMLInputElement).checked ? true : false;
    
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    let updaterId = loggedUser.id;
    let updateDate = dateToday;

    if (taskId === '') {
        let task:Task = new Task(taskId, title, description, listId, isComplete, updaterId, updaterId, dateToday, updateDate);
        await TaskService.createNewTask(task);
    }else {
        let selectedTask:Task = await TaskService.getTaskById(listId, taskId);
        selectedTask.title = title;
        selectedTask.description = description;
        selectedTask.isComplete = isComplete;
        selectedTask.updatorId = updaterId;
        selectedTask.updateDate = updateDate;
        
        await TaskService.updateTask(selectedTask, taskId);
    }
    
    clearTaskForm();
    await taskLoader(listId);
}

async function formManager (listId:string, taskId:string): Promise<void>{
    
    let taskChecker = (document.getElementById('taskChecker') as HTMLInputElement).checked ? true : false;

    if (taskChecker) {
        await fillTaskForm(listId, taskId);
    }else{
        clearTaskForm();
    }
}

export async function fillTaskForm(listId:string, taskId:string): Promise<void>{
    
    const selectedTask:Task = await TaskService.getTaskById(listId, taskId);
    (document.getElementById('taskId') as HTMLInputElement).value = taskId;
    (document.getElementById('taskTitle') as HTMLInputElement).value = selectedTask.title;
    (document.getElementById('taskDescrpition') as HTMLInputElement).value = selectedTask.description;
    (document.getElementById('myCheck') as HTMLInputElement).checked = selectedTask.isComplete;
}

function clearTaskForm(){
    (document.getElementById('taskId') as HTMLInputElement).value = '';
    (document.getElementById('taskTitle') as HTMLInputElement).value = '';
    (document.getElementById('taskDescrpition') as HTMLInputElement).value = '';
}

export async function deleteTask(task:Task): Promise<void>{
    let listId = task.taskListId;
    
    await TaskService.deleteTask(task.taskListId,task.id);

    await taskLoader(listId);
}

export async function loadUsersToAssign(listId:string, taskId:string): Promise<void> {
    renderView(assignTask());

    const assignTaskTable: HTMLElement = document.getElementById('assignUsers') as HTMLElement;
    const items: Array<User> = await UserService.getAll();
    
    if (!items) {
      return;
    }
  
    for (const currentItem of items) {
        assignTaskTable.appendChild(addAssignmentRow(currentItem, listId, taskId));
    }
}

function  addAssignmentRow(currentItem: User, listId:string, taskId:string): HTMLElement {
    const { id, username, firstName, lastName} = currentItem;
    const row: HTMLElement = document.createElement('tr');
  
    row.innerHTML = `
        <td class="usernameTd" id="titLe">${username}</td>
        <td class="firstNameTd">${firstName}</td>
        <td class="lastNameTd">${lastName}</td>
        <td class="shareListTd"><i class="far fa-share-square"></i></td>        
    `;

    row.querySelector('.shareListTd')
    .addEventListener('click', () => taskAssignClick_Button(id, listId, taskId));   
  
    return row;
}


 async function taskAssignClick_Button(listId, taskId, userId) {
     
    await TaskService.assignTaskToUser(userId, listId, taskId);
}