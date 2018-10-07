import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login/login.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) as User;

    if (currentUser) {
      this.navigateUserToLastRoute();
    }

    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe((data: User) => {
        if (!currentUser) {
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.navigateUserToLastRoute();
        }
      });
  }

  navigateUserToLastRoute() {
    if (this.returnUrl) {
      this.router.navigateByUrl(this.returnUrl);
      return;
    }
    this.router.navigate(['dashboard']);
  }
}
