import { Component,OnInit,Input } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { LoginService } from '../../services/login.service';
import { PostService } from '../../services/post.service';
import { Like } from '../../interfaces/like.interface';
import { MatDialog } from '@angular/material/dialog';
import { CommentPopupComponent } from '../comment-popup/comment-popup.component';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit{
 @Input() post:Post | undefined;
 posts:Post[] = [];
 likesCount: { [key: number]: number } = {};
 cmntsCount: { [key: number]: number } = {};
 likedPosts: { [postId: number]: boolean } = {}; // Tracks the liked status of each post
 likeIds: { [postId: number]: number } = {};
 constructor(private loginService:LoginService,private postService:PostService,private dialogRef:MatDialog) { }
  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    this.loadPosts();
  }
 
  loadPosts(): void {
    const userId = this.loginService.getUserId() ?? 0;
    this.loginService.getPosts(userId).subscribe({
      next: (response) => {
        this.posts = response;
        console.log('Post Image URL:', response);
        this.posts.forEach(post => {
          if (post.postId !== undefined) {
          this.getLikesCount(post.postId);
          this.getCmntsCount(post.postId);

          }
        });
      },
      error: (error) => {
        console.error('Error fetching posts', error);
      }
    });
  }

  // Get the count of likes for a specific post
  getLikesCount(postId: number): void {
    this.postService.getCountofLikes(postId).subscribe({
      next: (count) => {
        this.likesCount[postId] = count;  // Store likes count in an object by postId
      },
      error: (error) => {
        console.error(`Error fetching likes for post ${postId}`, error);
      }
    });
  }

  getCmntsCount(postId: number): void {
    this.postService.getCountofCmnts(postId).subscribe({
      next: (count) => {
        this.cmntsCount[postId] = count;  // Store likes count in an object by postId
      },
      error: (error) => {
        console.error(`Error fetching likes for post ${postId}`, error);
      }
    });
  }

  likePost(postId: number | undefined) {
    const userId = this.loginService.getUserId();
    if(!postId) return;
    if (userId) {
      const newLike: Like = {
        postId: postId,
        userId: userId
      };
     
      if (!this.likedPosts[postId]) {
      this.postService.likePost(newLike).subscribe({
        next: (response) => {
          console.log('Like added successfully:', response);
          this.likedPosts[postId] = true;        // Mark as liked
          this.likeIds[postId!] = response.id!; // Save the like ID for unliking
        },
        error: (error) => {
          console.error('Error adding like:', error);
        }
      });}
      else{
         // Unlike the post
      const likeId = this.likeIds[postId]; // Get the likeId saved earlier
      this.postService.unlikePost(likeId).subscribe({
        next: (response) => {
          console.log(`Post ${postId} unliked successfully.`);
          this.likedPosts[postId] = false; // Mark as unliked
        },
        error: (error) => {
          console.error('Error unliking post:', error);
        }
      });
      }
    } else {
      console.error('User is not logged in.');
    }
  }
  displayComments(postId: number | undefined){
    const dialogReg = this.dialogRef.open(CommentPopupComponent, {
      data: { postId: postId }},);     
  }

 
}