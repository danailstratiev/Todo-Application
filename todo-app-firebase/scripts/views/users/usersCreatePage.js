function usersCreatePage() {
    return `
    <div class="user-createpage">
    
    <fieldset>
        <legend>User</legend>
        <div class="user-create">
        <div>
            <p>Username:</p>
            <p><input type="text" id="username" name="username" /></p>
            <p id="username-error" class="error"></p>
        </div>
        <div>
            <p>Password:</p>
            <p><input type="password" id="password" name="password" /></p>
            <p id="password-error" class="error"></p>

        </div>
        <div>
            <p>First Name:</p>
            <p><input type="text" id="firstName" name="firstName" /></p>
            <p id="firstname-error" class="error"></p>

        </div>
        <div>
            <p>Last Name:</p>
            <p><input type="text" id="lastName" name="lastName" /></p>
            <p id="lastname-error" class="error"></p>
        </div>
        <div>
            <p><input type="hidden" id="dateOfCreation" name="dateOfCreation" /></p>
            <p><input type="hidden" id="userCreatorId" name="userCreatorId" /></p>
        </div>
        <div>
            <p>Is Admin:</p>
            <p><label class="switch">
                <input id="user-create-toggler" type="checkbox" >
                <span class="slider round"></span>
                </label>
            </p>
        </div>
        <div class="editBtn">
            <p><input type="button" onclick="usersCreateForm_Submit()" value="Save" /></p>
        </div>
        </div>
    </fieldset>
    </div>
    `;
}