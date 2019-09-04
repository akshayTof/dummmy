import { GroupService } from '../group.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../../shared/filter.pipe';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

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
  nopost = 'assets/images/newAssests/noPost.png';
  empty_friends = 'assets/images/newAssests/empty_friends.png';
  userShow;

  groupShow;
  groupMembers;
  groupMembersCount;
  groupFeeds;
  noGroupFeed = false;

constructor(private groupService: GroupService,
  private localStorage: LocalStorageService,
  private router: Router,
  private globalService : GlobalService,
  private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user-data'));
    this.groupShow = this.groupService.getGroup(); 
    this.groupMembers = this.groupShow.group_members;
    this.groupMembersCount = this.groupMembers.length;

    const data = {
      lastId: '',
      userId : this.user.user_id,
      groupId : this.groupShow.group_id,
      language : '',

    };
    this.groupService.getGroupFeeds(data)
      .subscribe(
        (response) => {
          if (response.success === 1) {
            this.isLoading = false;
            this.groupFeeds = response.data;
            if(this.groupFeeds[0] == undefined || this.groupFeeds[0] == null){
              this.noGroupFeed = true;
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


  //----- group Feeds -----------
  getmyGroups(){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      language : ''
    };
    this.groupService.getGroupFeeds(data)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          this.isLoading = false;
          this.groupFeeds = response.data;
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
