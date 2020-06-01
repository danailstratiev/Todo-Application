function assignTaskPage() {
    return `<div class="taskCreator">
    <h3>Assign Task</h3>
    <input name="assignmentTitle" type="title" id="assignmentTitle" placeholder="Title..." required>
    <p id="assign-title-error" class="error"></p>
    <p id="already-assigned-error" class="error"></p>
    <input name="assignedTaskListId" type="hidden" id="assignedTaskListId">
    <textarea name="assignmentDescription" id="assignmentDescription" cols="30" rows="10"></textarea>
    <div>
    <p>Is Complete:</p>
    <p>
    <label class="switch">
        <input id="assign-toggler" type="checkbox" >
        <span class="slider round"></span>
    </label>
    </p>
    <div>
    <button id="assignTaskUserButton" onclick="shareTaskUsersButton_Click()">Assign to:</button>
    <p id="assign-error" class="error"></p>
    <p id="assignedUser-error" class="error"></p>

    <div name="assigned-users" class="assigned-users"></div>

    </div>`;
}