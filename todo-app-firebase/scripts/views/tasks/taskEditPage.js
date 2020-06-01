function taskEditPage() {
    return `<div class="taskCreator">
    <h3>Edit Task</h3>
    <input name="editTaskId" type="hidden" id="editTaskId" placeholder="Title..." required>
    <input name="taskEditTitle" type="title" id="taskEditTitle" placeholder="Title..." required>
    <p id="taskedit-title-error" class="error"></p>
    <textarea name="taskEditDescription" id="taskEditDescription" cols="30" rows="10" required></textarea>
    <div>
    <p>Is Complete:</p>
    <p>
    <label class="switch">
        <input id="edit-toggler" type="checkbox" >
        <span class="slider round"></span>
    </label>
    <p>
    </div>
    <button id="editTaskButton" onclick="taskEditForm_Submit()">Save changes</button>
    
</div>`;
}