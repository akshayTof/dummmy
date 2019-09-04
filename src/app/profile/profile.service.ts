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


export class ProfileService {

    userInfo;
    
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


    setUser(data: any) {
        this.userInfo = data;
    }

    getUser() {
        return this.userInfo;
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

    getUserProfile(data){
            return this.http.get(
                this.global.serverUrl + this.httpService.getUserProfile+"?user_id="+data.userId+"&friend_id="+data.friendId,
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
                    return Observable.throw('Something went wrong', output);
                }
            );
        }


    

    //------------get friends ----------

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
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //-----------get friend requests ----------

    getUserFriendRequest(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.getUserFriendRequests+"?user_id="+data.userId+"&friend_id="+data.friendId,
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
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //-----------SET ACTIVITY (Add or Remove activity)----------
    setActivity(data){
        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('activity_id', data.activityId);
        return this.http.post(
            this.global.serverUrl + this.httpService.setActivity,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //------------- UNFRIEND THE USER ---------
    unfriend(data){
        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('friend_id', data.friendId);
        return this.http.post(
            this.global.serverUrl + this.httpService.unfriend,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //----accept and reject the friend request --------

    acceptReject(data){

        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('friend_id', data.friendId);
        body.append('status', data.status);
        body.append('id', data.id);
        return this.http.post(
            this.global.serverUrl + this.httpService.acceptFriendReq,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    // ---------- searchUsers ------------

    allSearchUsers(data){

        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('name', data.valueName);
        return this.http.post(
            this.global.serverUrl + this.httpService.searchUsers,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //---------------send friend requests -----------
    sendFriendRequest(data){
        const body = new URLSearchParams();
        body.append('user_id', data.userId);
        body.append('friend_id', data.friendId);
        body.append('status', data.status);
        body.append('id', data.id);
        return this.http.post(
            this.global.serverUrl + this.httpService.sendFriendRequest,
            body.toString(),
            {headers: this.xUrlencodedRequestHeaders})
        .map(
            (response: Response) => {
                const output = response.json();
                return output;
            }
        ).catch(
            (error: Response) => {
                console.log(error);
                const output = error.json();
                return Observable.throw('Something went wrong', output);
            }
        );
    }

    //-------------- achievments ------------------

    getUserAchievments(data){
        return this.http.get(
            this.global.serverUrl + this.httpService.userAchievements+"?user_id="+data.userId+"&timezone="+data.timezone,
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
                return Observable.throw('Something went wrong', output);
            }
        );
    }


}