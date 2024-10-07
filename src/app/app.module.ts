import "@angular/compiler"
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, Routes,RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { TitleComponent } from './components/title/title.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyPostsComponent } from './components/my-posts/my-posts.component';
import { SearchComponent } from './components/search/search.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from "@angular/material/dialog";
import { PopupComponent } from './components/popup/popup.component';
import { CommentPopupComponent } from './components/comment-popup/comment-popup.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
const appRoutes : Routes = [
  {
    path: '', redirectTo:'login', pathMatch:'full'
},
{
    path: 'login', component:LoginComponent
},
{
   path: 'home', component:LayoutComponent
},
{
  path: 'profile', component:ProfileComponent
},
{
  path: 'signin', component:SigninComponent
},
{
  path: 'edit-profile', component:EditProfileComponent
},
{
  path: 'create-post', component:CreatePostComponent
},
{
  path: 'search', component:AllUsersComponent
},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
    LoginComponent,
    LayoutComponent,
    FooterComponent,
    TitleComponent,
    ProfileComponent,
    SigninComponent,
    CreatePostComponent,
    EditProfileComponent,
    MyPostsComponent,
    SearchComponent,
    AllUsersComponent,
    PopupComponent,
    CommentPopupComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
