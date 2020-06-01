class AuthenticationService {

    static loggedUser = 'loggedUser';

    static async authenticate(username, password) {

        const result = await UsersRepository.getByUsernameAndPassword(username, password);
        
        if (result != null)
            this.loggedUser = result;
            await window.sessionStorage.setItem(this.loggedUser, JSON.stringify(result));
    }

    static async getLoggedUser() {

        return JSON.parse(await window.sessionStorage.getItem(this.loggedUser));
    }

    static async logout() {

        await window.sessionStorage.removeItem(this.loggedUser);
    }
}