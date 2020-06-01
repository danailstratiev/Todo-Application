const usersUrl = 'https://firebaseio.com/';
const todoListUrl = 'https://firebaseio.com/';
const tasksUrl = 'https://firebaseio.com/';

async function loginForm_Submit() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    await AuthenticationService.authenticate(username, password);
    const loggedUser = await AuthenticationService.getLoggedUser();

    if (loggedUser != null) {
        await render(homePage());
        await handleMenu();
    } else {
        document.getElementById('error').innerHTML = "User doesn't exist";
    }
}

async function logoutLink_Click() {
    await AuthenticationService.logout();
    await handleMenu();
    await render(homePage());
}

async function homeLink_Click() {
    await render(homePage());
}

async function loginLink_Click() {
    await render(loginPage());
}

async function usersLink_Click() {

    await render(usersPage());
    const usersTable = document.getElementsByClassName('usersTable')[0];

    const items = await UsersRepository.getAll();
    if (items == null)
        return;
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const tr = document.createElement('ul');

        const viewTd = document.createElement('li');
        const viewButton = document.createElement('BUTTON');
        viewTd.classList.add('viewButton');
        
        viewButton.textContent = 'View'
        viewButton.addEventListener('click', () => userViewButton_Click(currentItem._id));
        viewTd.appendChild(viewButton);


        const usernameTd = document.createElement('li');
        usernameTd.innerHTML = currentItem._username;

        const passwordTd = document.createElement('li');
        passwordTd.innerHTML = currentItem._password;

        const firstNameTd = document.createElement('li');
        firstNameTd.innerHTML = currentItem._firstName;

        const lastNameTd = document.createElement('li');
        lastNameTd.innerHTML = currentItem._lastName;

        const isAdminTd = document.createElement('li');
        isAdminTd.innerHTML = currentItem._isAdmin;

        const editTd = document.createElement('li');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => usersEditButton_Click(currentItem._id));
        editTd.appendChild(editButton);

        const deleteTd = document.createElement('li');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => usersDeleteButton_Click(currentItem._id));
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

async function usersEditButton_Click(id) {

    await usersEditLink_Click();
    const item = await UsersRepository.getById(id);

    document.getElementById('id').value = item._id;
    document.getElementById('username').value = item._username;
    document.getElementById('password').value = item._password;
    document.getElementById('firstName').value = item._firstName;
    document.getElementById('lastName').value = item._lastName;
    document.getElementById('dateOfCreation').value = item._dateOfCreation;
    document.getElementById('userCreatorId').value = item._creatorId;
}

async function usersEditForm_Submit() {
    const id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const isAdmin = document.getElementById('user-edit-toggler').checked ? true : false;

    if (username === '') {
        document.getElementById('username-edit-error').textContent = 'Username can not be empty!';

        throw new Error('Username can not be empty!')
    }
    
    if (password === '') {
        document.getElementById('password-edit-error').textContent = 'Password can not be empty!';

        throw new Error('Password can not be empty!')
    }
    
    if (firstName === '') {
        document.getElementById('firstname-edit-error').textContent = 'Firstname can not be empty!';

        throw new Error('Firstname can not be empty!')
    }
    
    if (lastName === '') {
        document.getElementById('lastname-edit-error').textContent = 'Lastname can not be empty!';

        throw new Error('Lastname can not be empty!')
    }

    const item = await UsersRepository.getById(+id);
    item._username = username;
    item._password = password;
    item._firstName = firstName;
    item._lastName = lastName;
    item._id = +id;
    item._isAdmin = isAdmin;

    let loggedUser = await AuthenticationService.getLoggedUser();

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    item._dateOfLastChange = dateToday;
    item._lastModifierId = loggedUser._id;
    
    await UsersRepository.updateUser(item, id);

    usersLink_Click();
}

async function usersCreateForm_Submit() {
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const isAdmin = document.getElementById('user-create-toggler').checked ? true : false;
    
    let loggedUser = await AuthenticationService.getLoggedUser();

    if (username === '') {
        document.getElementById('username-error').textContent = 'Username can not be empty!';
        throw new Error('Username can not be empty!')
    }
    
    if (password === '') {
        document.getElementById('password-error').textContent = 'Username can not be empty!';

        throw new Error('Password can not be empty!')
    }
    
    if (firstName === '') {
        document.getElementById('firstname-error').textContent = 'Username can not be empty!';
        throw new Error('Firstname can not be empty!')
    }
    
    if (lastName === '') {
        document.getElementById('lastname-error').textContent = 'Username can not be empty!';
        throw new Error('Lastname can not be empty!')
    }

    const user = new AppUser(username, password, firstName, lastName, isAdmin, loggedUser._id);


    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    user._dateOfCreation = dateToday;
    user._dateOfLastChange = dateToday;
    user._lastModifierId = loggedUser._id;

    await UsersRepository.addUser(user);

    usersLink_Click();
}

async function usersDeleteButton_Click(id) {

    await UsersRepository.deleteUser(id);
    await usersLink_Click();
}

async function usersEditLink_Click() {
    await render(usersEditPage());
    
}

async function usersCreateLink_Click() {
    await render(usersCreatePage());
}

async function userViewButton_Click(id){
    const currentUser = await UsersRepository.getById(id);
    
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    
// Get the button that opens the modal

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

    let usernameModalLi = document.getElementById('usernameModal');
    usernameModalLi.textContent = currentUser._username;
    let firstnameModal = document.getElementById('firstnameModal');
    firstnameModal.textContent = currentUser._firstName;
    let lastnameModal = document.getElementById('lastnameModal');
    lastnameModal.textContent = currentUser._lastName;
    let isAdminModal = document.getElementById('isAdminModal');
    isAdminModal.textContent = currentUser._isAdmin;
    let creationDateModal = document.getElementById('creationDateModal');
    creationDateModal.textContent = currentUser._dateOfCreation;
    let dateOfchangeModal = document.getElementById('dateOfchangeModal');
    dateOfchangeModal.textContent = currentUser._dateOfLastChange;
    

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

