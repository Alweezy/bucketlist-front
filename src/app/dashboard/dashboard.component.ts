import { Component, AfterViewInit, OnInit } from '@angular/core';
import {AuthenticateService, BuckeListService, BucketListItemService} from '../services/app.service';
import {Router} from '@angular/router';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthenticateService, BuckeListService, BucketListItemService]
})

export class DashboardComponent implements AfterViewInit, OnInit {

  loader = true;
  listBucketsLists = true;
  search = '';
  bucketlist: string;
  limit = 10;
  BucketResponse: BucketResponse;
  keys: string[];
  currentKey: number;
  bucketListId: number;
  errorMessages: string;
  itemName: string;
  bucketName: string;
  bucketsHtml: string;
  userId: number;
  username: string;
  useremail: string;
  useroldpassword: string;
  userpassword: string;
  userconfirmpassword: string;
  itemNames: any[] = [];

  // initialize global variables
  constructor(private router: Router, private bucketListItemService: BucketListItemService,
              private bucketListService: BuckeListService,
              private authenticateService: AuthenticateService) {}

  // after all components have been loaded execute jquery
  ngAfterViewInit() {
    jQuery(document).ready(function(){
      jQuery('.modal').modal();
      jQuery('#bucketName').keyup(function(e) {
        if (e.which === 13) {
          jQuery('#updatebucketlistmodal').modal('close');
        }
      });
      jQuery('#newItem').keyup(function(e) {
        if (e.which === 13) {
          jQuery('#newitemmodal').modal('close');
        }
      });
    });
  }

  // on page load authenticate user and get all buckets
  ngOnInit() {

    const login_status = localStorage.getItem('login_status');

    if (login_status !== '1') {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.getPaginatedBucketLists(1);
    }

  }

  // get user details
  getUserDetails() {
    this.authenticateService.authGetUser().subscribe(response => {

      if (JSON.stringify(response.messages).includes('Register or log in to access this resource')) {
        this.logOutUser();
      }

      if (response.messages === 'user exists') {
        this.userId = response.id;
        this.username = response.name;
        this.useremail = response.email;

        jQuery(document).ready(function(){
          Materialize.updateTextFields();
        });

      }

    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });
  }

