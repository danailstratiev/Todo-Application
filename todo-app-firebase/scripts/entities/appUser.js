class AppUser{
    constructor(username, password, firstName, lastName, isAdmin, creatorId){
        this._username = username;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._isAdmin = isAdmin;
        this._creatorId = creatorId;
    }

    get id() {
        return this._id;
    }

    set id(x) {
        this._id = x;
    }

    get username() {
        return this._username;
    }

    set username(x) {
        this._username = x;
    }

    get password() {
        return this._password;
    }

    set password(x) {
        this._password = x;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(x) {
        this._firstName = x;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(x) {
        this._lastName = x;
    }

    get isAdmin() {
        return this._isAdmin;
    }

    set isAdmin(x) {
        this._isAdmin = x;
    }

    get dateOfCreation(){
        return this._dateOfCreation;
    }

    set dateOfCreation(x){
        this._dateOfCreation = x;
    }

    get creatorId(){
        return this._creatorId;
    }

    set creatorId(x){
        this._creatorId = x;
    }

    get dateOfLastChange(){
        return this._dateOfLastChange;
    }

    set dateOfLastChange(x){
        this._dateOfLastChange = x;
    }

    get lastModifierId(){
        return this._lastModifierId;
    }

    set lastModifierId(x){
        this._lastModifierId = x;
    }
}

// Id
// Username
// Password
// First Name
// Last Name
// Date of creation
// Id of the creator
// Date of last change
// Id of the user that did the last change
