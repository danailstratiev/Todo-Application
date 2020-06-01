import {submitEditToDoListForm} from '../../../controllers/todoListController';

export default function editToDoList(){
    return {
    template:`
    <div class="list-creator">
        <header>
            <h2>Edit TodoList</h2>
        </header>
        <div class="list-data">
           <form>
                <section class="list-input">
                <label for="listTitle">Title</label>
                <input type="text" name="titleEdit" id="titleEdit">
                <input type="hidden" name="list-id" id="list-id">
                <p>Default State</p>
                </section>
                <section class="list-btn">
                    <button id="list-edit-btn">Edit TodoList</button>
                </section>
            </form>
        </div>
    </div>
    `,
    listeners: [
        {
          targetId: 'list-edit-btn',
          eventType: 'click',
          callback: () => submitEditToDoListForm()
        }
      ]
    };
}