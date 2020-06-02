import { url_auth, url_base, Token, LoggedUser } from './constants';
import UsersRepository from './repositories/userRepo';

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
       

        if (response && response.ok) {
            const result = await response.json();
            
            const token:string = result.token;
            const userId:string = result.userId;
            
            window.sessionStorage.setItem(Token, token);
            const loggedUser = await UsersRepository.getById(userId);
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

    static getAuthorizationHeader(){
        return 'Bearer ' + window.sessionStorage.getItem(Token);
    }
}