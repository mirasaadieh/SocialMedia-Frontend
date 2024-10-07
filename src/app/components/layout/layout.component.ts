import { Component,OnInit } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  posts:Post[] = [];
  constructor(private postService:PostService,private loginService:LoginService){};
 
  ngOnInit(): void {
    const userId = this.loginService.getUserId() ?? 0;

    this.loginService.getPosts(userId).subscribe(
      (posts) => (this.posts = posts),
      (error) => console.error('Error fetching tasks:', error)
    );  }

}
