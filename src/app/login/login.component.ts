import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data: any) => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          localStorage.setItem('token', data.token);
        }
        console.log(data);
      });
  }

  testAuth() {
    this.loginService.test(localStorage.getItem('token')).subscribe((data: any) => {
      console.log(data);
    });
  }
}
