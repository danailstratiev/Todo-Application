import { loadUsers } from '../../controllers/usersController';
import { logout } from '../../controllers/loginController';

export default function navigation() {
  return {
    template: `<nav class="header-menu">
          <ul>
            <li id="usersLink" class="nav-item"><a class="nav-link">Manage Users</a></li>
            <li id="logoutLink" class="nav-item"><a class="nav-link">Logout</a></li>
          </ul>
        </nav>`,
    listeners: [
      {
        targetId: 'usersLink',
        eventType: 'click',
        callback: loadUsers
      }, {
        targetId: 'logoutLink',
        eventType: 'click',
        callback: logout
      }
    ]
  };
}
