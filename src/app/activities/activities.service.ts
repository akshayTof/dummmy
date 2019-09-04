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
export class ActivitiesService {
    loggedIn = false;
    //ss_token = 'd_token':  JSON.parse(localStorage.getItem('token'));

    
    activityInfo;

    constructor(private http: Http,
                private localStorageService : LocalStorageService,
                private global: GlobalService,
                private  httpService: HttpRequestService) { }

    requestHeaders = new Headers({
        'Authorization': 'Basic c3dpZnRzcGFyQGVtaWxlbmNlLmNvbTpFbWlsZW5jZUAx',
        'ss_token' : JSON.parse(localStorage.getItem('token'))
        });



    //-------------- my activity api's ----------------

    //----------- get my activities api -----------------
    getAllActivities(data){
        
        console.log(data);
        return this.http.get(
            this.global.serverUrl + this.httpService.getActivities+"?user_id="+data.user_id+"&timezone="+data.timezone,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
               // console.log(response);
                //console.log('response')
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                const output = error.json();
                console.log('error aaya hai')
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    setActivity(data: any) {
        this.activityInfo = data;
    }

    getActivity() {
        return this.activityInfo;
    }


    //---------------history api's --------------------------

    getAllHistory(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.getHistoricActivities+"?user_id="+data.user_id+"&timezone="+data.timezone,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
                console.log(response);
                console.log('response')
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                const output = error.json();
                console.log('error aaya hai')
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //==============create =====================

    //--------------Create Group (create) --------------------
    createActivity(data){
        const formData = new FormData();
        if ( data.groupImage === "" || data.groupImage === undefined) {
            formData.append('group_image', '');
        } else {
            formData.append('group_image', data.groupImage, data.groupImage.name );
        }
        formData.append('group_name', data.form.name);
        formData.append('group_activity_name', data.group_activity_name);
        formData.append('group_admin', data.group_admin);
        formData.append('group_members', data.group_members);
        formData.append('group_activity_id', data.group_activity_id);
        formData.append('group_location', data.locationName);
        formData.append('group_lat', data.group_lat);
        formData.append('group_long', data.group_long);
        formData.append('group_type', data.group_type);
        
        formData.append('group_description', data.form.description);
        //formData.append('group_image', data.groupImage , data.groupImage.name);

        console.log("service form hai yeh");
        console.log(formData);
        return this.http.post(
            this.global.serverUrl + this.httpService.createGroup,
            formData,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                console.log("successs hai yeh ");
                return output;
            }
        ).catch(
            (error: Response) => {

                const output = error.json();
                console.log('error aaya hai')
                console.log(output);
                console.log('error aaya hai')
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //------------ get friends (create)----------

    getUserFriends(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.getUserFriends+"?user_id="+data.userId+"&friend_id="+data.friendId,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                console.log("dddddddd");
                const output = error.json();
                console.log('error aaya hai')
                return Observable.throw('Something went wrong', output);
            }
        );
    }
    
     //-----get user Activities ----------
     getUserActivities(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.getUserActivities+"?user_id="+data.userId+"&friend_id="+data.friendId,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                console.log('error aaya hai')
                return Observable.throw('Something went wrong', output);
            }
        );
    }






  
}

