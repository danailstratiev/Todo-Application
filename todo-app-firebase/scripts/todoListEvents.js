//---ToDoLists functionality---

async function todoListCreateLink_Click() {
    await render(todoListCreatePage());
}

async function todoListCreateForm_Submit() {
    const loggedUser = await AuthenticationService.getLoggedUser();
    

    const title = document.getElementById('title').value;

    if (title === '') {
        document.getElementById('todolist-title-error').textContent = 'Title can not be empty';
        throw new Error('Title can not be empty');
    }

    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    const todoList = new ToDoList(title,dateToday);
    todoList.creatorId = loggedUser._id;
    todoList.lastModifierId = loggedUser._id;
    todoList._dateOfLastChange = dateToday;

    const newToDoList = await ToDoListRepository.addToDoList(todoList);

    await todoListsLink_Click();
}

async function todoListsLink_Click(){
    
    await render(todoListsPage());
    
    let todoListElements = document.getElementsByClassName('todoList-elements')[0];
    
    const allItems = await ToDoListRepository.getAllToDoLists();
    const loggedUser = await AuthenticationService.getLoggedUser();

    const items = allItems.filter(x => x._creatorId === loggedUser._id);
    if (items == null)
        return;
    
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('ul');

        const titleLi = document.createElement('li');
        titleLi.innerHTML = currentItem._title;

        const creationDateLi = document.createElement('li');
        creationDateLi.innerHTML = currentItem._dateOfCreation;

        const dateOfLastChangeLi = document.createElement('li');
        dateOfLastChangeLi.innerHTML = currentItem._dateOfLastChange;


        const shareLi = document.createElement('li');
        const shareButton = document.createElement('BUTTON');
        shareButton.innerHTML = 'Share';
        shareButton.addEventListener('click', () => shareListButton_Click(currentItem._id));
        shareLi.appendChild(shareButton);


        const tasksLi = document.createElement('li');
        const tasksButton = document.createElement('BUTTON');
        tasksButton.innerHTML = 'Tasks';
        tasksButton.addEventListener('click', () => tasksViewButton_Click(currentItem._id));
        tasksLi.appendChild(tasksButton);

        const editLi = document.createElement('li');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => todoListEditButton_Click(currentItem._id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('li');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => todoListDeleteButton_Click(currentItem._id));
        deleteLi.appendChild(deleteButton);

        deleteLi.classList.add('delete-hint');
        let deleteHoverText = document.createElement('span');
        deleteHoverText.classList.add('hint-text');
        deleteHoverText.innerHTML = 'Are you sure?';
        deleteLi.appendChild(deleteHoverText);

        ul.appendChild(titleLi);
        ul.appendChild(creationDateLi);
        ul.appendChild(dateOfLastChangeLi);
        ul.appendChild(shareLi);
        ul.appendChild(tasksLi);
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        todoListElements.appendChild(ul);
    }

    await sharedListsLink_Click();
}

async function todoListDeleteButton_Click(id) {

    await ToDoListRepository.deleteToDoList(id);
    await todoListsLink_Click();
}

async function todoListEditLink_Click() {
    await render(todoListEditPage());    
}

async function todoListEditForm_Submit() {
    const id = document.getElementById('listId').value;
    const creatorId = document.getElementById('listCreatorId').value;
    const creationDate = document.getElementById('listCreationDate').value;
    const title = document.getElementById('titleEdit').value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    const loggedUser = await AuthenticationService.getLoggedUser();

    if (title === '') {
        document.getElementById('todotitle-edit-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!');
    }

    let item = await ToDoListRepository.getToDoListById(id);
    
    item._title = title;
    item._dateOfLastChange = dateToday;
    item._lastModifierId = loggedUser._id;
    
    const updated = await ToDoListRepository.updateToDoList(item, id);
    
    todoListsLink_Click();
}

async function todoListEditButton_Click(id) {
    await todoListEditLink_Click();
    const item = await ToDoListRepository.getToDoListById(id);
    
    document.getElementById('listId').value = item._id;
    document.getElementById('titleEdit').value = item._title;
}

// ------ShareList Management------

