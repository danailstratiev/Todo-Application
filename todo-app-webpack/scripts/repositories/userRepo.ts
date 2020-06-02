import { url_base } from "../constants";
import AuthenticationService from "../services";
import User from "../entities/user";

export default class UsersRepository {

    static getNextId(items:any) {

        if (items == undefined || null) {
            return 1;
        }
        
        return items[items.length - 1].id + 1;
    }

    static async addUser(item) {
        
        let items = await this.getAll();

        const id = this.getNextId(items);
        item.id = id;

        await this.createNewUser(item);
    }

    static async editUser(id, item) {
       

        this.updateUser(item, id);

    }
    
    static async getAll() {
        let response = await fetch(`${url_base}/user`,  {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });
        let parsedUsers = await response.json();

        return parsedUsers;
    }
    
    static async getById(userId: string){
        const response = await fetch(`${url_base}/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': AuthenticationService.getAuthorizationHeader()
            },
          });     
          
          return await response.json();     
    }
   

    static async createNewUser(user:any){
        return await fetch(`${url_base}/user/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(user)
        });        
    };

    
    static async updateUser(user: any, userId:string){
        let response = await fetch(`${url_base}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(user)
        });
    };
    
    
    static async deleteUser(userId: string){
        let response = await fetch(`${url_base}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            
        });        
    };
}