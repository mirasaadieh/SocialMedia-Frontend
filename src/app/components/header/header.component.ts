import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  title = 'Link Up';
constructor(private loginService:LoginService, private router:Router) { }
ngOnInit(): void {
  
}
onLogout(){
  this.loginService.logout();
  this.router.navigate(['/signin']);
 }
}
