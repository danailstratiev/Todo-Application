import { submitLoginForm } from '../events/events'

export default function loginPage() {
    return {template:`<div class="loginForm">
    <form>
    <fieldset>
    <legend>Login</legend>
    
    <div class="login-data">
        <div>
            <p id="error" class="error"></p>
        </div>
        <div>
            <p><label for="username">Username</label></p>
            <p><i class="fas fa-user"></i> <input id="username" type="text" name="username" /></p>
        </div>
        <div>
            <p><label for="password">Password</label></p>
            <p><i class="fas fa-key"></i> <input id="password" type="password" name="password" /></p>
        </div>
        <div class="loginBtn">
            <p><input id="loginBtn" type="button" value="Login" /></p>
        </div>
    </div>
    </fieldset>
    </form>
    </div>`,
    listeners: [
        {
            targetId: 'loginBtn',
            eventType: 'click',
            callback: submitLoginForm
        }
      ]
    };
}