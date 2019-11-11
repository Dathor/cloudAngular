import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl('', Validators.required)
  });

  registerForm = new FormGroup({
    register: new FormControl('', Validators.required)
  });

  userID: number;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(): void{
    this.apiService.login({userName:this.loginForm.get('login').value}).subscribe((res: any) => {
      sessionStorage.setItem('user', res.user);
      sessionStorage.setItem('userName', this.loginForm.get('login').value);
      this.router.navigate(['/']);
    }, (err) => {
      this.loginForm.get('login').setErrors({serverError: err.error});
    });
  }

  register(): void{
    this.apiService.register({userName: this.registerForm.get('register').value}).subscribe((res: any) => {
      sessionStorage.setItem('user', res.user);
      sessionStorage.setItem('userName', this.registerForm.get('register').value);
      this.router.navigate(['/']);
    }, (err) => {
      this.registerForm.get('register').setErrors({serverError: err.error});
    });
  }

}
