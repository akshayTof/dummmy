import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../../shared/filter.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { EventsService } from '../events.service';
import { GlobalService } from '../../shared/global.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

    // ------- global variables ---------

    imagePath = this.globalService.ImagePath;
    postSubmit = false;
    message = false;
    error;
    displayMsg;
    displayImage = 'assets/images/newAssests/user.png';
    dummyImage = 'assets/images/newAssests/fav_icon.png';
    userImage: File = null;
    isLoading = true;
    user;
    noEventImage = 'assets/images/newAssests/eventPlaceHolder.png';
    empty_friends = 'assets/images/newAssests/empty_friends.png';
    userShow;
  
    eventShow;
    groupMembers;
    groupMembersCount;
    groupFeeds;
    noGroupFeed = false;
    eventImage;
    checkEventImage = false;

    constructor(
      private eventsService: EventsService,
      private localStorage: LocalStorageService,
      private router: Router,
      private globalService : GlobalService,
      private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user-data'));
    this.eventShow = this.eventsService.getEvent(); 
    if(this.eventShow.event_pic == ""){
      this.eventImage = this.noEventImage;

    }else {
      this.eventImage = this.eventShow.event_pic
      this.checkEventImage = true;
    }
    // this.groupMembers = this.groupShow.group_members;
    // this.groupMembersCount = this.groupMembers.length;

  }

}
