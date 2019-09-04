import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service'

import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
 import { ActivitiesService } from './activities.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {


  logoImage = 'assets/images/ic.jpg';
  dummyImage = 'assets/images/logo2.png';

  
  imagePath = this.globalService.ImagePath;
  isLoading;
  activities;
  user;
  nearbyActivities;

  timezone ;
  latitude : number;
  longitude : number;



  constructor(private router: Router,
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private globalService : GlobalService,
    private localStorageService: LocalStorageService,) { }

    

  ngOnInit() {

    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    this.imagePath = this.globalService.ImagePath;

    this.user = JSON.parse(localStorage.getItem('user-data'));

    const data = {
      page_no: '',
      user_id : this.user.user_id,
      timezone : this.timezone
    };

   this.activitiesService.getAllActivities(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.activities = response.data;
           console.log(this.activities);
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

  //setting activity detail

  info(data) {
    this.activitiesService.setActivity(data);
  }


  currentpositionData (){
    //------ this is to get time offset of locale
    var timeoffset = (new Date()).getTimezoneOffset()/60;
    console.log(timeoffset);

    //------- this is for navigation agm --------- 
    if (navigator) {
      navigator.geolocation.getCurrentPosition( position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        });
    }
  }


 

  //---------------get nearby activities ---------
  // getNearbyActivities(){
  
  //   this.activitiesService.getNearbyActivity(data)
  //     .subscribe(
  //       (response) => {
  //         if (response.success === 1) {
  //           this.isLoading = false;
  //           this.nearbyActivities = response.data;
  //           console.log(this.nearbyGroups);
  //         } else {
  //           // navigate to error page
  //           this.isLoading = false;
  //           console.log("error occured");
  //           // this.globalErrorService.errorOccured(response);
  //         }
  //       },
  //     (error) => {
  //       console.log('error!!', error);
  //       this.isLoading = false;
  //       console.log("error occured");
  //     //  this.globalErrorService.errorOccured(error);
  //     });
  // }

}
