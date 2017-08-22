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

@Injectable()
export class BuckeListService {

  url = 'https://buck3tlist.herokuapp.com/api/v1/bucketlists/'

  constructor(private http: Http) {}

  // create a bucket list
  createBucketList(name: string) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url, JSON.stringify({'name': name}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // get all bucket lists
  getAllBucketLists(page, limit, search) {
    limit = limit || 10;
    page = page || 1;
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(
      this.url + '?page=' + page + '&limit=' + limit + '&q=' + search, options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // get bucket lists with names containing the value of 'q'
  searchBucketLits(search, limit) {
    if (/^[0-9]+$/.test(search)) {
      search = JSON.stringify(search);
    }
    limit = limit || 10;
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '?q=' + search + '&limit=' + limit, options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // update bucket list
  updateBucketLists(bucketListId: number, name: string) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + bucketListId, JSON.stringify({'name': name}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // update bucket list
  deleteBucketLists(bucketListId: number) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + bucketListId, options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

}

@Injectable()
export class BucketListItemService {

  url = 'https://buck3tlist.herokuapp.com/api/v1/bucketlists/'

  constructor(private http: Http) {}

  // create bucket list item
  createItem(bucketListId: number, name: string) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + bucketListId + '/items/', JSON.stringify({'name': name}), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // create bucket list item
  updateItem(bucketListId: number, itemId: number, editedField: string, editedValue: any) {
    const token = localStorage.getItem('current_user');
    let data = {}
    if (editedField === 'name') {
      data = {'name': editedValue }
    }else{
      data = {'name': '', 'done': editedValue}
    }
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.url + bucketListId + '/items/' + itemId,
      JSON.stringify(data), options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }

  // delete bucket list item
  deleteItem(bucketListId: number, itemId: number) {
    const token = localStorage.getItem('current_user');
    const headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token});
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + bucketListId + '/items/' + itemId, options)
      .map(response => response.json())
      .catch(errors => {
        return Observable.throw(errors.json())
      });
  }
}
