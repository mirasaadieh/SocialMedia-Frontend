import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private hubConnection: signalR.HubConnection | undefined;
  
  // Using BehaviorSubject to emit the latest counts
  private likeCountSubject = new BehaviorSubject<{ postId: number; count: number }>({ postId: 0, count: 0 });
  private commentCountSubject = new BehaviorSubject<{ postId: number; count: number }>({ postId: 0, count: 0 });

  likeCount$ = this.likeCountSubject.asObservable();
  commentCount$ = this.commentCountSubject.asObservable();

  constructor() { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://LinkUp.somee.com/api/postHub')  // Replace with your SignalR Hub URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
      
    // Listen for like count updates from the server
    this.hubConnection.on('ReceiveLikeCountUpdate', (postId: number, count: number) => {
      this.likeCountSubject.next({ postId, count });
    });

    // Listen for comment count updates from the server
    this.hubConnection.on('ReceiveCommentCountUpdate', (postId: number, count: number) => {
      this.commentCountSubject.next({ postId, count });
    });
  }
}
