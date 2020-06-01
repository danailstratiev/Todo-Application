import { url_base } from "../utilities/constants";
import AuthenticationService from "./authenticationService";

export default class ToDoListService{
    

    static getNextId(items) {

        if (items == undefined || null || []) {
            return 1;
        }

        return items[items.length - 1].id + 1;
    }

    static async addToDoList(item) {
        let items = await this.getAllToDoLists();
        
        const id = this.getNextId(items);
        item.id = id;

        await this.createNewToDoList(item);
    }

    static async getAllToDoLists() {
        let response = await fetch(`${url_base}/list`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });


        if (response.ok) {
        let parsedLists = await response.json();
            return parsedLists;
        }
        
        return null;
    }
    
    static async getToDoListById(todoListId:string){
        let response = await fetch(`${url_base}/list/${todoListId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });
        let parsedList = await response.json();
       
        return parsedList;
    }
    
    static async createNewToDoList(todolist: any){
        return await fetch(`${url_base}/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(todolist)
        })
    };
    
    static async updateToDoList(todoList:any, todoListId:string){
        let response = await fetch(`${url_base}/list/${todoListId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(todoList)
        });
    };
    
    
    static async deleteToDoList(todoListId:string){
        let response = await fetch(`${url_base}/list/${todoListId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });        
    };

    static async shareToDoList(todoListId:string, receiverId:string){
        let response = await fetch(`${url_base}/list/${todoListId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify({"userId": receiverId})
        });
    }
}
