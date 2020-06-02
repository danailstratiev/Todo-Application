import { url_base } from "../constants";
import AuthenticationService from "../services";

export default class TaskRepository{


    static async getNextId(listId:string) {

        const items = await this.getAllTasksInAList(listId);

        if (items === undefined || null || []) {
            return 1;
        }

        return items[items.length - 1].id + 1;
    }

    static async addTask(item) {
        let listId = item.listId;
       
        const id = await this.getNextId(listId);
        item.id = id;
        
       await this.createNewTask(item);
    }

    static async getAllTasksInAList(taskListId:string) {
        let response = await fetch(`${url_base}/list/${taskListId}/task`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });
        let parsedTasks = await response.json();

        return parsedTasks;
    }
    
    static async getTaskById(taskListId:string,taskId:string){
        let response = await fetch(`${url_base}/list/${taskListId}/task/${taskId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
        });

        let parsedTask = await response.json();

        return parsedTask;
    }
    
    static createNewTask(task: any){
        return fetch(`${url_base}/list/${task.listId}/task`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': AuthenticationService.getAuthorizationHeader()
        },
            body: JSON.stringify(task)
        })
    };
    
    static async updateTask(task:any, taskId:string){
        let response = await fetch(`${url_base}/list/${task.listId}/task/${taskId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify(task)
           }
        );        
    };
    
    
    static async deleteTask(listId:string, taskId:string){
        let response = await fetch(`${url_base}/list/${listId}/task/${taskId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        });
     };  

     static async assignTaskToUser(userId:string, listId:string, taskId:string){
        let response = await fetch(`${url_base}/list/${listId}/task/${taskId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            },
            body: JSON.stringify({"userId": userId})
        })
     }

     static async getTaskAssignees(listId:string, taskId:string){
        let response = await fetch(`${url_base}/list/${listId}/task/${taskId}/assignees`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': AuthenticationService.getAuthorizationHeader()
            }
        })

        return response.json();
     }
}

