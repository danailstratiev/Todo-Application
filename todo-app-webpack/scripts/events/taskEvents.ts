//---Tasks Management---
import { Listener } from '../models';
import {render} from "./events";
import tasksPage from "../views/tasks/tasksPage";
import todoListsPage from "../views/todolists/todoListPage";
import todoListEditPage from "../views/todolists/todoListEditPage";
import shareListUsersPage from "../views/todolists/shareListUsersPage";
import AuthenticationService from "../services";
import TaskRepository from "../repositories/taskRepo";
import {todoListsLink_Click} from "../events/todoListEvents";
import taskCreatePage from "../views/tasks/taskCreatePage";
import taskEditPage from "../views/tasks/taskEditPage";
import taskViewPage from "../views/tasks/taskViewPage";
import assignTaskPage from "../views/tasks/assignTaskPage";
import taskAssigneesPage from "../views/tasks/taskAssigneesPage";
import UsersRepository from "../repositories/userRepo";
import ToDoList from "../entities/todoList";
import Task from "../entities/task";


function renderTask(renderData: {template: string, listeners: Listener[]}, listId:string): void {
    const contentDiv = document.getElementById('content') as HTMLElement;
    contentDiv.innerHTML = renderData.template;
    (document.getElementById('taskListId') as HTMLInputElement).value = listId

    if (renderData && renderData.listeners && renderData.listeners.length) {
      for (const listener of renderData.listeners) {
        const target = document.getElementById(listener.targetId);
        target.addEventListener(listener.eventType, listener.callback);
      }
    }    
  }

export function taskCreateLink_Click() {
    const listId = (document.getElementById('taskListid') as HTMLInputElement).value;
    
    renderTask(taskCreatePage(), listId);
}


