class TaskRepository{

    static getNextId(items) {

        if (items == undefined | null) {
            return 1;
        }

        return items[items.length - 1]._id + 1;
    }

    static async addTask(item) {
        let items = await this.getAllTasks();
       
        const id = this.getNextId(items);
        item._id = id;

        this.createNewTask(item);
    }

    static async getAllTasks() {
        let response = await fetch(tasksUrl + 'tasks.json');
        let parsedTasks = await response.json();
        if (parsedTasks == undefined | null) {
            return null;
        }
        let tasks = Object.values(parsedTasks);
        
        return tasks;
    }

    static async getAllTasksInAList(taskListId) {
        let response = await fetch(tasksUrl + 'tasks.json');
        let parsedTasks = await response.json();
        if (parsedTasks == undefined | null) {
            return null;
        }
        let tasks = Object.values(parsedTasks).filter(x => x._listId == taskListId);
        
        return tasks;
    }
    
    static async getTaskById(taskId){
        let tasks = await this.getAllTasks();

        for (let i = 0; i < tasks.length; i++) {
            const currentItem = tasks[i];
            if (currentItem._id == taskId) {
                
                return currentItem;
            }
        }
    }
    
    static createNewTask(task){
        return fetch(tasksUrl + 'tasks.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        })
        .then(x => x.json());
    };
    
    static async updateTask(task, taskId){
        let response = await fetch(tasksUrl + 'tasks.json');
        let parsedTasks = await response.json();

        for (let [key, value] of Object.entries(parsedTasks)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == taskId) {
                let taskKey = currentItem[0];
                await fetch(`${tasksUrl}tasks/${taskKey}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(task)
                });                
            }
          }
    };
    
    static async deleteTask(taskId){
        let response = await fetch(tasksUrl + 'tasks.json');
        let parsedLists = await response.json();

        for (let [key, value] of Object.entries(parsedLists)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == taskId) {
                let taskKey = currentItem[0];
                await fetch(`${tasksUrl}tasks/${taskKey}.json`, {
                    method: 'DELETE',
                });                
            }
          }
    };  
    
    static async addAssignmentTask(item){
        const items = await this.getAllAssignmentTasks();

        const id = this.getNextId(items);
        item._id = id;

        await this.createAssignmentTask(item);
    }

    static async createAssignmentTask(assignmentTask){
        return await fetch(tasksUrl + 'assignedtasks.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(assignmentTask)
        })
    };

    static async updateAssignmentTask(assignmentTask, taskId){
        let response = await fetch(tasksUrl + 'assignedtasks.json');
        let parsedTasks = await response.json();

        for (let [key, value] of Object.entries(parsedTasks)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == taskId) {
                let taskKey = currentItem[0];
                await fetch(`${tasksUrl}assignedtasks/${taskKey}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(assignmentTask)
                });                
            }
          }
    };

    static async deleteAssignmentTask(taskId){
        let response = await fetch(tasksUrl + 'assignedtasks.json');
        let parsedTasks = await response.json();

        for (let [key, value] of Object.entries(parsedTasks)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == taskId) {
                let taskKey = currentItem[0];
                await fetch(`${tasksUrl}assignedtasks/${taskKey}.json`, {
                    method: 'DELETE',
                });                
            }
        }
    };

    static async getAllAssignmentTasks(){
        let response = await fetch(tasksUrl + 'assignedtasks.json');
        let parsedTasks = await response.json();

        if (parsedTasks == undefined | null) {
            return null;
        }

        let assignedTasks = Object.values(parsedTasks);
        
        return assignedTasks;
    }

    static async getAllAssignmentTasksForUser(userId){
        let response = await fetch(tasksUrl + 'assignedtasks.json');
        let parsedTasks = await response.json();

        if (parsedTasks == undefined | null) {
            return null;
        }

        let assignedTasks = Object.values(parsedTasks).filter(x => x._receiverId == userId);
        
        return assignedTasks;
    }
    
    static async getAllAssignmentTasksForUserInList(userId, listId){
        let allAssignments = await this.getAllAssignmentTasksForUser(userId);
        
        if (allAssignments == undefined | null) {
            return null;
        }

        let currentListAssignments = allAssignments.filter(x => x._listId == listId);

        return currentListAssignments;
    }

    static async getAssignmentTaskById(id){
        let allAssignments = await this.getAllAssignmentTasks();

        for (let i = 0; i < allAssignments.length; i++) {
            const element = allAssignments[i];
            
            if (element._id == id) {
                return element;
            }
        }
    }

    static async deleteAssignmentTaskByList(listId){
        let response = await fetch(tasksUrl + 'assignedtasks.json');
        let parsedTasks = await response.json();

        for (let [key, value] of Object.entries(parsedTasks)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._listId == listId) {
                let taskKey = currentItem[0];
                await fetch(`${tasksUrl}assignedtasks/${taskKey}.json`, {
                    method: 'DELETE',
                });                
            }
        }
    };

    static async deleteAssignmentTasksFromList(listId, userId){
        let allAssignments = await this.getAllAssignmentTasksForUserInList(userId, listId);
        const deletionElements = allAssignments.length;

        for (let i = 0; i < deletionElements; i++) {
            let element = allAssignments[i];
            
            await this.deleteAssignmentTask(element._id);
            i--;
        }
    }
}