import {taskCreateLink_Click} from "../../events/taskEvents"

export default function tasksPage() {
    return { template:`
    <input type="hidden" id="taskListid" name="taskListid" />
    <table class="task-navigator">
        <thead >
            <tr>
                <td></td>
                <td>Title</td>
                <td>IsComplete</td>
                <td>Created on</td>
                <td>Last modified</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </thead>
        <tbody class="task-elements">
            
        </tbody>
    </table>

    <div class="functional-button">
    <button id="createTask" >Create New Task</button>
    </div>
    `,
    listeners: [
        {
            targetId: 'createTask',
            eventType: 'click',
            callback: taskCreateLink_Click
        }
    ]};
}

