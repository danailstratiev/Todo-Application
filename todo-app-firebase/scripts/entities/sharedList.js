class SharedList{
    constructor(sharerId, creatorId, todoListId, receiverId){
        this._sharerId = sharerId;
        this._creatorId = creatorId;
        this._todoListId = todoListId;
        this._receiverId = receiverId; 
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
        return this._todoListId;
    }

    set todoListId(x){
        this._todoListId = x;
    }

    get receiverId(){
        return this._receiverId;
    }

    set receiverId(x){
        this._receiverId = x;
    }

    get dateOfShare(){
        return this._dateOfShare;
    }

    set dateOfShare(x){
        this._dateOfShare = x;
    }
}