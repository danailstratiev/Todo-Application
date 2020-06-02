import {todoListsLink_Click} from "../../events/todoListEvents"

export default function taskViewPage() {
    return { template: `<div class="taskview-content">
    <ul>                   
        <li>Title:</li>
        <li id="titleModal"></li>
         <li>Creator:</li>
        <li id="taskCreatorModal"></li>
        <li>Modifier:</li>
        <li id="taskModifierModal"></li>
        <li>Is Complete:</li>
        <li id="taskIsCompleteModal"></li>
        <li>Date of creation:</li>
        <li id="creationTaskModal"></li>
        
        <li>Description:</li>
        <li id="descriptionModal"></li>
    </ul>
    <div class="functional-button">
    <button id="list-redirector">Back to lists</button>
    <button id="assignees">Assignees</button>
    </div>    
  </div>`,
  listeners: [
    {
        targetId: 'list-redirector',
        eventType: 'click',
        callback: todoListsLink_Click
    }
  ]};
}
