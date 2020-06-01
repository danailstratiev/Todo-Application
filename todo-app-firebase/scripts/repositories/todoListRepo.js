class ToDoListRepository{

    static getNextId(items) {

        if (items == undefined | null) {
            return 1;
        }

        return items[items.length - 1]._id + 1;
    }

    static async addToDoList(item) {
        let items = await this.getAllToDoLists();
       
        const id = this.getNextId(items);
        item._id = id;

        this.createNewToDoList(item);
    }

    static async getAllToDoLists() {
        let response = await fetch(todoListUrl + 'todolists.json');
        let parsedLists = await response.json();
        if (parsedLists == undefined | null) {
            return null;
        }
        let todolists = Object.values(parsedLists);
        
        return todolists;
    }
    
    static async getToDoListById(todoListId){
        let todoLists = await this.getAllToDoLists();

        for (let i = 0; i < todoLists.length; i++) {
            const currentItem = todoLists[i];
            if (currentItem._id == todoListId) {
                
                return currentItem;
            }
        }
    }
    
    static createNewToDoList(todolist){
        return fetch(todoListUrl + 'todolists.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todolist)
        })
        .then(x => x.json());
    };
    
    static async updateToDoList(todoList, todoListId){
        let response = await fetch(todoListUrl + 'todolists.json');
        let parsedLists = await response.json();

        for (let [key, value] of Object.entries(parsedLists)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == todoListId) {
                let todoListKey = currentItem[0];
                await fetch(`${todoListUrl}todolists/${todoListKey}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(todoList)
                });                
            }
          }
    };
    
    
    static async deleteToDoList(todoListId){
        let response = await fetch(todoListUrl + 'todolists.json');
        let parsedLists = await response.json();

        for (let [key, value] of Object.entries(parsedLists)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == todoListId) {
                let todoListKey = currentItem[0];
                await fetch(`${todoListUrl}todolists/${todoListKey}.json`, {
                    method: 'DELETE',
                });                
            }
          }
    };

    static async createSharedToDoList(sharedlist){
        return await fetch(todoListUrl + 'sharedlists.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(sharedlist)
        })
    };

    static async shareToDoList(todoListId, receiverId, sharerId){
        const todoList = await this.getToDoListById(todoListId)
        let creatorId = todoList._creatorId;
        let sharedList = new SharedList(sharerId,creatorId, todoList._id, receiverId);

        await this.createSharedToDoList(sharedList);
    }

    static async deleteSharedList(todoListId){
        let response = await fetch(todoListUrl + 'sharedlists.json');
        let parsedLists = await response.json();

        for (let [key, value] of Object.entries(parsedLists)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._todoListId == todoListId) {
                let sharedListKey = currentItem[0];
                await fetch(`${todoListUrl}sharedlists/${sharedListKey}.json`, {
                    method: 'DELETE',
                });                
            }
        }
    }

    static async getAllSharedListsForUser(userId){
        let response = await fetch(todoListUrl + 'sharedlists.json');
        let parsedLists = await response.json();

        if (parsedLists == undefined | null) {
            return null;
        }
        let sharedLists = Object.values(parsedLists).filter(x => x._receiverId == userId);

        return sharedLists;
    }

    static async getSharedToDoListsForUser(userId){
        let sharedLists = await this.getAllSharedListsForUser(userId);
        let allToDoLists = await this.getAllToDoLists();
        let currentUserToDoLists = [];

        for (let i = 0; i < sharedLists.length; i++) {
            let currentSharedList = sharedLists[i];
            let currentToDoList = allToDoLists.filter(x => x._id == currentSharedList._todoListId)[0];
            currentUserToDoLists.push(currentToDoList);
        }
        
        return currentUserToDoLists;
    }

    static async getSharedListForReceiver(receiverId, listId){
        let sharedLists = await this.getAllSharedListsForUser(receiverId);
        
        if (sharedLists == undefined | null) {
            return null;
        }

        for (let i = 0; i < sharedLists.length; i++) {
            let currentList = sharedLists[i];
            
            if (currentList._todoListId == listId) {
                return currentList;
            }
        }
    }
}