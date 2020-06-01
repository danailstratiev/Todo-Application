import { loadTodoLists } from "../../controllers/todoListController";
import todoLists from "./todoLists";


export default function shareListUsers(){
    return { template:`
    <div class="table-holder">
    <header class="table-heading">
        <h2>Users to share</h2>
        <button id="backToLists">Back To Lists</button>
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
        <tbody id="shareUsers">
           
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