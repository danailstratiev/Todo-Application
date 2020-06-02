import {todoListCreateForm_Submit} from "../../events/todoListEvents";


export default function todoListCreatePage() {
    return { template:`
    <div class="todoCreate">
    <label for="title">TITLE</label>
    <input name="title" type="title" id="title" placeholder="Title...">
    <button id="createListButton" >Create</button>
    <p id="todolist-title-error" class="error"></p>
    </div>
    `,
    listeners: [
        {
            targetId: 'createListButton',
            eventType: 'click',
            callback: todoListCreateForm_Submit
        }
    ]};
}