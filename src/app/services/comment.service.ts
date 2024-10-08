import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
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
export class CommentServiceService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiUrl;
  // private apiUrl = 'https://localhost:7106/api/Comment';
 addComment(comment:PostComment):Observable<PostComment>{
  const url = `${this.apiUrl}/Comment/add`;
  return this.http.post<PostComment>(url,comment,httpOptions);
 }
}