  // edit user details
  editUser() {

    if (this.userconfirmpassword !== this.userpassword) {
      Materialize.toast(JSON.stringify('Passwords do not match'), 5000);
    }else {
      this.authenticateService.authEditUser(
        this.userId,
        this.username,
        this.useremail,
        this.userpassword,
        this.useroldpassword).subscribe(response => {
        Materialize.toast(JSON.stringify(response.messages).replace(/[\]}"{[]/g, ''), 5000);
        if (JSON.stringify(response.messages).includes('Access Denied')) {
          this.logOutUser();
        }
        return false;
      }, errors => {
        Materialize.toast('Error connecting to the database', 5000);
      });
    }
  }

  // log out user
  logOutUser() {
    // Materialize.toast("Your token has expired. Please log in again", 5000);
    localStorage.setItem('login_status', '0');
    localStorage.setItem('current_user', '');
    this.router.navigate(['/login']);
  }

  // create new bucket
  newBucketList() {
    this.bucketListService.createBucketList(this.bucketlist).subscribe(response => {
      if ('message' in response) {
        if (JSON.stringify(response.message).includes('Register or log in to access this resource')) {
          this.logOutUser();
        }
      }
      this.BucketResponse.bucketlists.splice(0, 0, response.bucketlists);
      console.log(this.BucketResponse.bucketlists)
      Materialize.toast('Bucket list ' + this.bucketlist +  ' successfully created', 5000);
    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });
  }

  // search for bucket list name or id
  searchBucketLists() {
    if (typeof this.search === 'undefined') {
      this.search = '';
    }
    this.loader = true;
    this.bucketListService.searchBucketLists(this.search, this.limit).subscribe(
      response => {
        this.loader = false;
        console.log(JSON.stringify(response));
        if ('message' in response ) {
          if (JSON.stringify(response.message).includes('Register or log in to access this resource')) {
            this.logOutUser();
          }
        }
        this.BucketResponse = response;
        if (this.BucketResponse) {
          if (this.BucketResponse.bucketlists) {
            this.keys = Object.keys(this.BucketResponse.bucketlists);
          }
        } else {
          Materialize.toast(this.search + 'not found', 5000);
        }
      },
      errors => {
        Materialize.toast('Error connecting to the database', 5000);
      });
  }

  // get all bucket lists
  getPaginatedBucketLists(page) {
    this.bucketListService.getAllBucketLists(page, this.limit, this.search).subscribe(response => {
      this.loader = false;
      if ('message' in response) {
        if (JSON.stringify(response.message).includes('Register or log in to access this resource')) {
          this.logOutUser();
        }
      }
      this.BucketResponse = response;
      console.log(response);
      if (this.BucketResponse.bucketlists) {
        this.keys = Object.keys(this.BucketResponse.bucketlists);
      }
    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });
  }

  // set the bucket list id of the item to be created
  setId(key) {
    this.currentKey = key
    this.bucketListId = jQuery('#bucketListId' + key).html();
    this.bucketName = this.BucketResponse.bucketlists[key].name;
  }

  // view bucket list name
  viewBucket(key) {

    jQuery(document).ready(function(){
      Materialize.updateTextFields();
      jQuery('#updatebucketlistmodal-' + key).modal('open');
    });
  }

  // update bucket list name
  updateBucket(event, key, bucketName) {

    this.bucketListService.updateBucketLists(this.bucketListId, bucketName).subscribe(response => {
      if (JSON.stringify(response.message).includes('Register or log in to access this resource')){
        this.logOutUser();
      }
      this.BucketResponse = response;
      console.log = response;
      if (JSON.stringify(response.message).includes('User already has a')) {
        this.BucketResponse.bucketlists[key].name = this.bucketName;
      }
      Materialize.toast(
        JSON.stringify(response.message).replace(/[\]'_}"{[]/g, ' '), 5000);
      jQuery('.modal').modal('close');
    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });
  }

  // delete bucket
  deleteBucket(key) {
    this.bucketListId = jQuery('#bucketListId' + key).html();
    if (confirm('Are you sure you want to delete this bucket list? This action is irreversible.')) {
      this.bucketListService.deleteBucketLists(this.bucketListId).subscribe(response => {
        if ('message' in response){
          if (JSON.stringify(response.message).includes('Register or log in to access this resource')) {
            this.logOutUser();
          }
        }
        const index = this.BucketResponse.bucketlists.indexOf(this.BucketResponse.bucketlists[key])
        this.BucketResponse.bucketlists.splice(index, 1);
        this.keys = Object.keys(this.BucketResponse.bucketlists)
        Materialize.toast(' list deleted successfully', 5000);
      }, errors => {
        Materialize.toast('Error connecting to the database', 5000);
      });

    }
  }

  // create item
  createItem() {
    this.bucketListItemService.createItem(this.bucketListId, this.itemName).subscribe(response => {
      if (JSON.stringify(
          response.message).includes('Register or log in to access this resource')) {
        this.logOutUser();
      }
      if (response.message === 'create_item_success') {
        this.BucketResponse.bucketlists[this.currentKey].items.splice(0, 0, response.item)
        Materialize.toast('Item ' + this.itemName + ' successfully added', 5000);
      }else {
        this.errorMessages = JSON.stringify(response.messages).replace(/['\]}"{[]/g, '')
        Materialize.toast(this.errorMessages, 5000);
      }
    }, errors => {
      Materialize.toast('Error connecting to the database', 5000);
    });
  }

  // view bucket list items
  viewItems(key) {

    jQuery(document).ready(function(){
      Materialize.updateTextFields();
      jQuery('#viewitemsmodal' + key).modal('open');
    });
  }

  // edit items
  updateItems(key, iId, editedField, editedValue, event) {

    if (editedValue.length === 0) {
      Materialize.toast('The name field cannot be empty', 5000);
      event.preventDefault();
    }

    if (editedField === 'done') {
      if (event.target.checked) {
        editedValue = true;
      } else {
        editedValue = false;
      }
    }

    if (event.which === 13 || event.type === 'click') {
      if (this.BucketResponse.bucketlists[key].items.length > 0) {
        this.bucketListItemService.updateItem(this.bucketListId, iId, editedField, editedValue).subscribe(response => {
          if (JSON.stringify(response.messages).includes('Register or log in to access this resource')) {
            this.logOutUser();
          }
          Materialize.toast(JSON.stringify(response.messages).replace(/[\]'_}"{[]/g, ' '), 5000);
        }, errors => {
          Materialize.toast('Error connecting to the database', 5000);
        });
      }
    }
  }

  // delete items
  deleteItems(key, itemIndex, iId) {
    this.bucketListId = jQuery('#bucketListId' + key).html()
    if (confirm('Are you sure you want to delete this item? This action is irreversible.')) {
      console.log(this.bucketListId)
      this.bucketListItemService.deleteItem(this.bucketListId, iId).subscribe(response => {
        if ('message' in response) {
          if (JSON.stringify(response.message).includes('Register or log in to access this resource')) {
            this.logOutUser();
          }
        }
        const index = this.BucketResponse.bucketlists[key].items.indexOf(this.BucketResponse.bucketlists[key].items[itemIndex])
        this.BucketResponse.bucketlists[key].items.splice(index, 1)
      }, errors => {
        Materialize.toast('Error connecting to the database', 5000);
      });
    }

  }

}

interface BucketResponse {
  previous_page;
  bucketlists;
  next_page;
}
