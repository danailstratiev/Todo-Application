class UsersRepository {

    static users = 'users';

    static async count() {
        const items = await this.getAll();

        return items == null ? 0 : items.length;
    }

    static async getByUsernameAndPassword(username, password) {
        
        let response = await fetch(usersUrl + 'users.json');
        let items = await response.json();
        

        for (let [key, value] of Object.entries(items)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._username == username && currentItem[1]._password == password) {
                let currentUser = currentItem[1];

                
                return currentUser;
            }
          }
       

        return null;
    }

    static getNextId(items) {

        if (items == undefined | null) {
            return 1;
        }

        return items[items.length - 1]._id + 1;
    }

    static async addUser(item) {
        
        let items = await this.getAll();

        const id = this.getNextId(items);
        item._id = id;
        
        this.createNewUser(item);
    }

    static async editUser(id, item) {
        this.updateUser(item, id);
    }
    
    static async getAll() {
        let response = await fetch(usersUrl + 'users.json');
        let parsedUsers = await response.json();
        let users = Object.values(parsedUsers);
        return users;
    }
    
    static async getById(userId){
        let users = await this.getAll();

        for (let i = 0; i < users.length; i++) {
            const currentItem = users[i];
            if (currentItem._id == userId) {
                
                return currentItem;
            }
        }
    }
    
    static createNewUser(user){
        return fetch(usersUrl + 'users.json', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(x => x.json());
    };
    
    static async updateUser(user, userId){
        let response = await fetch(usersUrl + 'users.json');
        let parsedUsers = await response.json();

        for (let [key, value] of Object.entries(parsedUsers)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == userId) {
                let userKey = currentItem[0];
                await fetch(`${usersUrl}users/${userKey}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(user)
                });                
            }
          }
    };
    
    
    static async deleteUser(userId){
        let response = await fetch(usersUrl + 'users.json');
        let parsedUsers = await response.json();

        for (let [key, value] of Object.entries(parsedUsers)) {
            const currentItem = [key, value];
            
            if (currentItem[1]._id == userId) {
                let userKey = currentItem[0];
                await fetch(`${usersUrl}users/${userKey}.json`, {
                    method: 'DELETE',
                });                
            }
          }
    };
}