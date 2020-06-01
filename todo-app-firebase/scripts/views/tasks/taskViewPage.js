function taskViewPage() {
    return `<div class="taskview-content">
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
        <li>Date of last change:</li>
        <li id="dateOfchangeTaskModal"></li>
        <li>Description:</li>
        <li id="descriptionModal"></li>
    </ul>
    <div class="functional-button">
    <button onclick="todoListsLink_Click()">Back to lists</button>
    </div>
  </div>`;
}