(async() => {

    await render(homePage());
    await handleMenu();

    if (await UsersRepository.count() == 0) {
        const initialUser = new AppUser('admin', 'adminpass', 'Administrator', 'Administrator', true);
        await UsersRepository.addUser(initialUser);
    }

})();

async function render(innerHtml) {
    let contentDiv = await document.getElementById('content');
    contentDiv.innerHTML = innerHtml;
}

async function renderTask(innerHtml, listId) {
    let contentDiv = await document.getElementById('content');
    contentDiv.innerHTML = innerHtml;
    document.getElementById('taskListId').value = listId;
}

async function renderAssignmentTask(innerHtml, listId) {
    let contentDiv = await document.getElementById('content');
    contentDiv.innerHTML = innerHtml;
    document.getElementById('assignedTaskListId').value = listId;
}

async function handleMenu() {

    const loggedUser = await AuthenticationService.getLoggedUser();

    if (loggedUser == null) {
        document.getElementById('loginLink').style.display = '';
        document.getElementById('homeLink').style.display = '';
        document.getElementById('usersLink').style.display = 'none';
        document.getElementById('todoListLink').style.display = 'none';
        document.getElementById('logoutLink').style.display = 'none';
        return;
    } else {
        document.getElementById('logoutLink').style.display = '';
        document.getElementById('loginLink').style.display = 'none';
    }

    if (loggedUser._isAdmin) {

        document.getElementById('usersLink').style.display = '';
        document.getElementById('todoListLink').style.display = '';
    } else {
        document.getElementById('todoListLink').style.display = '';
        document.getElementById('usersLink').style.display = 'none';
    }
}