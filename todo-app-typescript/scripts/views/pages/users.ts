import { createNewUser } from '../../controllers/usersController';

export default function users() {
  return {
    template: `
    <div class="table-holder">
    <header class="table-heading">
        <h2>Users Table</h2>
        <button id="newUserLink">+ Add User</button>
    </header>
    <table cellpadding="10" class="user-table"> 
        <thead>
            <tr>
                <td>First name</td>
                <td>Last name</td>
                <td>Username</td>
                <td>Date of creation</td>
                <td>Date of last edit</td>
                <td colspan="2"></td>
            </tr>
        </thead>
        <tbody id="users-view">
            
        </tbody>
    </table>
  </div>`,
    listeners: [
      {
        targetId: 'newUserLink',
        eventType: 'click',
        callback: () => createNewUser()
      }
    ]
  };
}