//Here we visualize other users to share our list with 
async function shareListButton_Click(listId) {
    await render(shareListUsersPage());
    
    let usersToShareDiv = document.getElementsByClassName('usersToShare')[0];
    let usersToShare = await UsersRepository.getAll();
    
    for (let i = 0; i < usersToShare.length; i++) {
        const currentUser = usersToShare[i];
        
        const ul = document.createElement('ul');

        const usernameLi = document.createElement('li');
        usernameLi.innerHTML = currentUser._username;

        const firstNameLi = document.createElement('li');
        firstNameLi.innerHTML = currentUser._firstName;

        const lastNameLi = document.createElement('li');
        lastNameLi.innerHTML = currentUser._lastName;


        const shareLi = document.createElement('li');
        const shareButton = document.createElement('BUTTON');
        shareButton.innerHTML = 'Share';
        shareButton.addEventListener('click', () => userShareListButton_Click(currentUser._id, listId));
        shareLi.appendChild(shareButton);

        ul.appendChild(usernameLi);
        ul.appendChild(firstNameLi);
        ul.appendChild(lastNameLi);
        ul.appendChild(shareLi);

        usersToShareDiv.appendChild(ul);
    }    
}

async function userShareListButton_Click(userId, listId) {
    const loggedUser = await AuthenticationService.getLoggedUser();
    let currentToDoList = await ToDoListRepository.getToDoListById(listId);
    
    let sharedList = await ToDoListRepository.getSharedListForReceiver(userId, listId);
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    if (sharedList == null || undefined) {
        sharedList = new SharedList(loggedUser._id, currentToDoList._creatorId,
            listId, userId);
        sharedList._dateOfShare = dateToday;
        await ToDoListRepository.createSharedToDoList(sharedList);
        todoListsLink_Click();
    }else{
        document.getElementById('share-list').textContent = 'This todolist has already been shared with user.';
        throw new Error('This todolist has already been shared with user.')
    }
}

async function sharedListsLink_Click(){
    
    let sharedListElements = document.getElementsByClassName('sharedList-elements')[0];
    
    const loggedUser = await AuthenticationService.getLoggedUser();
    const items = await ToDoListRepository.getSharedToDoListsForUser(loggedUser._id);

    const sharedListsHeading = document.createElement('h3');
        sharedListsHeading.innerHTML = 'Shared ToDoLists';
        
        sharedListElements.appendChild(sharedListsHeading);
    
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('ul');

        const titleLi = document.createElement('li');
        titleLi.innerHTML = currentItem._title;

        const creationDateLi = document.createElement('li');
        creationDateLi.innerHTML = currentItem._dateOfCreation;

        const dateOfLastChangeLi = document.createElement('li');
        dateOfLastChangeLi.innerHTML = currentItem._dateOfLastChange;

        const shareLi = document.createElement('li');
        const shareButton = document.createElement('BUTTON');
        shareButton.innerHTML = 'Share';
        shareButton.addEventListener('click', () => shareListButton_Click(currentItem._id));
        shareLi.appendChild(shareButton);


        const tasksLi = document.createElement('li');
        const tasksButton = document.createElement('BUTTON');
        tasksButton.innerHTML = 'Tasks';
        tasksButton.addEventListener('click', () => tasksViewButton_Click(currentItem._id));
        tasksLi.appendChild(tasksButton);

        const editLi = document.createElement('li');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => todoListEditButton_Click(currentItem._id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('li');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => sharedListDeleteButton_Click(currentItem._id));
        
        deleteLi.classList.add('delete-hint');
        let deleteHoverText = document.createElement('span');
        deleteHoverText.classList.add('hint-text');
        deleteHoverText.innerHTML = 'Are you sure?';
        deleteLi.appendChild(deleteHoverText);
        deleteLi.appendChild(deleteButton);
        
        

        ul.appendChild(titleLi);
        ul.appendChild(creationDateLi);
        ul.appendChild(dateOfLastChangeLi);
        ul.appendChild(shareLi);
        ul.appendChild(tasksLi);
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        sharedListElements.appendChild(ul);
    }
}

async function sharedListDeleteButton_Click(listId) {
    
    await ToDoListRepository.deleteSharedList(listId);

    let loggedUser = await AuthenticationService.getLoggedUser();

    await TaskRepository.deleteAssignmentTasksFromList(listId, loggedUser._id);

    todoListsLink_Click();
}