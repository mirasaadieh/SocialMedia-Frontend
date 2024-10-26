import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {filter, Observable} from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { Like } from '../interfaces/like.interface';
import { PostComment } from '../interfaces/postComment.interface';
import { environment } from '../../environments/environment';
import { SignalService } from './signal.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = environment.apiUrl;
  // private apiUrl = 'https://localhost:7106/api/Post';
  constructor(private http:HttpClient,private signalRService: SignalService) {
      // Start the SignalR connection when the service is instantiated
      this.signalRService.startConnection();
   }
 
  deletePost(postId:number):Observable<Post>{
    const url = `${this.apiUrl}/Post/delete/${postId}`;
    return this.http.delete<Post>(url,httpOptions);
  }
  addPost(post:Post):Observable<Post>{
    const url = `${this.apiUrl}/Post/create`;
    return this.http.post<Post>(url,post,httpOptions);
  }
  getCountofLikes(postId:number): Observable<any> {   
    // const url = `${this.apiUrl}/Post/countLikes/${postId}`;
    // return this.http.get<any>(url); 
    return this.signalRService.likeCount$.pipe(
      // Filter to only get the count for the specific postId
      filter(data => data.postId === postId)
    ); 
  }
  getCountofCmnts(postId:number): Observable<any> {   
    // const url = `${this.apiUrl}/Post/countComments/${postId}`;
    // return this.http.get<any>(url);  
    return this.signalRService.commentCount$.pipe(
      // Filter to only get the count for the specific postId
      filter(data => data.postId === postId)
    );
  }
  likePost(like:Like):Observable<Like>{
    const url = `${this.apiUrl}/Like/add`;
    return this.http.post<Like>(url,like,httpOptions);
  }
  unlikePost(likeId:number):Observable<Post>{
    const url = `${this.apiUrl}/Like/delete/${likeId}`;
    return this.http.delete<Post>(url,httpOptions);
  }
  getCommentsByPostID(postId:number):Observable<PostComment[]>{
    const url = `${this.apiUrl}/Post/Comments/${postId}`;
    return this.http.get<PostComment[]>(url);
  }
}
