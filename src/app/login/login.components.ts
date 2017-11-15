import { Component, AfterViewInit, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticateService} from '../services/app.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticateService]
})

export class LoginComponent  implements AfterViewInit, OnInit {
  username: string;
  password: string;
  token: string;
  errorMessages: string;

  constructor(private router: Router, private authenticateService: AuthenticateService) {

  }

  // after all components have been loaded execute jquery
  ngAfterViewInit() {


  }

  // on page load authenticate user
  ngOnInit() {
    const login_status = localStorage.getItem('login_status');
    if (login_status === '1') {
      this.router.navigate(['/dashboard']);
    }
  }

  redirectPage() {
    // Navigate to the login page with extras
    this.router.navigate(['/register']);
    return false;
  }

  // login user
  loginUser() {
    this.doLogin();
  }

  // send login credentials to login service
  doLogin() {

    this.authenticateService.authLogin(this.username, this.password).subscribe(loginResponse => {

      if (loginResponse.user_token !== '') {
        localStorage.setItem('current_user', loginResponse.token);
        localStorage.setItem('login_status', '1');
        this.router.navigate(['/dashboard']);
      } else {
        localStorage.setItem('current_user', '');
        localStorage.setItem('login_status', '0');
        this.errorMessages = JSON.stringify(loginResponse.messages).replace(/[\]'_}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });

  }
}
