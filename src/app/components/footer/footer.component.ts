import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
constructor(private loginService:LoginService, private router:Router) { }

  onLogout(){
    this.loginService.logout();
    this.router.navigate(['/signin']);
   }
}
