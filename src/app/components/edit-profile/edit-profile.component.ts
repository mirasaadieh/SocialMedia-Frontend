import { Component,OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
 user:User | undefined;
 editForm:FormGroup;
 userId:number | undefined;
constructor(private router: Router, private fb:FormBuilder,private loginService:LoginService){
  this.editForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    bio: ['', Validators.required],

  });
}
ngOnInit(): void {
   this.userId= this.loginService.getUserId()??0;
  // if (userId !== null && userId !== 0) {
    this.loginService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user = user; 
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  // } else {
  //   console.error('No valid user ID found');
  // }
}
edit(){
  var model= new User();
    model.userName=this.editForm.get('userName')?.value;
    model.email=this.editForm.get('email')?.value;
    model.password=this.editForm.get('password')?.value;
    model.bio=this.editForm.get('bio')?.value;
    model.id=this.userId;
    console.log(model);
    if (this.editForm.invalid) {
      alert("Please enter the fields.");
      return;
    }
   
  const userId = this.loginService.getUserId();
  if (userId != null) {
    this.loginService.updateUser(userId, model).subscribe({
      next: (response) => {
        
        console.log('User updated successfully:', response);
        this.router.navigate(["/profile"]);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  } else {
    console.error('User ID or User object is invalid');
  }

}
}
