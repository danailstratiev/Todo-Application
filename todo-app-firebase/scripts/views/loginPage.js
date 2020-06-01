function loginPage() {
    return `<div class="loginForm"><fieldset>
    <legend>Login</legend>
    
    <div class="login-data">
        <div>
            <p style="color: red;" id="error"></p>
        </div>
        <div>
            <p><label for="name">Username</label></p>
            <p><i class="fas fa-user"></i> <input id="username" type="text" name="username" /></p>
        </div>
        <div>
            <p><label for="name">Password</label></p>
            <p><i class="fas fa-key"></i> <input id="password" type="password" name="password" /></p>
        </div>
        <div class="loginBtn">
            <p><input id="loginBtn" type="button" onclick="loginForm_Submit()" value="Login" /></p>
        </div>
    </div>
</fieldset>
</div>`;
}