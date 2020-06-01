import AuthenticationService from '../services/authenticationService';
import { LoggedUser } from '../utilities/types';


import login from '../views/pages/login';
import homePage from '../views/pages/homePage';

import { main_content_selector } from '../utilities/constants';
import { handleNavigation, render, renderView, handleMenu } from '../utilities/helpers';


  export async function submitLoginForm() {
  event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    try {
       AuthenticationService.authenticate(username, password);
      const loggedUser = AuthenticationService.getLoggedUser();
  
      if (!loggedUser) {
        (document.getElementById('error') as HTMLElement).innerHTML = 'User doesn\'t exist';
      } else {
        
        renderView(homePage());
        handleMenu();
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  
  }

  


/**
 * Handle the event for logout
 */
export function logout(): void {
  AuthenticationService.logout();
  handleNavigation();
  render(main_content_selector, login());
}
