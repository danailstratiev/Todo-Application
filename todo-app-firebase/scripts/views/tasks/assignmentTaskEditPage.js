function assignmentTaskEditPage() {
    return `<div class="taskCreator">
    <h3>Edit Task</h3>
    <input name="assignmentEditId" type="hidden" id="assignmentEditId" >
    <input name="assignmentEditTitle" type="title" id="assignmentEditTitle" placeholder="Title..." required>
    <p id="assignmentedit-title-error" class="error"></p>
    <textarea name="assignmentEditDescription" id="assignmentEditDescription" cols="30" rows="10" required></textarea>
    <div>
    <p>Is Complete:</p>
    <p>
    <label class="switch">
        <input id="assign-edit-toggler" type="checkbox" >
        <span class="slider round"></span>
    </label>
    </p>
    </div>
    <button id="editAssignmentButton" onclick="editAssignmentButton()">Save changes</button>
    </div>`;
}