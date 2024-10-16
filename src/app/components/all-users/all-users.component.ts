import { Component,OnInit,Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit{
  @Input() User:User | undefined;
  users:User[] = [];
  searchForm!: FormGroup;
  constructor(private loginService:LoginService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userName: ['']  // Initialize with an empty string
    });
    this.getUsers();
  }
  getUsers(){
    var userId = this.loginService.getUserId() ?? 0;
    var model= new User();
    model.userName=this.searchForm.get('userName')?.value;
    if(model.userName){
      this.loginService.userSearch(model.userName).subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (error) => {
          console.error('Error fetching user', error);
        }
      });
    }
    else{
    this.loginService.getUsers(userId).subscribe({
      next: (response) => {
        if (response && response.length > 0){
        this.users = response;}
        else {
          console.log("No users found.");
          alert("No users found.");
        }
      },
      error: (error) => {
        if (error.status === 404) {
          alert("No users found.");
        } else {
          console.error('Error fetching users', error);
        }
      }
    });
  }
  }
}
