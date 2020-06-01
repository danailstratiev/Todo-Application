import {submitCreateUserForm} from '../../../controllers/usersController';

export default function createUser(){
    return {
        template:`
        <div class="wrapper">
        <header class="create-heading">
            <h2>Create User</h2>
        </header>
        <div class="create-user-section">
            <form>
                <div class="create-form-data">
                    <div>
                        <label for="firstName">First Name</label>
                        <input type="text" name="user-firstname" id="firstname" placeholder="First name">
                        <p>Default state</p>
                    </div>
                    <div>
                        <label for="lastName">Last Name</label>
                        <input type="text" name="user-firstname" id="lastname" placeholder="Last name">
                        <p>Default state</p>                    
                    </div>
                    <div>
                        <label for="username">Username</label>
                        <input type="text" name="user-firstname" id="username" placeholder="Username">
                        <p>Default state</p>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="text" name="user-firstname" id="password" placeholder="Password">
                        <p>Default state</p>
                    </div>
                </div>
                <div class="create-user-btn">
                <button id="createUserBtn">Create User</button>
                </div>
            </form>
        </div>
        </div>
        `,

        listeners: [
            {
              targetId: 'createUserBtn',
              eventType: 'click',
              callback: () => submitCreateUserForm()
            }
          ]
        };
}