import { Component,OnInit,Inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Follower } from '../../interfaces/follower.interface';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit{
  followers : Follower[] = [];
  isPopupVisible: boolean = false;
  constructor(private loginService:LoginService, @Inject(MAT_DIALOG_DATA) public data: { userId: number }){}
  ngOnInit(): void {
    this.getFollowers(this.data.userId);
  }
  getFollowers(userId: number): void {
    this.isPopupVisible = true;
    this.loginService.getFollowersByUserId(userId).subscribe({
      next: (response) => {
        this.followers = response; 
      },
      error: (error) => {
        console.error('Error fetching followers:', error);
      }
    });
  }
  closePopup() {
    this.isPopupVisible = false; // Hide popup
  }
}
