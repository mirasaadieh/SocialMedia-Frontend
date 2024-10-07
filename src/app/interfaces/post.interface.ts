export class Post{
    image: string;
    caption: string;
    userName: string;
    postId?: number;
    userId?: number;
       constructor(){
        this.image='';
        this.caption='';
        this.userName=''
    }
}