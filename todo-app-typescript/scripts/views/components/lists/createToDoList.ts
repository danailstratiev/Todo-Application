import {submitCreateToDoListForm} from '../../../controllers/todoListController';

export default function createUser(){
    return {
    template:`
    <div class="list-creator">
        <header>
            <h2>Create/Edit TodoList</h2>
        </header>
        <div class="list-data">
           <form>
                <section class="list-input">
                <label for="listTitle">Title</label>
                <input type="text" name="list-title" id="list-title">
                <p>Default State</p>
                </section>
                <section class="list-btn">
                    <button id="list-create-btn">Create/Edit TodoList</button>
                </section>
            </form>
        </div>
    </div>
    `,
    listeners: [
        {
          targetId: 'list-create-btn',
          eventType: 'click',
          callback: () => submitCreateToDoListForm()
        }
      ]
    };
}