export default class User{
    constructor(
        public username: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public isAdmin: boolean,
        public creatorId: string,
       
    ){}
    public id: string;
    public createDate: string;
    public updateDate: string;
    public updaterId: string;
}