
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{

  loginForm:FormGroup;
  users:User[] = [];
  constructor(private router: Router, private fb:FormBuilder,private loginService:LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {} 
  
  login() {
    var model= new User();
    model.userName=this.loginForm.get('username')?.value;
    model.email=this.loginForm.get('email')?.value;
    model.password=this.loginForm.get('password')?.value;
    console.log(model);

    if (this.loginForm.invalid) alert("Please enter valid email, username and password.");
    else {      
      this.loginService.addUser(model).subscribe({
        next: (response) => {
          console.log("User added successfully:", response);
          this.router.navigate(['/signin']);
        },
        error: (error) => {
          console.error("Error occurred while adding user:", error);
          alert("Login failed. Please try again.");
        }
      });
    }
  }
}
  
