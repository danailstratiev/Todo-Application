import {taskEditForm_Submit} from "../../events/taskEvents"

export default function taskEditPage() {
    return { template:`<div class="taskCreator">
    <h3>Edit Task</h3>
    <input name="editTaskId" type="hidden" id="editTaskId" required>
    <input name="editTaskId" type="hidden" id="editTaskListId" required>
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
    <button id="editTaskButton" >Save changes</button>    
    </div>`,
    listeners: [
        {
            targetId: 'editTaskButton',
            eventType: 'click',
            callback: taskEditForm_Submit
        }
    ]};
}