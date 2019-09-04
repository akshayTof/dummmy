import { Component, OnInit  , Pipe, PipeTransform} from '@angular/core';
import { EventsService } from './events.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../shared/filter.pipe';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})


  @Pipe({
    name: 'filter'
  })
  export class EventsComponent implements OnInit {
  
    //variables 
  
    displayMsg;
    displayImage = 'assets/images/newAssests/user.png';
    dummyImage = 'assets/images/newAssests/fav_icon.png';
    userImage: File = null;
    isLoading = true;
    imagePath = this.globalService.ImagePath;
    timezone;
  
    globalData;
    // latitude = this.globalService.userLatitude;
    // longitude = this.globalService.userLongitude;
  
    lat;
    long
    user;
    //------
    nearbyEvents;
    myEvents;
    historyEvents;
    noEvents = 'assets/images/newAssests/noEvents.png';
    noMyEvents;
    noNearbyEvents;
    noHistoryEvents;
  
    constructor(private eventsService: EventsService,
      private localStorage: LocalStorageService,
      private router: Router,
      private globalService : GlobalService,
      private route: ActivatedRoute) { }

      ngOnInit() {
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        //havt to put it one file
        this.user = JSON.parse(localStorage.getItem('user-data'));

        const data = {
          lastId: '',
          userId : this.user.user_id,
          language : '',
          timezone : this.timezone
        };
        this.eventsService.getMyEvent(data)
        .subscribe(
          (response) => {
            if (response.success === 1) {
              this.isLoading = false;
              this.myEvents = response.data;
              console.log(this.myEvents);
              if(this.myEvents[0] == null){
                this.noMyEvents = true;
              }
          } else {
            // navigate to error page
            this.isLoading = false;
            console.log("error occured");
            // this.globalErrorService.errorOccured(response);
          }
        },
        (error) => {
          console.log('error!!', error);
          this.isLoading = false;
          console.log("error occured");
        //  this.globalErrorService.errorOccured(error);
        });
      }


  position() {
    return new Promise((resolve, reject) => {
      if (navigator) {
        navigator.geolocation.getCurrentPosition( position => {
        // this.globalService.userLatitude;
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        const data = {
          page_no: '',
          userId : this.user.user_id,
          userLat : this.lat,
          userLong : this.long,
          timezone : this.timezone,
          language : ''
        };
        resolve(data);
        });
      }
    })
  }


  getNearbyEvents(){
    this.position().then(data => {
  
    this.eventsService.getNearbyEvents(data)
      .subscribe(
        (response) => {
          if (response.success === 1) {
            this.isLoading = false;
            this.nearbyEvents = response.data;
            console.log("nearby event");
            console.log(this.nearbyEvents);
            if(this.nearbyEvents[0] == null){
              this.noNearbyEvents = true;
            }
          } else {
            // navigate to error page
            this.isLoading = false;
            console.log("error occured");
            // this.globalErrorService.errorOccured(response);
          }
        },
      (error) => {
        console.log('error!!', error);
        this.isLoading = false;
        console.log("error occured");
      //  this.globalErrorService.errorOccured(error);
      });
    })
  }


  getmyEvents(){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      language : '',
      timezone : this.timezone
    };
    this.eventsService.getMyEvent(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          this.isLoading = false;
          this.myEvents = response.data;
          if(this.myEvents[0] == null){
            this.noMyEvents = true;
          }
      } else {
        // navigate to error page
        this.isLoading = false;
        console.log("error occured");
        // this.globalErrorService.errorOccured(response);
      }
    },
    (error) => {
      console.log('error!!', error);
      this.isLoading = false;
      console.log("error occured");
    //  this.globalErrorService.errorOccured(error);
    });
  }


  getHistoricEvents(){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      language : '',
      timezone : this.timezone
    };
    this.eventsService.getHistoricEvent(data)
      .subscribe(
        (response) => {
          if (response.success === 1) {
            this.isLoading = false;
            this.historyEvents = response.data;
            console.log(response);
            console.log("histury")
            if(this.historyEvents[0] == null){
              this.noHistoryEvents = true;
            }
        } else {
          // navigate to error page
          this.isLoading = false;
          console.log("error occured");
          // this.globalErrorService.errorOccured(response);
        }
      },
      (error) => {
        console.log('error!!', error);
        this.isLoading = false;
        console.log("error occured");
      //  this.globalErrorService.errorOccured(error);
      });
  }





  deleteEvent(event , type){
    if(type = 3){
      var historicEvent = 1;
    }
    else{
    var historicEvent = 0;
    }
    const data = {
      eventId : event.event_id,
      historicEvent : historicEvent,
      language : ''
    };
    this.eventsService.deleteEvent(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          console.log(response );
          console.log("history of delete reponse")
          this.isLoading = false;
          if(type ==  1){
            this.getmyEvents();
          }else if(type == 2){
            this.getNearbyEvents();
          }else{
            this.getHistoricEvents();
          }
        } else {
        // navigate to error page
        this.isLoading = false;
        console.log("error occured");
        // this.globalErrorService.errorOccured(response);
        }
    },
    (error) => {
      console.log('error!!', error);
      this.isLoading = false;
      console.log("error occured");
    //  this.globalErrorService.errorOccured(error);
    });
  }

  eventDetail(event){
    //console.log(event);
    this.eventsService.setEvent(event);
  }

  addEventInterest(event){
    const data = {
      eventId : event.event_id,
      language : ''
    };
    this.eventsService.addEventInterest(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          console.log(response );
          console.log("add intrest of  reponse")
          this.isLoading = false;
          this.getNearbyEvents();
        } else {
        // navigate to error page
        this.isLoading = false;
        console.log("error occured");
        // this.globalErrorService.errorOccured(response);
        }
    },
    (error) => {
      console.log('error!!', error);
      this.isLoading = false;
      console.log("error occured");
    //  this.globalErrorService.errorOccured(error);
    });

  }


  goingEvent(event ){
    
     
    const data = {
      eventId : event.event_id,
      language : '',
    };
    console.log(data);
    console.log("9797979797979");
    this.eventsService.goingEvent(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          console.log(response );
          console.log("add intrest of  reponse")
          this.isLoading = false;
          this.getNearbyEvents();
        } else {
        // navigate to error page
        this.isLoading = false;
        console.log("error occured");
        // this.globalErrorService.errorOccured(response);
        }
    },
    (error) => {
      console.log('error!!', error);
      this.isLoading = false;
      console.log("error occured");
    //  this.globalErrorService.errorOccured(error);
    });

  }

  unGoingUnintrestedEvent(event , status ){
    
     
    const data = {
      eventId : event.event_id,
      language : '',
      status : status
    };
    this.eventsService.unGoingIntrestedEvent(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          console.log(response );
          console.log("add intrest of  reponse")
          this.isLoading = false;
          this.getNearbyEvents();
        } else {
        // navigate to error page
        this.isLoading = false;
        console.log("error occured");
        // this.globalErrorService.errorOccured(response);
        }
    },
    (error) => {
      console.log('error!!', error);
      this.isLoading = false;
      console.log("error occured");
    //  this.globalErrorService.errorOccured(error);
    });

  }

}
