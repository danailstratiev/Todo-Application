import {todoListsLink_Click} from "../../events/todoListEvents"

export default function taskAssigneesPage() {
    return {template:`
    <table class="assignees-table">
    <thead>
        <tr>
            <td>Username</td>
            <td>First name</td>
            <td>Last name</td>
            <td>IsAdmin</td>
        </tr>
    </thead>
    <tbody class="task-assignees">
        <tr></tr>
    </tbody>
    </table>
    <div class="functional-button">
    <button id="list-redirector-one">Back to lists</button>
    </div>
    `,
    listeners: [
        {
            targetId: 'list-redirector-one',
            eventType: 'click',
            callback: todoListsLink_Click
        }
    ]};
}