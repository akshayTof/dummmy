import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
@Injectable()
export class GlobalService {
  serverUrl: string;
  requestHeaders: Headers;
  urlHeaders: Headers;
  username = 'swiftspar@emilence.com';
  password = 'Emilence@1';
  basicAuth: string;
  ImagePath;
  token;
  loggedInUser;
  xUrlencoded;

  userLatitude;
  userLongitude;
  constructor() {

    /// ============== ne w instance ====== 18.221.66.147
    
    //--------production ---------------------
    //this.serverUrl = 'http://35.163.199.28:3005/swiftSpar/';
    //this.ImagePath = 'https://s3-us-west-2.amazonaws.com/swift-spar/';
    //------testing -----------------------
    this.serverUrl = 'http://18.221.66.147:3001/swiftSpar/';
    this.ImagePath = 'https://s3-us-west-2.amazonaws.com/swift-spar/';

    this.token = JSON.parse(localStorage.getItem('token'));
    //this.loggedInUser = JSON.parse(localStorage.getItem('user-data'));
    this.basicAuth = 'Basic c3dpZnRzcGFyQGVtaWxlbmNlLmNvbTpFbWlsZW5jZUAx';

    this.xUrlencoded = 'application/x-www-form-urlencoded';


    //========header for get post(formdata) and delete ====
    this.requestHeaders = new Headers({
        'Authorization': 'Basic c3dpZnRzcGFyQGVtaWxlbmNlLmNvbTpFbWlsZW5jZUAx'
     });

     //========header for x-urlEncoded ====
     this.urlHeaders = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic c3dpZnRzcGFyQGVtaWxlbmNlLmNvbTpFbWlsZW5jZUAx'
   });
  }
}
// 'Basic ' + btoa(this.username + ':' + this.password)
