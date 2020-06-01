class AssignmentTask{
    constructor(creatorId, receiverId, listId, title){
        this._creatorId = creatorId;
        this._receiverId = receiverId,
        this._listId = listId,
        this._title = title;
    }

    get id() {
        return this._id;
    }

    set id(x) {
        this._id = x;
    }

    get creatorId(){
        return this._creatorId;
    }

    set creatorId(x){
        this._creatorId = x;
    }

    get todoListId(){
        return this._listId;
    }

    set todoListId(x){
        this._listId = x;
    }

    get receiverId(){
        return this._receiverId;
    }

    set receiverId(x){
        this._receiverId = x;
    }

    get dateOfAssignment(){
        return this._dateOfAssignment;
    }

    set dateOfAssignment(x){
        this._dateOfAssignment = x;
    }

    get dateOfChange(){
        return this._dateOfChange;
    }

    set dateOfChange(x){
        this._dateOfChange = x;
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

    get lastModifierId(){
        return _lastModifierId;
    }

    set lastModifierId(x){
        this._lastModifierId = x;
    }
}