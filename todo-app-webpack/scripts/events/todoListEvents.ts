//---ToDoLists functionality---
import {render} from "./events";
import todoListCreatePage from "../views/todolists/todoListCreatePage";
import todoListsPage from "../views/todolists/todoListPage";
import todoListEditPage from "../views/todolists/todoListEditPage";
import shareListUsersPage from "../views/todolists/shareListUsersPage";
import AuthenticationService from "../services";
import ToDoListRepository from "../repositories/todoListRepo";
import UsersRepository from "../repositories/userRepo";
//import TaskRepository from "../repositories/taskRepo";

import ToDoList from "../entities/todoList";
import {tasksViewButton_Click} from "../events/taskEvents";

export function todoListCreateLink_Click() {
    render(todoListCreatePage());
}

export async function todoListCreateForm_Submit() {
    const loggedUser =  AuthenticationService.getLoggedUser();
    

    const title = (document.getElementById('title') as HTMLInputElement).value;

    if (title === '') {
        document.getElementById('todolist-title-error').textContent = 'Title can not be empty';
        throw new Error('Title can not be empty');
    }

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    let creatorId = loggedUser.id;
    let updaterId = loggedUser.id;
    let updateDate = dateToday;

    const todoList = new ToDoList('',title,dateToday, creatorId, updaterId, updateDate );

    const newToDoList = await ToDoListRepository.addToDoList(todoList);

    todoListsLink_Click();
}

export async function todoListsLink_Click(){
    
    render(todoListsPage());
    
    let todoListElements = document.getElementsByClassName('todoList-elements')[0];
    
    const allItems = await ToDoListRepository.getAllToDoLists();
    

    const items = allItems;
    if (items == null)
        return;
    
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('tr');

        const creatorTd = document.createElement('td');
        creatorTd.innerHTML = currentItem.creatorId;

        const titleLi = document.createElement('td');
        titleLi.innerHTML = currentItem.title;

        const creationDateLi = document.createElement('td');
        creationDateLi.innerHTML = currentItem.createDate.substring(0, 10);

        const dateOfLastChangeLi = document.createElement('td');
        dateOfLastChangeLi.innerHTML = currentItem.updateDate.substring(0, 10);


        const shareLi = document.createElement('td');
        const shareButton = document.createElement('BUTTON');
        shareButton.innerHTML = 'Share';
        shareButton.addEventListener('click', () => shareListButton_Click(currentItem.id));
        shareLi.appendChild(shareButton);


        const tasksLi = document.createElement('td');
        const tasksButton = document.createElement('BUTTON');
        tasksButton.innerHTML = 'Tasks';
        tasksButton.addEventListener('click', () => tasksViewButton_Click(currentItem.id));
        tasksLi.appendChild(tasksButton);

        const editLi = document.createElement('td');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => todoListEditButton_Click(currentItem.id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('td');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => todoListDeleteButton_Click(currentItem.id));
        deleteLi.appendChild(deleteButton);

        deleteLi.classList.add('delete-hint');
        let deleteHoverText = document.createElement('span');
        deleteHoverText.classList.add('hint-text');
        deleteHoverText.innerHTML = 'Are you sure?';
        deleteLi.appendChild(deleteHoverText);

        ul.appendChild(creatorTd);
        ul.appendChild(titleLi);
        ul.appendChild(creationDateLi);
        ul.appendChild(dateOfLastChangeLi);
        ul.appendChild(shareLi);
        ul.appendChild(tasksLi);
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        todoListElements.appendChild(ul);
    }

}

async function todoListDeleteButton_Click(id) {

    await ToDoListRepository.deleteToDoList(id);
    await todoListsLink_Click();
} 

export async function todoListEditForm_Submit() {
    const id = (document.getElementById('listId') as HTMLInputElement).value;
    const creatorId = (document.getElementById('listCreatorId') as HTMLInputElement).value;
    const creationDate = (document.getElementById('listCreationDate') as HTMLInputElement).value;
    const title = (document.getElementById('titleEdit') as HTMLInputElement).value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    const loggedUser =  AuthenticationService.getLoggedUser();
    
    if (title === '') {
        document.getElementById('todotitle-edit-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!');
    }

    let item = await ToDoListRepository.getToDoListById(id);
    
    item.title = title;
    item.updateDate = dateToday;
    item.updaterId = loggedUser.id;
    
    await ToDoListRepository.updateToDoList(item, id);
    
    await todoListsLink_Click();
}

async function todoListEditButton_Click(id) {
    render(todoListEditPage());    

    const item = await ToDoListRepository.getToDoListById(id);
    
    (document.getElementById('listId') as HTMLInputElement).value = item.id;
    (document.getElementById('titleEdit') as HTMLInputElement).value = item.title;
}

// ------ShareList Management------

//Here we visualize other users to share our list with 
async function shareListButton_Click(listId) {
    render(shareListUsersPage());
    
    let usersToShareDiv = document.getElementsByClassName('usersToShare')[0];
    let usersToShare = await UsersRepository.getAll();
    
    for (let i = 0; i < usersToShare.length; i++) {
        const currentUser = usersToShare[i];
        
        const ul = document.createElement('tr');

        const usernameLi = document.createElement('td');
        usernameLi.innerHTML = currentUser.username;

        const firstNameLi = document.createElement('td');
        firstNameLi.innerHTML = currentUser.firstName;

        const lastNameLi = document.createElement('td');
        lastNameLi.innerHTML = currentUser.lastName;


        const shareLi = document.createElement('td');
        const shareButton = document.createElement('BUTTON');
        shareButton.innerHTML = 'Share';
        shareButton.addEventListener('click', () => userShareListButton_Click(currentUser.id, listId));
        shareLi.appendChild(shareButton);

        ul.appendChild(usernameLi);
        ul.appendChild(firstNameLi);
        ul.appendChild(lastNameLi);
        ul.appendChild(shareLi);

        usersToShareDiv.appendChild(ul);
    }    
}

async function userShareListButton_Click(userId, listId) {
    
    await ToDoListRepository.shareToDoList(listId, userId);
}

