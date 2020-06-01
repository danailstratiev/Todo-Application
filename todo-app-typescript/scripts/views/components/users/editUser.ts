import {submitEditUserForm} from '../../../controllers/usersController';

export default function editUserPage(){
    return {
        template:`
        <div class="wrapper">
        <header class="create-heading">
            <h2>Edit User</h2>
        </header>
        <div class="create-user-section">
            <form>
                <input type="hidden" id="user-id">
                <div class="create-form-data">
                    <div>
                        <label for="firstName">First Name</label>
                        <input type="text" name="edit-firstname" id="edit-firstname" placeholder="First name">
                        <p>Default state</p>
                    </div>
                    <div>
                        <label for="lastName">Last Name</label>
                        <input type="text" name="edit-firstname" id="edit-lastname" placeholder="Last name">
                        <p>Default state</p>                    
                    </div>
                    <div>
                        <label for="username">Username</label>
                        <input type="text" name="edit-firstname" id="edit-username" placeholder="Username">
                        <p>Default state</p>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="text" name="edit-firstname" id="edit-password" placeholder="Password">
                        <p>Default state</p>
                    </div>
                </div>
                <div class="create-user-btn">
                <button id="editUserBtn">Edit User</button>
                </div>
            </form>
        </div>
        </div>
        `,

        listeners: [
            {
              targetId: 'editUserBtn',
              eventType: 'click',
              callback: () => submitEditUserForm()
            }
          ]
        };
}