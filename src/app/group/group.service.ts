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
export class GroupService {

    groupInfo;

    constructor(private http: Http,
        private localStorageService: LocalStorageService,
        private global: GlobalService,
        private  httpService: HttpRequestService) { }

    requestHeaders = new Headers({
        'Authorization': this.global.basicAuth,
        'ss_token' : JSON.parse(localStorage.getItem('token'))
    });

    xUrlencodedRequestHeaders = new Headers({
        'Authorization': this.global.basicAuth,
        'Content-Type': this.global.xUrlencoded,
        'ss_token' : JSON.parse(localStorage.getItem('token'))
    });

    //------ set and get for group detail (group & detail)---------
    setGroup(data: any) {
        this.groupInfo = data;
    }

    getGroup() {
        return this.groupInfo;
    }

    // --------- Nearby groups (group)--------------
    getNearbyGroups(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.nearbygroups+"?user_id="+data.userId+"&group_lat="+data.groupLat+"&group_long="+data.groupLong,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
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

    // --------- get personal groups (group) --------------
    getUserGroups(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.myGroups+"?user_id="+data.userId+"&last_id="+data.lastId,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
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

    // ---------- JOIN REJECT ACCEPT group request (group)-----------------
    acceptDeleteGroup(data){
        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('group_id', data.groupId);
        body.append('status', data.status);
        return this.http.post(
            this.global.serverUrl + this.httpService.acceptDeleteGroup,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
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


    //--------------- exit group (group)----------
    exitGroup(data){
        const body = new URLSearchParams();
        body.append('group_id', data.groupId);
        return this.http.post(
            this.global.serverUrl + this.httpService.exitGroup,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
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

    //--------------- delete group (group)----------
    deleteGroup(data){
        const body = new URLSearchParams();
        body.append('group_id', data.groupId);
        return this.http.post(
            this.global.serverUrl + this.httpService.deleteGroup,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
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

    // --------------- Group Feeds (detail) ------------

    getGroupFeeds(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.groupFeeds+"?user_id="+data.userId+"&group_id="+data.groupId+"&last_id="+data.lastId,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
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

    //--------------Create Group (create) --------------------
    createGroup(data){
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