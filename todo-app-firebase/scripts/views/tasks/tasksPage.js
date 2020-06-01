function tasksPage(listId) {
    return `
    <input type="hidden" id="taskListid" name="taskListid" />
    <div class="task-navigator">
            <nav>
                <ul>
                    <li></li>
                    <li>Title</li>
                    <li>IsComplete</li>
                    <li>Created on</li>
                    <li>Last modified</li>
                    <li></li>
                    <li></li>
                </ul>
            </nav>
    </div>
    
    <div class="task-elements">
    
    </div>

    <div class="functional-button">
    <button id="createTask" onclick="taskCreateLink_Click()">Create New Task</button>
    <button id="assignTask" onclick="assignTaskLink_Click()">Assign Task</button>
    </div>

    <div class="assignedtask-elements">
    
    </div>
    `;
}