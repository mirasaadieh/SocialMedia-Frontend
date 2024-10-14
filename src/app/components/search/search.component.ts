import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { Follower } from '../../interfaces/follower.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
  @Input() User: User | undefined; 
  users:User[] = [];
  loggedInUserId: number | undefined; 
  loggedInUserName: string | null = null; 
  isFollowingUser: boolean = false;  // To track follow/unfollow state
 constructor(private loginService:LoginService,private route:ActivatedRoute ){}
 ngOnInit(): void {
  
   // Handle case when getUserId() returns null
   const userId = this.loginService.getUserId()??0;
  
   if (userId !== null) {
     this.loggedInUserId = userId;  // Assign if not null
   } else {
     console.error('User ID is null.');
   }
  console.log(this.loggedInUserId);
  
  if (this.User?.id) {
    this.checkIfFollowing(this.User.id);
  }

  this.loginService.getUsers(userId).subscribe({
    next: (response) => {
      this.users = response;
    },
    error: (error) => {
      console.error('Error fetching posts', error);
    }
  });
}
checkIfFollowing(targetUserID:number) {
  this.loginService.isFollowing(this.loggedInUserId!, targetUserID!).subscribe({
    next: (response: boolean) => {
      this.isFollowingUser = response; 
    },
    error: (error) => {
      console.error('Error checking follow status:', error);
    }
  });
}
toggleFollow(userId:number | undefined) {
  if (userId === undefined || this.loggedInUserId === undefined) {
    alert('User information is missing.');
    return;
  }
  if (this.isFollowingUser) {
    this.unfollowUser(userId);
  } else {
    this.followUser(userId);
  }
}
followUser(targetUserID: number | undefined): void {
  this.loggedInUserName = this.loginService.getUsername();
  if (!this.loggedInUserName) {
    alert('You must be logged in to follow someone.');
    return;
  }
  if (this.loggedInUserId && targetUserID) {
  const newFollower: Follower = {
    followerUserId: this.loggedInUserId,   // ID of the user who is following
    userid: targetUserID,  // ID of the user to be followed
    followerUserName: this.loggedInUserName
  };

  this.loginService.addFollower(newFollower).subscribe({
    next: (response) => {
      this.isFollowingUser = true;
      console.log('Follow successful:', response);
      alert('You have successfully followed the user.');
    },
    error: (error) => {
      console.error('Error following the user:', error);
      alert('Failed to follow the user. Please try again.');
    }
  });
  }else {
    alert('User ID information is missing.');
  }
}
unfollowUser(targetUserID:number) {

  this.loginService.deleteFollower(targetUserID).subscribe({
    next: (response) => {
      this.isFollowingUser = false;  // Update follow state
      alert('You have unfollowed this user.');
    },
    error: (error) => {
      console.error('Error unfollowing user:', error);
      alert('Failed to unfollow the user. Please try again.');
    }
  });
}
}
