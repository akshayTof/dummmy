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


export class EventsService {

    userInfo;
    eventInfo;
    
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

    //  set and get event
    setEvent(data: any) {
        this.eventInfo = data;
    }

    getEvent() {
        return this.eventInfo;
    }

     // --------- Nearby Events (events)--------------

     getNearbyEvents(data){
        return this.http.get(
            this.global.serverUrl + 
            this.httpService.nearbyEvents+
            "?user_id="+data.userId+
            "&user_lat="+data.userLat+
            "&user_long="+data.userLong+
            "&timezone="+data.timezone,
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

    // --------- Events history (events)--------------
    getHistoricEvent(data){
        return this.http.get(
            this.global.serverUrl + 
            this.httpService.getUserHistoricEvent+
            "?user_id="+data.userId+"&last_id="+data.lastId+"&timezone="+data.timezone,
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
    // --------- my Events (events)--------------
    getMyEvent(data){
        console.log(this.global.serverUrl + 
            this.httpService.getMyEvents+
            "?user_id="+data.userId+"&last_id="+data.lastId+"&friend_id="+data.userId+
            "?timezone="+data.timezone+"&language="+data.language);
            console.log("user url")
        return this.http.get(
            this.global.serverUrl + 
            this.httpService.getMyEvents+
            "?user_id="+data.userId+"&last_id="+data.lastId+"&friend_id="+data.userId+
            "&timezone="+data.timezone+"&language="+data.language,
            {headers: this.requestHeaders})
        .map(
            (response: Response) => {
                console.log("my events hai response ");
                console.log(response);
                console.log("my events hai response ");
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

    // --------- Events Detail (events)--------------
    getEventDetail(data){
        return this.http.get(
            this.global.serverUrl + 
            this.httpService.getEventDetail+
            "?event_id="+data.eventId+"&language="+data.language,
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

    // --------- add intrested Events (events)--------------
    addEventInterest(data){
       
        const body = new URLSearchParams();
        body.append('event_id', data.eventId);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.addEventInterest,
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

    // --------- unintrested Events (events) --------------
    unintrestedEvent(data){
        const body = new URLSearchParams();
        // body.append('user_id', data.userId);
        // body.append('friend_id', data.friendId);
        // body.append('status', data.status);
        // body.append('id', data.id);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.unintrestedEvent,
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


    // --------- add going Events (events)--------------
    goingEvent(data){
       
        const body = new URLSearchParams();
        body.append('event_id', data.eventId);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.goingEvent,
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

    // --------- ungoing or unintrested Events (events)--------------
    unGoingIntrestedEvent(data){
       
        const body = new URLSearchParams();
        body.append('event_id', data.eventId);
        body.append('status', data.status);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.unintrestedEvent,
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


    // --------- Delete Event (events) --------------
    deleteEvent(data){
        const body = new URLSearchParams();
        body.append('event_id', data.eventId);
        body.append('historic_event', data.historicEvent);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.deleteEvent,
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

    // --------- Edit Event (events) --------------
    editEvent(data){
        const body = new URLSearchParams();
        // body.append('user_id', data.userId);
        // body.append('friend_id', data.friendId);
        // body.append('status', data.status);
        // body.append('id', data.id);
        return this.http.post(
            this.global.serverUrl + 
            this.httpService.editEvent,
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

    //--------------Create Group (create) --------------------
    createEvent(data){
        const formData = new FormData();
        if ( data.eventImage === "" || data.eventImage === undefined) {
            formData.append('event_image', '');
        } else {
            formData.append('event_image', data.groupImage, data.groupImage.name );
        }
        formData.append('event_Category', data.form.name);
        formData.append('event_category_name', data.form.name);
        formData.append('event_name', data.form.name);
        formData.append('user_id', data.group_admin);
        formData.append('activity_id', data.group_activity_id);
        formData.append('event_location', data.locationName);
        formData.append('event_lat', data.group_lat);
        formData.append('event_long', data.Group_long);
        formData.append('event_country', data.event_country);
        formData.append('event_city', data.Group_long);
        formData.append('event_long', data.Group_long);
        formData.append('event_start_time', data.group_type);
        formData.append('event_end_time', data.group_type);
        formData.append('event_timezone', data.group_type);
        formData.append('host_name', data.form.description);
        formData.append('host_email', data.form.description);
        formData.append('host_phone', data.form.description);
        formData.append('event_description', data.form.description);
        formData.append('ticket_price', data.form.description);
        formData.append('event_type', data.form.description);
        formData.append('event_paid', data.form.description);
        formData.append('all_day', data.form.description);

        console.log("service form hai yeh");
        console.log(formData);
        return this.http.post(
            this.global.serverUrl + this.httpService.createEvent,
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