export async function taskCreateForm_Submit() {
    const loggedUser =  AuthenticationService.getLoggedUser();
    let listId =( document.getElementById('taskListId') as HTMLInputElement).value;

    let title = (document.getElementById('taskTitle') as HTMLInputElement).value;
    let description = (document.getElementById('taskDescription') as HTMLInputElement).value;
    let isComplete = (document.getElementById('toggler') as HTMLInputElement).checked ? true : false;
    
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    if (title === '') {
        document.getElementById('task-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }

    let creatorId = loggedUser.id;
    let lastModifierId = loggedUser.id;
    let updateDate = dateToday;
    let id = ''
    let task = new Task(id, title, description, listId, isComplete, creatorId, lastModifierId, dateToday, updateDate);

    
    await TaskRepository.addTask(task);

    todoListsLink_Click();
}

export async function tasksViewButton_Click(listId) {
    render(tasksPage());
    (document.getElementById('taskListid') as HTMLInputElement).value = listId;
    
    let taskElements = document.getElementsByClassName('task-elements')[0];
    
    const items = await TaskRepository.getAllTasksInAList(listId);
    
   
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('tr');

        const titleLi = document.createElement('td');
        titleLi.innerHTML = currentItem.title;

        const completionLi = document.createElement('td');
        completionLi.innerHTML = currentItem.isComplete;

        const creationDateLi = document.createElement('td');
        creationDateLi.innerHTML = currentItem.createDate.substring(0, 10);

        const dateOfLastChangeLi = document.createElement('td');
        dateOfLastChangeLi.innerHTML = currentItem.updateDate.substring(0, 10);

        
        const viewTd = document.createElement('td');
        const viewButton = document.createElement('BUTTON');
        viewTd.classList.add('viewButton');
       
        viewButton.textContent = 'View'
        viewButton.addEventListener('click', () => taskViewButton_Click(listId ,currentItem.id));
        viewTd.appendChild(viewButton);

        const assignLi = document.createElement('td');
        const assignButton = document.createElement('BUTTON');
        assignButton.innerHTML = 'ASSIGN';
        assignButton.addEventListener('click', () => taskAssignButton_Click(listId, currentItem.id));
        assignLi.appendChild(assignButton);

        const editLi = document.createElement('td');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => taskEditButton_Click(listId, currentItem.id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('td');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => taskDeleteButton_Click(listId, currentItem.id));
        deleteLi.appendChild(deleteButton);

        deleteLi.classList.add('delete-hint');
        let deleteHoverText = document.createElement('span');
        deleteHoverText.classList.add('hint-text');
        deleteHoverText.innerHTML = 'Are you sure?';
        deleteLi.appendChild(deleteHoverText);

        ul.appendChild(viewTd);
        ul.appendChild(titleLi);
        ul.appendChild(completionLi);
        ul.appendChild(creationDateLi);
        ul.appendChild(dateOfLastChangeLi);
        ul.appendChild(assignLi);
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        taskElements.appendChild(ul);
    }

    const loggedUser =  AuthenticationService.getLoggedUser();

}

async function taskViewButton_Click(listId ,id){

    render(taskViewPage())

    const currentTask = await TaskRepository.getTaskById(listId, id);
    
    
    let titleModalLi = document.getElementById('titleModal');
    titleModalLi.textContent = currentTask.title;
    let creatorModalLi = document.getElementById('taskCreatorModal');
    creatorModalLi.textContent = currentTask.creatorId;
    let modifierModal = document.getElementById('taskModifierModal');
    modifierModal.textContent = currentTask.updaterId;
    let isCompleteModal = document.getElementById('taskIsCompleteModal');
    isCompleteModal.textContent = currentTask.isComplete;
    let creationDateModal = document.getElementById('creationTaskModal');
    creationDateModal.textContent = currentTask.createDate.substring(0, 10);
  
    let descriptionModal = document.getElementById('descriptionModal');
    descriptionModal.textContent = currentTask.description;
    
    let assigneesButton = document.getElementById('assignees');
    assigneesButton.addEventListener('click',() => viewTaskAssignees(listId, id));
}


async function taskDeleteButton_Click(listId, id) {

    await TaskRepository.deleteTask(listId, id);
    todoListsLink_Click();
}



async function taskEditButton_Click(listId,taskId) {
    render(taskEditPage());    
    
    let task = await TaskRepository.getTaskById(listId,taskId);
    

    (document.getElementById('editTaskId') as HTMLInputElement).value = taskId;
    (document.getElementById('editTaskListId') as HTMLInputElement).value = listId;
    (document.getElementById('taskEditTitle') as HTMLInputElement).value = task.title;
    (document.getElementById('taskEditDescription') as HTMLInputElement).textContent = task.description;
}

export async function taskEditForm_Submit() {
    const taskId = (document.getElementById('editTaskId') as HTMLInputElement).value
    const listId = (document.getElementById('editTaskListId') as HTMLInputElement).value
    const title = (document.getElementById('taskEditTitle') as HTMLInputElement).value;
    const description = (document.getElementById('taskEditDescription') as HTMLInputElement).value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    const isComplete = (document.getElementById('edit-toggler') as HTMLInputElement).checked ? true : false;

    const loggedUser =  AuthenticationService.getLoggedUser();

    if (title === '') {
        document.getElementById('taskedit-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }

    let task = await TaskRepository.getTaskById(listId,taskId);


    // ---ListId can be checked---
    task.listId = listId;
    task.title = title;
    task.description = description;
    task.isComplete = isComplete;
    task.updateDate = dateToday;
    task.updaterId = loggedUser.id;

    
    if (task.id === null || undefined) {
        throw new Error('Id can not be null or undefined!')
    }

    await TaskRepository.updateTask(task, taskId);

    todoListsLink_Click();
}

async function taskAssignButton_Click(listId, taskId){
    
    render(assignTaskPage());

    let usersToShareDiv = document.getElementsByClassName('assignedUsers')[0];
    let usersToShare = await UsersRepository.getAll();
    

    for (let i = 0; i < usersToShare.length; i++) {
        const currentUser = usersToShare[i];
        
        const ul = document.createElement('tr');

        const usernameLi = document.createElement('td');
        usernameLi.textContent = currentUser.username;

        const firstNameLi = document.createElement('td');
        firstNameLi.textContent = currentUser.firstName;

        const lastNameLi = document.createElement('td');
        lastNameLi.textContent = currentUser.lastName;

        const isAdminTd = document.createElement('td');
        isAdminTd.textContent = currentUser.isAdmin;

        const shareLi = document.createElement('td');
        const shareButton = document.createElement('BUTTON');
        //shareLi.classList.add = 'assign-button';
        shareButton.textContent = 'Assign';
        shareButton.addEventListener('click', () => taskAssignClick_Button(listId, taskId,currentUser.id));
        shareLi.appendChild(shareButton);

        ul.appendChild(usernameLi);
        ul.appendChild(firstNameLi);
        ul.appendChild(lastNameLi);
        ul.appendChild(isAdminTd);
        ul.appendChild(shareLi);

        usersToShareDiv.appendChild(ul);
    }    
}

async function taskAssignClick_Button(listId, taskId, userId) {
    
    await TaskRepository.assignTaskToUser(userId, listId, taskId);
}

async function viewTaskAssignees(listId, taskId) {
    
    render(taskAssigneesPage());

    let usersToShareDiv = document.getElementsByClassName('task-assignees')[0];
    let taskAssignees = await TaskRepository.getTaskAssignees(listId, taskId);
    

    for (let i = 0; i < taskAssignees.length; i++) {
        const currentUser = taskAssignees[i];
        
        const ul = document.createElement('tr');

        const usernameLi = document.createElement('td');
        usernameLi.textContent = currentUser.username;

        const firstNameLi = document.createElement('td');
        firstNameLi.textContent = currentUser.firstName;

        const lastNameLi = document.createElement('td');
        lastNameLi.textContent = currentUser.lastName;

        const isAdminTd = document.createElement('td');
        isAdminTd.textContent = currentUser.isAdmin;

        ul.appendChild(usernameLi);
        ul.appendChild(firstNameLi);
        ul.appendChild(lastNameLi);
        ul.appendChild(isAdminTd);

        usersToShareDiv.appendChild(ul);
    }    
}


