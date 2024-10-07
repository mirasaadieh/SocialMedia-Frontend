import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../../services/post.service';
import { PostComment } from '../../interfaces/postComment.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CommentServiceService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-popup',
  templateUrl: './comment-popup.component.html',
  styleUrl: './comment-popup.component.css'
})
export class CommentPopupComponent implements OnInit{
  pComments : PostComment[] = [];
  isPopupVisible: boolean = false;
  commentForm : FormGroup;

  constructor(private commentService:CommentServiceService,private loginService:LoginService,private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { postId: number },private postService:PostService){
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getComments(this.data.postId);
  }
  getComments(postId: number): void {
    this.isPopupVisible = true;
    this.postService.getCommentsByPostID(postId).subscribe({
      next: (response) => {
        this.pComments = response; 
      },
      error: (error) => {
        console.error('Error fetching followers:', error);
      }
    });
  }
  add(){
    const userId = this.loginService.getUserId();
    const userName = this.loginService.getUsername() ?? 'Guest';
    var model = new PostComment();
    model.text=this.commentForm.get('text')?.value;
    model.postId=this.data.postId;
    model.userName= userName ;
    model.userId=userId ?? undefined;
    console.log(model);
    if (this.commentForm.invalid) alert("Please enter the fields.");
    else {      
      this.commentService.addComment(model).subscribe({
        next: (response) => {
          console.log("comment added successfully:", response);
          alert("Comment Sent Successfully");
        },
        error: (error) => {
          console.error("Error occurred while adding comment:", error);
          alert("Please try again.");
        }
      });
    }
  }
}
