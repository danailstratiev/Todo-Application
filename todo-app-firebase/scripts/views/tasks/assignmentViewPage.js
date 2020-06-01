function assignmentViewPage() {
    return `<div class="assignmentview-content">
    <ul>                   
        <li>Title:</li>
        <li id="assignmentModal"></li>
         <li>Assigned By:</li>
        <li id="assignmentCreatorModal"></li>
        <li>Modifier:</li>
        <li id="assignmentModifierModal"></li>
        <li>Is Complete:</li>
        <li id="assignmentIsCompleteModal"></li>
        <li>Date of creation:</li>
        <li id="creationAssignmentModal"></li>
        <li>Date of last change:</li>
        <li id="dateOfchangeAssignmentModal"></li>
        <li>Description:</li>
        <li id="descriptionAssignmentModal"></li>
    </ul>
    <div class="functional-button">
    <button onclick="todoListsLink_Click()">Back to lists</button>
    </div>
  </div>`;
}