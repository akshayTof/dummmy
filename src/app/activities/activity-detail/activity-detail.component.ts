import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';

import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
 import { ActivitiesService } from '../activities.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {


   isLoading;
  // activities;
   activity ;
   activityGroups;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private activitiesService: ActivitiesService,
    private localStorageService: LocalStorageService,) { }

  ngOnInit() {

    this.activity = this.activitiesService.getActivity(); 

    if (this.activity !== undefined) {
      console.log("activities");
      console.log(this.activity);
      this.activityGroups = this.activity.link_group_name;
      console.log(this.activityGroups);
    }
    else {
      console.log("no activity is found");
    }

  }

}
