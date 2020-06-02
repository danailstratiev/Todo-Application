import { Listener } from '../models';
import UsersRepository from '../repositories/userRepo';
import AuthenticationService from '../services';
import homePage from '../views/homePage';
import loginPage from '../views/loginPage';
import usersPage from '../views/users/usersPage';
import usersEditPage from '../views/users/usersEditPage';
import usersCreatePage from '../views/users/usersCreatePage';
import {todoListsLink_Click} from './todoListEvents';

import User from '../entities/user'

  export function render(renderData: {template: string, listeners: Listener[]}): void {
    const contentDiv = document.getElementById('content') as HTMLElement;
    contentDiv.innerHTML = renderData.template;
  
    if (renderData && renderData.listeners && renderData.listeners.length) {
      for (const listener of renderData.listeners) {
        const target = document.getElementById(listener.targetId);
        target.addEventListener(listener.eventType, listener.callback);
      }
    }    
  }

  export async function submitLoginForm() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
  
    try {
       AuthenticationService.authenticate(username, password);
      const loggedUser = AuthenticationService.getLoggedUser();
  
      if (!loggedUser) {
        (document.getElementById('error') as HTMLElement).innerHTML = 'User doesn\'t exist';
      } else {
        render(homePage());
        handleMenu();
      }
    } catch (error) {
      console.log('Error:' + error);
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
    usersLink.addEventListener('click', usersLink_Click);
  
     const todoListLink = (document.getElementById('todoListLink') as HTMLElement);
     todoListLink.addEventListener('click', todoListsLink_Click);
  
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

  export function clickHomeLink() {
    render(homePage());
  }
  
  export function clickLoginLink() {
    render(loginPage());
  }

  export function clickLogoutLink() {
    AuthenticationService.logout();
    handleMenu();
    render(homePage());
  }
  

async function usersLink_Click() {

    render(usersPage());
    const usersTable = document.getElementsByClassName('users-management')[0];

    const items = await UsersRepository.getAll();
    
    if (items == null)
        return;
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const tr = document.createElement('tr');

        const viewTd = document.createElement('td');
        const viewButton = document.createElement('BUTTON');
        viewTd.classList.add('viewButton');
        
        
        viewButton.textContent = 'View'
        viewButton.addEventListener('click', () => userViewButton_Click(currentItem.id));
        viewTd.appendChild(viewButton);


        const usernameTd = document.createElement('td');
        usernameTd.innerHTML = currentItem.username;

        const passwordTd = document.createElement('td');
        passwordTd.innerHTML = currentItem.password;

        const firstNameTd = document.createElement('td');
        firstNameTd.innerHTML = currentItem.firstName;

        const lastNameTd = document.createElement('td');
        lastNameTd.innerHTML = currentItem.lastName;

        const isAdminTd = document.createElement('td');
        isAdminTd.innerHTML = currentItem.isAdmin;

        const editTd = document.createElement('td');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => usersEditButton_Click(currentItem.id));
        editTd.appendChild(editButton);

        const deleteTd = document.createElement('td');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => usersDeleteButton_Click(currentItem.id));
        deleteTd.classList.add('delete-hint');
        let deleteHoverText = document.createElement('span');
        deleteHoverText.classList.add('hint-text');
        deleteHoverText.innerHTML = 'Are you sure?';
        deleteTd.appendChild(deleteButton);
        deleteTd.appendChild(deleteHoverText);

        tr.appendChild(viewTd);
        tr.appendChild(usernameTd);
        tr.appendChild(passwordTd);
        tr.appendChild(firstNameTd);
        tr.appendChild(lastNameTd);
        tr.appendChild(isAdminTd);
        tr.appendChild(editTd);
        tr.appendChild(deleteTd);

        usersTable.appendChild(tr);
    }
}

export function createNewUser() {
    render(usersEditPage());
  }

export async function usersEditButton_Click(id:string) {

    usersEditLink_Click();
    const item = await UsersRepository.getById(id);

    (document.getElementById('id') as HTMLInputElement).value = item.id;
    (document.getElementById('username')as HTMLInputElement).value = item.username;
    (document.getElementById('password')as HTMLInputElement).value = item.password;
    (document.getElementById('firstName')as HTMLInputElement).value = item.firstName;
    (document.getElementById('lastName')as HTMLInputElement).value = item.lastName;
    (document.getElementById('dateOfCreation')as HTMLInputElement).value = item.createDate;
    (document.getElementById('userCreatorId')as HTMLInputElement).value = item.creatorId;
}

export async function usersEditForm_Submit() {
    const id = (document.getElementById('id') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const isAdmin = (document.getElementById('user-edit-toggler')as HTMLInputElement).checked ? true : false;

  
    const item = await UsersRepository.getById(id);
    
    item.username = username;
    item.password = password;
    item.firstName = firstName;
    item.lastName = lastName;
    item.id = +id;
    item.isAdmin = isAdmin;

    let loggedUser =  AuthenticationService.getLoggedUser();

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    item.updateDate = dateToday;
    item.updaterId = loggedUser.id;

    
    await UsersRepository.updateUser(item, id);

    await usersLink_Click();
}

export async function usersCreateForm_Submit() {
    
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    let isAdmin = (document.getElementById('user-create-toggler') as HTMLInputElement).checked ? true : false;


    let loggedUser =  AuthenticationService.getLoggedUser();

    const user = new User(username, password, firstName, lastName, isAdmin, loggedUser.id);
    

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    user.createDate = dateToday;
    user.updateDate = dateToday;
    user.updaterId = loggedUser.id;
    
    await UsersRepository.createNewUser(user);

    await usersLink_Click();
}

export async function usersDeleteButton_Click(id: string) {

    await UsersRepository.deleteUser(id);
    await usersLink_Click();
}

export function usersEditLink_Click() {
     render(usersEditPage());
    
}

export function usersCreateLink_Click() {
     render(usersCreatePage());
}

async function userViewButton_Click(id){
    const currentUser = await UsersRepository.getById(id);

// Get the button that opens the modal
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    let usernameModalLi = document.getElementById('usernameModal');
    usernameModalLi.textContent = currentUser.username;
    let firstnameModal = document.getElementById('firstnameModal');
    firstnameModal.textContent = currentUser.firstName;
    let lastnameModal = document.getElementById('lastnameModal');
    lastnameModal.textContent = currentUser.lastName;
    let isAdminModal = document.getElementById('isAdminModal');
    isAdminModal.textContent = currentUser.isAdmin;
    let creationDateModal = document.getElementById('creationDateModal');
    creationDateModal.textContent = currentUser.createDate.substring(0, 10);
    let dateOfchangeModal = document.getElementById('dateOfchangeModal');
    dateOfchangeModal.textContent = currentUser.updateDate.substring(0, 10);
    

// When the user clicks on <span> (x), close the modal
span.addEventListener = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

}

