import { renderView } from "../../utilities/helpers";
import todoLists from "./todoLists";
import { loadTodoLists } from "../../controllers/todoListController";


export default function assignTask(){
    return { template:`
    <div class="table-holder">
    <header class="table-heading">
        <h2>Users to assign</h2>
        <button id="backToLists">Back To Tasks</button>
    </header>
    <table cellpadding="10" class="list-table"> 
        <thead>
            <tr>                    
                <td>Username</td>
                <td>First name</td>
                <td>Last name</td>
                <td></td>                  
            </tr>
        </thead>
        <tbody id="assignUsers">
            
        </tbody>
    </table>
    <button class="delete"></button>
    </div>
    `,    
    listeners: [
        {
          targetId: 'backToLists',
          eventType: 'click',
          callback: () => loadTodoLists()
        }
      ]
    };
}