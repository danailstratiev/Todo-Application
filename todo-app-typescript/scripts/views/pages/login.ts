import { submitLoginForm } from '../../controllers/loginController';

export default function login() {
  return {
    template: `
          <div class="login-form">
            <div class="login-form-heading">
            <h2 class="section-heading">TODO APP</h2>
            <p>Welcome back! Please login to your account.</p>
            </div>
            <div id="error"></div>
            <form>
              <div class="login-data">              
              <div>
                <label  for="username"></label>
                <input type="text" id="username" name="username" placeholder=" Username"/>
              </div>
              <div>
                <label  for="password"></label>
                <input type="password" id="password" name="password" placeholder=" Password"/>
              </div>
              <div class="login-btn">
                <input type="submit" id="loginBtn" value="Login" />
              </div>
              </div>
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
