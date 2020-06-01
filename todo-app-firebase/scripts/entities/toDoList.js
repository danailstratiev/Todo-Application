class ToDoList{
    constructor(title, dateOfCreation){
        this._title = title,
        this._dateOfCreation = dateOfCreation
        this._tasks = [];
    }

    get id() {
        return this._id;
    }

    set id(x) {
        this._id = x;
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
// Title
// Date of creation
// Id of the creator
// Date of last change
// Id of the user that did the last change
