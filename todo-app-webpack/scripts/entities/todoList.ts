export default class ToDoList{
    constructor(
        public id: string,
        public title:string,
        public createDate:string,
        public creatorId: string,
        public updaterId: string,
        public updateDate: string
    ) {     
    }
}