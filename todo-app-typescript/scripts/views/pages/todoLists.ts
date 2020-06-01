import {createNewList} from '../../controllers/todoListController';

export default function todoLists(){
    return { template:`<div class="table-holder">
    <header class="table-heading">
        <h2>TODO List</h2>
        <button id="newTodolist">+ Add TODO</button>
    </header>
    <table cellpadding="10" class="list-table">
        <thead>
            <tr>
                <td>Title</td>
                <td>Date of creation</td>
                <td>Date of last edit</td>
                <td></td>
                <td colspan="3"></td>
            </tr>
        </thead>
        <tbody id="lists-view">
            
        </tbody>
    </table>
    </div>`,
    
    listeners: [
        {
          targetId: 'newTodolist',
          eventType: 'click',
          callback: () => createNewList()
        }
      ]
    };
}
