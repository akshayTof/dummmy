import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { HttpRequestService } from '../shared/http-requests.service';

@Injectable()
export class AuthService {
    loggedIn = false;


    constructor(private http: Http,
                private localStorage: LocalStorageService,
                private global: GlobalService,
                private  httpService: HttpRequestService) { }

   signup(data: any) {
       const body = JSON.stringify(data);
    //    const headers = new Headers({
    //        'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    //     });
        const formData = new FormData();
        formData.append('username', data.email);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('first_name', data.first_name);
        formData.append('dob', data.dob);
        formData.append('gender', data.gender);
        // formData.append('user_lat', '55.55555');
        // formData.append('user_long', '55.55555');
        formData.append('user_city', 'Mohali');
        console.log(formData);
        if (data.profilePic === null || data.profilePic === undefined) {
            formData.append('profilePic', '');
        } else {
        formData.append('profilePic', data.profilePic, data.profilePic.name );
        }
        return this.http.post(this.global.serverUrl + this.httpService.signup,
       formData,
       {headers: this.global.requestHeaders} )
       .map(
          (response: Response) => {
            const output = response.json();
            localStorage.clear();
            this.localStorage.set('user-data', output.data);
            return output;
          }
       ).catch(
           (error: Response) => {
               console.log('error', error);
            const output = error.json();
            return Observable.throw('Something went wrong', output);
           }
       );
   }


   //===============sign up login =====================

   signin(data: any) {
    
    const body = new URLSearchParams();
    body.append('email', data.email);
    body.append('password', data.password);
    // return this.http.post(this.BaseUrl + 'account/login/',this.httpService.login
    return this.http.post(this.global.serverUrl + this.httpService.login,
    body.toString(),
    {headers: this.global.urlHeaders} )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            return Observable.throw('Something went wrong');
        }
    );
   }



   // verify

   verify(data: any) {

    // headers
    // const header = new Headers({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    // });

    // body
    const body = new URLSearchParams();
    body.append('code', data.code);
    body.append('user_id', data.user_id);

    return this.http.post(this.global.serverUrl + 'user_auth/verify_account',
    body.toString(),
    {headers: this.global.urlHeaders} )
    .map(
        (response: Response) => {
           const output = response.json();
           return output;
        }
    ).catch(
        (error: Response) => {
            return Observable.throw(error);
        }
    );
   }
}

