import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';
import { Follower } from '../interfaces/follower.interface';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userId: number | null = null;
  private apiUrl = 'https://localhost:7106/api/User';
  private username: string | null = null;

  constructor(private http:HttpClient) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  validateUser(UserName: string, Password: string): Observable<any> {
    return this.http.post<any>("https://localhost:7106/api/User/login",{ UserName, Password });
  }
  addUser(user:User):Observable<User>{
    const url = `${this.apiUrl}/add`;
    return this.http.post<User>(url,user,httpOptions);
  }
  getPosts(userId:number): Observable<Post[]> {    
    const url = `${this.apiUrl}/GetOtherUsersPosts/${userId}`;
    return this.http.get<Post[]>(url);  
  }
  getMyPosts(userId:number): Observable<Post[]> {    
    const url = `${this.apiUrl}/getPost/${userId}`;
    return this.http.get<Post[]>(url);  
  }
  getUserById(userId:number):Observable<any>{
    const url = `${this.apiUrl}/getUser/${userId}`;
    return this.http.get<any>(url);
  }

  getUsers():Observable<User[]>{
    const url = `${this.apiUrl}/allUsers`;
    return this.http.get<User[]>(url);
  }
  setUserId(id: number): void {
    this.userId = id;
    localStorage.setItem('userId', id.toString());  
  }

  getUserId(): number | null {
    if (this.userId !== null) {
      return this.userId;  
    }

    const storedId = localStorage.getItem('userId');
    if (storedId !== null) {
      this.userId = parseInt(storedId, 10);  
      return this.userId;
    }

    return null;  
  }

  setUsername(username: string): void {
    if (username) {
      this.username = username;
      localStorage.setItem('username', username);  // Optionally store in localStorage for persistence
    } else {
      console.error('Attempted to set undefined username');
    }
  }
  
  getUsername(): string | null {
    return this.username || localStorage.getItem('username');
  }
  
  updateUser(userId:number,user:User):Observable<User>{  
    const url = `${this.apiUrl}/update/${userId}`;
    return this.http.put<User>(url,user,httpOptions);
  }
  getPostByUserId(userId:number):Observable<Post[]>{
    const url = `${this.apiUrl}/post/${userId}`;
    return this.http.get<Post[]>(url);
  }
  NbOfPostsByUser(userId:number): Observable<any> {   
    const url = `${this.apiUrl}/countPosts/${userId}`;
    return this.http.get<any>(url);  
  }
  NbOfFollowersByUser(userId:number): Observable<any> {   
    const url = `${this.apiUrl}/countFollowers/${userId}`;
    return this.http.get<any>(url);  
  }
  userSearch(username:string): Observable<User[]> {   
    const url = `${this.apiUrl}/search/${username}`;
    return this.http.get<User[]>(url);  
  }
  getFollowersByUserId(userId:number):Observable<Follower[]>{
    const url = `${this.apiUrl}/Followers/${userId}`
    return this.http.get<Follower[]>(url);
  }
  addFollower(follower:Follower):Observable<Follower>{
    const url = 'https://localhost:7106/api/Follower/add';
    return this.http.post<Follower>(url,follower,httpOptions);
  }
  deleteFollower(id:number):Observable<any>{
    const url = `https://localhost:7106/api/Follower/delete/${id}`;
    return this.http.delete<any>(url,httpOptions);
  }
  // Method to check if the logged-in user is following the target user
  isFollowing(loggedInUserId: number, targetUserId: number): Observable<boolean> {
    const url = `https://localhost:7106/api/Follower/isFollowing/${loggedInUserId}/${targetUserId}`;

    return this.http.get<boolean>(url,httpOptions);
  }
  logout() {
    // Clear the token or session data
    localStorage.removeItem('token');  // or sessionStorage.removeItem('token');
    
    // Optionally, clear other user data from storage if needed
    localStorage.removeItem('userId');
  }
}
