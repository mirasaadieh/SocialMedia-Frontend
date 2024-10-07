export class User{
    id?:number;
    email: string;
    userName: string;
    password: string;
    bio: string;
    profileImg: string;
    constructor(){
        this.email='';
        this.userName='';
        this.password='';
        this.bio='';
        this.profileImg='';
    }
}