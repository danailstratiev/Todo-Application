import { url_auth, url_base, Token, LoggedUser } from '../utilities/constants';
import UserService from './userService';

export default class AuthenticationService {

   public static async authenticate(username:string, password:string){
        const response = await fetch(`http://52.164.252.100:8081/api/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               username,
               password
            })
        });
       
        console.log(response);

        if (response && response.ok) {
            const result = await response.json();
            
            console.log(result);
            
            const token:string = result.token;
            const userId:string = result.userId;
            
            window.sessionStorage.setItem(Token, token);
            const loggedUser = await UserService.getById(userId);
            window.sessionStorage.setItem(LoggedUser, JSON.stringify({
                id: userId,
                isAdmin: loggedUser.isAdmin
            }));
        }
    }


    public static getLoggedUser() {

        return JSON.parse(window.sessionStorage.getItem(LoggedUser));
    }

    static logout() {

         window.sessionStorage.removeItem(LoggedUser);
         window.sessionStorage.removeItem(Token);
    }

    static getAuthorizationHeader(): string{
        return 'Bearer ' + window.sessionStorage.getItem(Token);
    }
}