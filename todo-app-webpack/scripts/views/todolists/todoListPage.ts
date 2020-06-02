import {todoListCreateLink_Click} from "../../events/todoListEvents"
  
 export default function todoListsPage() {
    return {template: `
    <div id="create-list-button" class="functional-button">
    <button id="makeToDoList" >Create New List</button>
    </div>
    
    <table class="todoList-navigator">
        <thead>
            <tr>
            <td>CreatorId</td>
            <td>Title</td>
            <td>Created on</td>
            <td>Last modified</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            </tr>
        </thead>
        <tbody class="todoList-elements">
            
        </tbody>
    </table>    
    `,
    listeners: [
        {
            targetId: 'makeToDoList',
            eventType: 'click',
            callback: todoListCreateLink_Click
        }
    ]};
}

