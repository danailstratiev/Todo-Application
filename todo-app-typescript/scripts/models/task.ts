export default class Task{
    constructor(
        public id: string,
        public title:string,
        public description:string,
        public taskListId:string,
        public isComplete:boolean,
        public creatorId: string,
        public updatorId: string,
        public createDate:string,
        public updateDate: string
    ) {     
    }
}