
import { Component,OnInit,Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
 user:User | undefined;
 posts:Post[] = [];
 likesCount: { [key: number]: number } = {};
 postCount: number | undefined;
 followerCount: number | undefined;
 errorMessage: string | undefined;
 
  constructor(private loginService:LoginService,private postService:PostService,private dialogRef:MatDialog){};
 
  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    console.log('Retrieved User ID:', userId);
    if (userId != null) {
      this.loginService.getUserById(userId).subscribe({
        next: (user) => {
          this.user = user;          
        },
        error: (err) => {
          this.errorMessage = 'Error fetching user data';
          console.error(err);
        }
      });
      this.loginService.NbOfPostsByUser(userId).subscribe({
        next: (count: number) => {
          this.postCount = count;  // Store the number of posts in postCount
          console.log(`User ${userId} has ${count} posts`);
        },
        error: (error) => {
          console.error(`Error fetching post count for user ${userId}:`, error);
        }
      });
      this.loginService.NbOfFollowersByUser(userId).subscribe({
        next: (count: number) => {
          this.followerCount = count;  
          console.log(`User ${userId} has ${count} followers`);
        },
        error: (error) => {
          console.error(`Error fetching post count for user ${userId}:`, error);
        }
      });
       // fetch posts
      this.loginService.getMyPosts(userId).subscribe({
        next: (response) => {
          
          this.posts = response;  
          this.posts.forEach(post => {
            if (post.postId !== undefined) {
            this.getLikesCount(post.postId);
            }
          });
          console.log('Posts fetched successfully:', response);
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        }
      });
    } else {
      this.errorMessage = 'No user ID found';
    }
  
  }
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
  displayFollowers(userId: number | undefined){
    const dialogReg = this.dialogRef.open(PopupComponent, {
      data: { userId: userId }},);     
  }
}