import {taskCreateForm_Submit} from "../../events/taskEvents"

export default function taskCreatePage() {
    return { template:`<div class="taskCreator">
    <h3>Create Task</h3>
    <input name="taskTitle" type="title" id="taskTitle" placeholder="Title..." required>
    <input name="taskListId" type="hidden" id="taskListId">
    <p id="task-title-error" class="error"></p>
    <textarea name="taskDescription" id="taskDescription" cols="30" rows="10"></textarea>
    <div>
    <p>Is Complete:</p>
    <p>
    <label  class="switch">
        <input id="toggler" type="checkbox" >
        <span class="slider round"></span>
    </label>
    </p>
    </div>
    <button id="createTaskButton">Create</button>
    </div>`,
    listeners: [
        {
            targetId: 'createTaskButton',
            eventType: 'click',
            callback: taskCreateForm_Submit
        }
    ]};
}