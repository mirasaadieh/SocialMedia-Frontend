import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  signinForm: FormGroup;
  errorMessage: string | undefined;
   userid:number = 0;
  constructor(private router: Router, private fb:FormBuilder,private loginService:LoginService) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin(){
    if (this.signinForm.valid) {
      const { username, password } = this.signinForm.value;
      this.loginService.validateUser(username, password).subscribe({
        next: (response) => {          
          if (response.valid) {
            console.log('Login Response:', response); 
            const loggedInUsername = response.user.userName;
            this.loginService.setUsername(loggedInUsername);
            console.log(loggedInUsername);
            this.loginService.setUserId(response.user.id); // Store userId        
            this.router.navigate(['/profile']);            
          } else {
            this.errorMessage = 'Invalid username or password';
          }
        },
        error: (err) => {
          this.errorMessage = 'An error occurred during login';
        }
      });
    }
  }
}

