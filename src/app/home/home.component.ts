import { Component, OnInit, ViewChildren, ElementRef, QueryList, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postForm = new FormGroup({
    post: new FormControl('', Validators.required)
  });

  followForm = new FormGroup({
    follow: new FormControl('', Validators.required)
  });

  followedUsers: number[] = [];

  posts = [];

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.apiService.getFollowed({user: +sessionStorage.getItem('user')}).subscribe((res:any) => {
      this.followedUsers = res;
      this.followedUsers.push(+sessionStorage.getItem('user'));
      this.getPosts();
    }, (err) => {
      console.log(err);
    });
  }



  getPosts(): void {
    this.apiService.getPosts({users: this.followedUsers}).subscribe((res: any) => {
      this.posts = res;
      this.posts.forEach((post: any) => {
        if(post.name === sessionStorage.getItem('userName')){
          post.name = "You";
          post.editing = false;
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

  follow(): void{
    this.apiService.follow({user: +sessionStorage.getItem('user'), followed: this.followForm.get('follow').value}).subscribe((res: any) => {
      this.followedUsers.push(res);
      this.getPosts();
    }, (err) => {
      this.followForm.get('follow').setErrors({serverError: err.error});
    });
  }

  post(): void {
    this.apiService.post({user: +sessionStorage.getItem('user'), body: this.postForm.get('post').value}).subscribe(() => {
      this.getPosts();
    }, (err)=>{
      this.postForm.get('post').setErrors({serverError: err.error});
    });
  }

  deletePost(post: any): void{
    this.apiService.deletePost({post: post.id}).subscribe(() =>{
      this.getPosts();
    },(err) => {
      console.log(err);
    });
  }


  openEdit(post){
    if(!post.editing){
      post.editing = true;
    } else{
      let input = <HTMLInputElement>document.getElementById('post' + post.id);
      if(input.value){
        post.err = false;
        this.apiService.updatePost({id: post.id, newContent: input.value}).subscribe(() => {
          post.post = input.value;
          post.editing = false;
        }, (err) => {
          console.log(err);
        });
      } else{
        post.err = true;
      }
    } 
  }

  cancelEdit(post){
    post.editing = false;
  }

}
