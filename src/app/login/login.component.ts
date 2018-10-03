import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder) { 
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

  onSubmit(){
    this.loading = !this.loading;
    console.log('Your username=[' + this.loginForm.value.username + '] + password=[' + this.loginForm.value.password + ']');
  }
}
