import { Component,OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../interfaces/post.interface';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit{
  postForm : FormGroup;
  selectedFile: File | null = null;
   
  constructor(private fileUploadService: FileUploadService,private loginService:LoginService,private postService:PostService,private fb:FormBuilder){
    this.postForm = this.fb.group({
      image: ['', Validators.required],
      caption: ['']
      
    });
  }
  ngOnInit(): void {
    const userId = this.loginService.getUserId();
    console.log('Retrieved User ID:', userId);
    
  }
  // addPost(){
  //   var model = new Post();
  //   model.Image=this.postForm.get('image')?.value;
  //   model.caption=this.postForm.get('caption')?.value;
  //   model.userId=this.loginService.getUserId() ?? undefined;    
  //   console.log(model);
  //   if (this.postForm.invalid) alert("Please enter the fields.");
  //   else {      
  //     this.postService.addPost(model).subscribe({
  //       next: (response) => {
  //         console.log("Post added successfully:", response);
  //         alert("Post Created Successfully");
  //       },
  //       error: (error) => {
  //         console.error("Error occurred while adding post:", error);
  //         alert("Please try again.");
  //       }
  //     });
  //   }
  
  // }

  uploadPost() {
    if (this.postForm.invalid || !this.selectedFile) {
      alert('Please select an image.');
      return;
    }
      this.fileUploadService.uploadFile(this.selectedFile).subscribe((downloadURL) => {      
        var model = new Post();
        model.image=downloadURL;
        model.caption=this.postForm.get('caption')?.value;
        model.userId=this.loginService.getUserId() ?? undefined;    
        this.postService.addPost(model).subscribe({
          next: (response) => {
            console.log("Post added successfully:", response);
            alert("Post Created Successfully");
          },
          error: (error) => {
            console.error("Error occurred while adding post:", error);
            alert("Please try again.");
          }
        });
      });  
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
