import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service'


import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
 import { ActivitiesService } from '.././activities.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  logoImage = 'assets/images/ic.jpg';
  dummyImage = 'assets/images/dummy-pic.png';

  imagePath ;
  timezone;

  isLoading;
  activities;
  user ;

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

   this.activitiesService.getAllHistory(data)
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

}
