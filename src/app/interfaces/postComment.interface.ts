export class PostComment{
    id?:number;
    userId?:number;
    postId?:number;
    text:string;
    userName:string;
    constructor(){
        this.text = '';
        this.userName = '';
    }
}