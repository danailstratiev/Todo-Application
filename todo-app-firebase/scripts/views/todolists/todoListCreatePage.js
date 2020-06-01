function todoListCreatePage() {
    return `
    <div class="todoCreate">
    <label>TITLE</label>
    <input name="title" type="title" id="title" placeholder="Title...">
    <button id="createListButton" onclick="todoListCreateForm_Submit()">Create</button>
    <p id="todolist-title-error" class="error"></p>
    </div>
    `;
}