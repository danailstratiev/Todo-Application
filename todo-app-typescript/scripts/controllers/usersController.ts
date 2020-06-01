import createUser from '../views/components/users/createUser';
import editUserPage from '../views/components/users/editUser';
import usersPage from '../views/pages/users';
import UsersService from '../services/userService';
import { UserItem } from '../utilities/types';
import AuthenticationService from '../services/authenticationService';
import { render, renderView } from '../utilities/helpers';
import { main_content_selector } from '../utilities/constants';
import User from '../models/user'


export async function loadUsers(): Promise<void> {
  //render(main_content_selector, usersPage());
  renderView(usersPage())
  const usersTable: HTMLElement = document.getElementById('users-view') as HTMLElement;
  const items: Array<UserItem> = await UsersService.getAll();

  if (!items) {
    return;
  }

  for (const currentItem of items) {
    usersTable.appendChild(addUserRow(currentItem));
  }
}

function addUserRow(currentItem: UserItem): HTMLElement {
  const { id, username, password, firstName, lastName, isAdmin, createDate, updateDate } = currentItem;
  const row: HTMLElement = document.createElement('tr');

  row.innerHTML = `
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${username}</td>
      <td>${createDate.substring(0,10)}</td>
      <td>${updateDate.substring(0,10)}</td>
      <td class="user-edit-button" ></td>
      <td class="user-delete-button" id="deleteList"></td>
  `;

    row.querySelector('.user-edit-button')
     .addEventListener('click', () => editUser(id));
    row.querySelector('.user-delete-button')
    .addEventListener('click', () => deleteUser(id));

  return row;
}


export function createNewUser(): void {
  renderView(createUser());
}

export async function editUser(id: string): Promise<void> {
  renderView(editUserPage());
  const item: User = await UsersService.getById(id);

  (document.getElementById('user-id') as HTMLInputElement).value = item.id;
  (document.getElementById('edit-username') as HTMLInputElement).value = item.username;
  (document.getElementById('edit-password') as HTMLInputElement).value = item.password;
  (document.getElementById('edit-firstname') as HTMLInputElement).value = item.firstName;
  (document.getElementById('edit-lastname') as HTMLInputElement).value = item.lastName;
}

export async function submitCreateUserForm() : Promise<void> {

  const username: string = (document.getElementById('username') as HTMLInputElement).value;
  const password: string = (document.getElementById('password') as HTMLInputElement).value;
  const firstName: string = (document.getElementById('firstname') as HTMLInputElement).value;
  const lastName: string = (document.getElementById('lastname') as HTMLInputElement).value;

  let loggedUser =  AuthenticationService.getLoggedUser();
  
  let d = new Date();
  let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
  
  const item: User = new User('', username, password, firstName, lastName, true,
  loggedUser.id, loggedUser.id, dateToday, dateToday);
          
  await UsersService.createNewUser(item);  

  await loadUsers();
}

export async function submitEditUserForm() : Promise<void> {
  event.preventDefault();

  const id: string = (document.getElementById('user-id') as HTMLInputElement).value;
  const username: string = (document.getElementById('edit-username') as HTMLInputElement).value;
  const password: string = (document.getElementById('edit-password') as HTMLInputElement).value;
  const firstName: string = (document.getElementById('edit-firstname') as HTMLInputElement).value;
  const lastName: string = (document.getElementById('edit-lastname') as HTMLInputElement).value;

  let loggedUser =  AuthenticationService.getLoggedUser();
  
  let d = new Date();
  let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
  
  const item: User = await UsersService.getById(id);
  item.username = username;
  item.password = password;
  item.firstName = firstName;
  item.lastName = lastName;

  await UsersService.updateUser(item, id);

  await loadUsers();
}

async function deleteUser(id: string): Promise<void> {
  await UsersService.deleteUser(id);
  await loadUsers();
}
