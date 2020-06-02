import {todoListEditForm_Submit} from "../../events/todoListEvents";

export default function todoListEditPage() {
    return { template:`
    <div class="todoCreate">
    <label for="title">Edit TITLE</label>
    <input type="hidden" id="listId" name="listId" />
    <input type="hidden" id="listCreatorId" name="listId" />
    <input type="hidden" id="listCreationDate" name="listCreationDate" />

    <input name="titleEdit" type="title" id="titleEdit" placeholder="Title...">
    <button id="editListButton" >SAVE CHANGES</button>

    <p id="todotitle-edit-error" class="error"></p>
    </div>
    `,
    listeners: [
        {
            targetId: 'editListButton',
            eventType: 'click',
            callback: todoListEditForm_Submit
        }
    ]};
}