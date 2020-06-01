import '../styles/styles.css';
import '../styles/style.css';
import '../styles/login.css';
import '../styles/createUser.css';
import '../styles/todoTable.css';
import '../styles/createList.css';
import '../styles/taskManagement.css';




import { handleNavigation, render } from './utilities/helpers';
import AuthenticationService from './services/authenticationService';




import homePage from './views/pages/homePage';
import { renderView, handleMenu } from './utilities/helpers';

//window.addEventListener('load', init);

window.addEventListener('DOMContentLoaded', init);
function init(): void {
  renderView(homePage());
  handleMenu();
}



