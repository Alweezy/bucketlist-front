import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticateService {

  url = 'https://buck3tlist.herokuapp.com/auth/'

  constructor(private http: Http) {}

  // validate recaptcha
  authValidateRecaptcha(secret: string, recaptchaToken: string) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'verifyrecaptcha/',
      JSON.stringify({'secret': secret, 'response': recaptchaToken}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())});
  }

  // check if a user is logged in
  authEditUser(id: number, name: string, email: string, password: string, oldpassword: string) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token);
    const options = new RequestOptions({ headers: headers });
    const data = {
      'id': id,
      'name': name,
      'email': email,
      'password': password,
      'oldpassword': oldpassword
    }
    return this.http.post(this.url + 'edituser/', JSON.stringify(data), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // check if a user is logged in
  authGetUser() {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization',  token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'getuser/', JSON.stringify({'auth': '1'}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // check if a user is logged in
  authLoggedIn(token: string) {

    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'loggedin/', JSON.stringify({'auth': '1'}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // authenticate registered user
  authLogin(email: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'login/',
      JSON.stringify({'email': email, 'password': password}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // add user to user table in the database
  authRegister(name: string, email: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + 'register/',
      JSON.stringify({'name': name, 'email': email, 'password': password}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }
}
