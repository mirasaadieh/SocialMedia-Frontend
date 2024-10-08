import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { Like } from '../interfaces/like.interface';
import { PostComment } from '../interfaces/postComment.interface';
import { environment } from '../../environments/environment';
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
  constructor(private http:HttpClient) { }
  // getPosts(): Observable<Post[]> {    
  //   return this.http.get<Post[]>(this.apiUrl);  
  // }
  // getPosts(userId:number): Observable<Post[]> {    
  //   const url = `${this.apiUrl}/GetOtherUsersPosts/${userId}`;
  //   return this.http.get<Post[]>(this.apiUrl);  
  // }
  // getMyPosts(userId:number): Observable<Post[]> {    
  //   const url = `${this.apiUrl}/getPost/${userId}`;
  //   return this.http.get<Post[]>(this.apiUrl);  
  // }
  deletePost(postId:number):Observable<Post>{
    const url = `${this.apiUrl}/Post/delete/${postId}`;
    return this.http.delete<Post>(url,httpOptions);
  }
  addPost(post:Post):Observable<Post>{
    const url = `${this.apiUrl}/Post/create`;
    return this.http.post<Post>(url,post,httpOptions);
  }
  getCountofLikes(postId:number): Observable<any> {   
    const url = `${this.apiUrl}/Post/countLikes/${postId}`;
    return this.http.get<any>(url);  
  }
  getCountofCmnts(postId:number): Observable<any> {   
    const url = `${this.apiUrl}/Post/countComments/${postId}`;
    return this.http.get<any>(url);  
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
