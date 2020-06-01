function todoListEditPage() {
    return `
    <div class="todoCreate">
    <label>Edit TITLE</label>
    <input type="hidden" id="listId" name="listId" />
    <input type="hidden" id="listCreatorId" name="listId" />
    <input type="hidden" id="listCreationDate" name="listCreationDate" />

    <input name="titleEdit" type="title" id="titleEdit" placeholder="Title...">
    <button id="editListButton" onclick="todoListEditForm_Submit()">SAVE CHANGES</button>

    <p id="todotitle-edit-error" class="error"></p>
    </div>

    `;
}