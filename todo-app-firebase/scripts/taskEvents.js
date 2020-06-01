//---Tasks Management---

async function taskCreateLink_Click() {
    const listId = document.getElementById('taskListid').value;
    
    await renderTask(taskCreatePage(), listId);
}


async function taskCreateForm_Submit() {
    const loggedUser = await AuthenticationService.getLoggedUser();
    let listId = document.getElementById('taskListId').value;

    let title = document.getElementById('taskTitle').value;
    let description = document.getElementById('taskDescription').value;
    let isComplete = document.getElementById('toggler').checked ? true : false;
    
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;

    if (title === '') {
        document.getElementById('task-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }
    let task = new Task(title, description,false,dateToday);
    task._listId = listId;
    task._creatorId = loggedUser._id;
    task._lastModifierId = loggedUser._id;
    task._dateOfLastChange = dateToday;
    task._isComplete = isComplete;

    await TaskRepository.addTask(task);

    tasksViewButton_Click(listId)
}

async function tasksViewButton_Click(listId) {
    await render(tasksPage());
    document.getElementById('taskListid').value = listId;
    
    let taskElements = document.getElementsByClassName('task-elements')[0];
    
    const items = await TaskRepository.getAllTasksInAList(listId);
    
   
    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('ul');

        const titleLi = document.createElement('li');
        titleLi.innerHTML = currentItem._title;

        const completionLi = document.createElement('li');
        completionLi.innerHTML = currentItem._isComplete;

        const creationDateLi = document.createElement('li');
        creationDateLi.innerHTML = currentItem._dateOfCreation;

        const dateOfLastChangeLi = document.createElement('li');
        dateOfLastChangeLi.innerHTML = currentItem._dateOfLastChange;

        
        const viewTd = document.createElement('li');
        const viewButton = document.createElement('BUTTON');
        viewTd.classList.add('viewButton');
       
        viewButton.textContent = 'View'
        viewButton.addEventListener('click', () => taskViewButton_Click(currentItem._id));
        viewTd.appendChild(viewButton);

        const editLi = document.createElement('li');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => taskEditButton_Click(currentItem._id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('li');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => taskDeleteButton_Click(currentItem._id));
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
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        taskElements.appendChild(ul);
    }

    const loggedUser = await AuthenticationService.getLoggedUser();
    

    await viewAssignmentTasksInList(loggedUser._id, listId);
}

async function taskViewButton_Click(id){
        //let modal = document.getElementsByClassName('modal')[0];
    render(taskViewPage())

    const currentTask = await TaskRepository.getTaskById(id);
    
    const creator = await UsersRepository.getById(currentTask._creatorId);
    const lastModifier = await UsersRepository.getById(currentTask._lastModifierId);

    
    
    
    let titleModalLi = document.getElementById('titleModal');
    titleModalLi.textContent = currentTask._title;
    let creatorModalLi = document.getElementById('taskCreatorModal');
    creatorModalLi.textContent = creator._firstName;
    let modifierModal = document.getElementById('taskModifierModal');
    modifierModal.textContent = lastModifier._lastName;
    let isCompleteModal = document.getElementById('taskIsCompleteModal');
    isCompleteModal.textContent = currentTask._isComplete;
    let creationDateModal = document.getElementById('creationTaskModal');
    creationDateModal.textContent = currentTask._dateOfCreation;
    let dateOfchangeModal = document.getElementById('dateOfchangeTaskModal');
    dateOfchangeModal.textContent = currentTask._dateOfLastChange;
    let descriptionModal = document.getElementById('descriptionModal');
    descriptionModal.textContent = currentTask._description;
    

}

async function taskDeleteButton_Click(id) {

    await TaskRepository.deleteTask(id);
    todoListsLink_Click();
}



async function taskEditButton_Click(taskId) {
    await render(taskEditPage());    
    
    let task = await TaskRepository.getTaskById(taskId);

    document.getElementById('editTaskId').value = taskId;
    document.getElementById('taskEditTitle').value = task._title;
    document.getElementById('taskEditDescription').textContent = task._description;
}

async function taskEditForm_Submit() {
    const taskId = document.getElementById('editTaskId').value
    const title = document.getElementById('taskEditTitle').value;
    const description = document.getElementById('taskEditDescription').value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    const isComplete = document.getElementById('edit-toggler').checked ? true : false;

    const loggedUser = await AuthenticationService.getLoggedUser();

    if (title === '') {
        document.getElementById('taskedit-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }

    let task = await TaskRepository.getTaskById(taskId);

    task._title = title;
    task._description = description;
    task._isComplete = isComplete;
    task._dateOfLastChange = dateToday;
    task._lastModifierId = loggedUser._id;

    
    if (task._id === null || undefined) {
        throw new Error('Id can not be null or undefined!')
    }
    await TaskRepository.updateTask(task, taskId);

    todoListsLink_Click();
}

// ------AssignedTasks Management------

async function assignTaskLink_Click() {
    const listId = document.getElementById('taskListid').value;
   

    await renderAssignmentTask(assignTaskPage(), listId);
}

async function taskAssignForm_Submit(userId) {
    const loggedUser = await AuthenticationService.getLoggedUser();
    let listId = document.getElementById('assignedTaskListId').value;
    let sharedList = await ToDoListRepository.getSharedListForReceiver(userId, listId);

    if (sharedList == null || undefined) {
        document.getElementById('assign-error').textContent = 'This user is not included in this ToDoList';
        throw new Error('This user is not included in this ToDoList');
    }

    let title = document.getElementById('assignmentTitle').value;
    let description = document.getElementById('assignmentDescription').value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    const isComplete = document.getElementById('assign-toggler').checked ? true : false;

    if (title === '') {
        document.getElementById('assign-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }
    let assignmentTask = new AssignmentTask(loggedUser._id, userId, listId, title)
    
    assignmentTask._description = description;
    assignmentTask._isComplete = isComplete;
    assignmentTask._dateOfAssignment = dateToday;
    assignmentTask._dateOfChange = dateToday;
    assignmentTask._lastModifierId = loggedUser._id

    let assignedTasksForUser = await TaskRepository.getAllAssignmentTasksForUserInList(userId, listId);

    if (assignedTasksForUser !== null ) {
        for (let i = 0; i < assignedTasksForUser.length; i++) {
            const element = assignedTasksForUser[i];
            
            if (element._receiverId == userId && element._listId == listId &&
                element._title === title) {
                document.getElementById('assignedUser-error').textContent = 'User already has task with this name.';

                throw new Error('User already has task with this name.')
            }
        }
    }
   

    await TaskRepository.addAssignmentTask(assignmentTask);

    //tasksViewButton_Click(listId)
}

async function shareTaskUsersButton_Click() {
    
    let usersToShareDiv = document.getElementsByClassName('assigned-users')[0];
    let usersToShare = await UsersRepository.getAll();
    
    if (usersToShareDiv.innerHTML !== '') {
        return null;
    }

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
        shareLi.classList.add = 'assign-button';
        shareButton.innerHTML = 'Assign';
        shareButton.addEventListener('click', () => taskAssignForm_Submit(currentUser._id));
        shareLi.appendChild(shareButton);

        ul.appendChild(usernameLi);
        ul.appendChild(firstNameLi);
        ul.appendChild(lastNameLi);
        ul.appendChild(shareLi);

        usersToShareDiv.appendChild(ul);
    }    
}

async function viewAssignmentTasksInList(userId, listId) {
    let taskElements = document.getElementsByClassName('assignedtask-elements')[0];
    
    const items = await TaskRepository.getAllAssignmentTasksForUserInList(userId, listId);
    
    if (items == null) {
        return '';
    }

    const assignedTaskHeadline = document.createElement('h3');
          assignedTaskHeadline.innerHTML = 'Assigned Tasks'
          taskElements.appendChild(assignedTaskHeadline)

    for (let i = 0; i < items.length; i++) {
        const currentItem = items[i];
        
        const ul = document.createElement('ul');

        const titleLi = document.createElement('li');
        titleLi.innerHTML = currentItem._title;

        const completionLi = document.createElement('li');
        completionLi.innerHTML = currentItem._isComplete;

        const creationDateLi = document.createElement('li');
        creationDateLi.innerHTML = currentItem._dateOfAssignment;

        const dateOfLastChangeLi = document.createElement('li');
        dateOfLastChangeLi.innerHTML = currentItem._dateOfChange;

        const assignedByLi = document.createElement('li');
        let assigner = await UsersRepository.getById(currentItem._creatorId);
        assignedByLi.innerHTML = assigner._username;

        const viewTd = document.createElement('li');
        const viewButton = document.createElement('BUTTON');
        viewTd.classList.add('viewButton');
       
        viewButton.textContent = 'View'
        viewButton.addEventListener('click', () => assignmentViewButton_Click(currentItem._id));
        viewTd.appendChild(viewButton);

        const editLi = document.createElement('li');
        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = 'EDIT';
        editButton.addEventListener('click', () => assignmentTaskEditButton_Click(currentItem._id));
        editLi.appendChild(editButton);

        const deleteLi = document.createElement('li');
        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = 'DELETE';
        deleteButton.addEventListener('click', () => assignmentTaskDeleteButton_Click(currentItem._id));
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
        ul.appendChild(assignedByLi);
        ul.appendChild(editLi);
        ul.appendChild(deleteLi);
        
        taskElements.appendChild(ul);
    }
}

async function assignmentViewButton_Click(id) {
    render(assignmentViewPage());

    const currentTask = await TaskRepository.getAssignmentTaskById(id);
    
    const creator = await UsersRepository.getById(currentTask._creatorId);
    const lastModifier = await UsersRepository.getById(currentTask._receiverId);

    
    let titleModalLi = document.getElementById('assignmentModal');
    titleModalLi.textContent = currentTask._title;
    let creatorModalLi = document.getElementById('assignmentCreatorModal');
    creatorModalLi.textContent = creator._username;
    let modifierModal = document.getElementById('assignmentModifierModal');
    modifierModal.textContent = lastModifier._username;
    let isCompleteModal = document.getElementById('assignmentIsCompleteModal');
    isCompleteModal.textContent = currentTask._isComplete;
    let creationDateModal = document.getElementById('creationAssignmentModal');
    creationDateModal.textContent = currentTask._dateOfAssignment;
    let dateOfchangeModal = document.getElementById('dateOfchangeAssignmentModal');
    dateOfchangeModal.textContent = currentTask._dateOfChange;
    let descriptionModal = document.getElementById('descriptionAssignmentModal');
    descriptionModal.textContent = currentTask._description;
}

//<button id="assignTaskButton" onclick="taskAssignForm_Submit()">Assign</button>

async function assignmentTaskEditButton_Click(id) {

    render(assignmentTaskEditPage());

    let assignmentTask = await TaskRepository.getAssignmentTaskById(id);
    
    document.getElementById('assignmentEditId').value = id;
    document.getElementById('assignmentEditTitle').value = assignmentTask._title;
    document.getElementById('assignmentEditDescription').value = assignmentTask._description;

    const title = document.getElementById('assignmentEditTitle').value;
    const description = document.getElementById('assignmentEditDescription').value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    const isComplete = true;

    const loggedUser = await AuthenticationService.getLoggedUser();

    if (title === '') {
        throw new Error('Title can not be empty!')
    }

    assignmentTask._title = title;
    assignmentTask._description = description;
    assignmentTask._isComplete = isComplete;
    assignmentTask._dateOfChange = dateToday;
    assignmentTask._lastModifierId = loggedUser._id;

    
    if (assignmentTask._id === null || undefined) {
        throw new Error('Id can not be null or undefined!')
    }

    return id;
}

async function editAssignmentButton(){


    const id = document.getElementById('assignmentEditId').value;

    let assignmentTask = await TaskRepository.getAssignmentTaskById(id);

    const title = document.getElementById('assignmentEditTitle').value;
    const description = document.getElementById('assignmentEditDescription').value;
    let d = new Date();
    let dateToday = `${d.getDate()}/${(d.getMonth() + 1)}/${d.getFullYear()}/${d.getHours()}:${d.getMinutes()}`;
    const isComplete = document.getElementById('assign-edit-toggler').checked ? true : false;

    if (title === '') {
        document.getElementById('assignmentedit-title-error').textContent = 'Title can not be empty!';
        throw new Error('Title can not be empty!')
    }

    let loggedUser = AuthenticationService.getLoggedUser();

    assignmentTask._title = title;
    assignmentTask._description = description;
    assignmentTask._isComplete = isComplete;
    assignmentTask._dateOfChange = dateToday;
    assignmentTask._lastModifierId = loggedUser._id;

    
    await TaskRepository.updateAssignmentTask(assignmentTask, id);
    
    todoListsLink_Click();
}

async function assignmentTaskDeleteButton_Click(id){

    await TaskRepository.deleteAssignmentTask(id);

    todoListsLink_Click();
}