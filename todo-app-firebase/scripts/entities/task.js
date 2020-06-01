class Task{
    constructor(title, description, isComplete, dateOfCreation){
        this._title = title,
        this._description = description,
        this._isComplete = isComplete,
        this._dateOfCreation = dateOfCreation
    }  
    
    get id() {
        return this._id;
    }

    set id(x) {
        this._id = x;
    }

    get listId(){
        return this._listId;
    }

    set listId(x){
        this._listId = x;
    }

    get title(){
        return this._title;
    }

    set title(x){
        this._title = x;
    }

    get description(){
        return this._description;
    }

    set description(x){
        this._description = x;
    }

    get isComplete(){
        return this._isComplete;
    }

    set isComplete(x){
        this._isComplete = x;
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
        return _lastModifierId;
    }

    set lastModifierId(x){
        this._lastModifierId = x;
    }
}


// Id
// Id of the List  (the Id of the ToDo list that the Task belongs to)
// Title
// Description
// IsComplete
// Date of creation
// Id of the creator
// Date of last change
// Id of the user that did the last change
