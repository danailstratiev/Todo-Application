import {usersEditForm_Submit} from "../../events/events"

export default function usersEditPage() {
    return {template:`<input type="hidden" id="id" name="id" />
    <div class="user-editpage">
    <form>
    <fieldset>
        <legend>User</legend>
        <div class="user-edit">
        <div>
            <p>Username:</p>
            <p><input type="text" id="username" name="username" /></p>
            <p id="username-edit-error" class="error"></p>
        </div>
        <div>
            <p>Password:</p>
            <p><input type="password" id="password" name="password" /></p>
            <p id="password-edit-error" class="error"></p>
        </div>
        <div>
            <p>First Name:</p>
            <p><input type="text" id="firstName" name="firstName" /></p>
            <p id="firstname-edit-error" class="error"></p>
        </div>
        <div>
            <p>Last Name:</p>
            <p><input type="text" id="lastName" name="lastName" /></p>
            <p id="lastname-edit-error" class="error"></p>
        </div>
        <div>
            <p><input type="hidden" id="dateOfCreation" name="dateOfCreation" /></p>
            <p><input type="hidden" id="userCreatorId" name="userCreatorId" /></p>
        </div>
        <div>
            <p>Is Admin:</p>
            <p><label  class="switch">
                <input id="user-edit-toggler" type="checkbox" >
                <span class="slider round"></span>
                </label>
            </p>
        </div>
        <div class="editBtn">
            <p><input type="button" id="editUserBtn" value="Save" /></p>
        </div>
        </div>
    </fieldset>
    </form>
    </div>`,
    listeners: [
        {
            targetId: 'editUserBtn',
            eventType: 'click',
            callback: usersEditForm_Submit
        }
      ]
    };
}