export default class User{
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public isAdmin: boolean,
        public creatorId: string,
        public updaterId: string,
        public createDate: string,
        public updateDate: string,
    ){}    
}