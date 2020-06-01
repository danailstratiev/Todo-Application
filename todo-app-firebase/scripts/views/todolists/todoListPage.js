function todoListsPage() {
    return `
    <div id="create-list-button" class="functional-button">
    <button id="makeToDoList" onclick="todoListCreateLink_Click()">Create New List</button>
    </div>
    <div class="todoList-navigator">
            <nav>
                <ul>
                    <li>Title</li>
                    <li>Created on</li>
                    <li>Last modified</li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
    </div>
    <div class="todoList-elements">
    
    </div>
    <div class="sharedList-elements">
    
    </div>
    `;
}