import { Component, AfterViewInit, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticateService } from '../../services/app.service';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthenticateService]
})

export class RegisterComponent implements AfterViewInit, OnInit {
  username: string;
  email: string;
  password: string;
  token: string;
  errorMessages: string;

  constructor(private router: Router, private authService: AuthenticateService) {

  }

  redirectPage() {
    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
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
  // register a user
  registerUser() {
    this.doRegistration();
  }

  // send registration credentials to register service
  doRegistration() {

    this.authService.authRegister(this.username, this.email, this.password).subscribe(response => {

      if (response.user_token !== '') {
        this.router.navigate(['/login']);
      } else {
        localStorage.setItem('current_user', '');
        localStorage.setItem('login_status', '0');
        this.errorMessages = JSON.stringify(response.messages).replace(/[\]'_}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    }, errors => {
      Materialize.toast( 'Error connecting to the database', 5000);
    });

  }
}

