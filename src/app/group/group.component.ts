import { Component, OnInit  , Pipe, PipeTransform} from '@angular/core';
import { GroupService } from './group.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../shared/filter.pipe';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
@Pipe({
  name: 'filter'
})
export class GroupComponent implements OnInit {

  //variables 

  displayMsg;
  displayImage = 'assets/images/newAssests/user.png';
  dummyImage = 'assets/images/newAssests/fav_icon.png';
  userImage: File = null;
  isLoading = true;
  imagePath = this.globalService.ImagePath;

  globalData;
  // latitude = this.globalService.userLatitude;
  // longitude = this.globalService.userLongitude;

  lat;
  long
  user;


  //------
  nearbyGroups;
  myGroups;

  constructor(private groupService: GroupService,
    private localStorage: LocalStorageService,
    private router: Router,
    private globalService : GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //havt to put it one file
    this.user = JSON.parse(localStorage.getItem('user-data'));
    this.position().then(data => {

      this.groupService.getNearbyGroups(data)
      .subscribe(
        (response) => {
          if (response.success === 1) {
            this.isLoading = false;
            this.nearbyGroups = response.data;
            console.log(this.nearbyGroups);
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
          groupLat : this.lat,
          groupLong : this.long,
          language : ''
        };
        resolve(data);
          });
      }
    })
  }

  getNearbyGroups(){
    this.position().then(data => {
  
    this.groupService.getNearbyGroups(data)
      .subscribe(
        (response) => {
          if (response.success === 1) {
            this.isLoading = false;
            this.nearbyGroups = response.data;
            console.log(this.nearbyGroups);
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

  getmyGroups(){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      language : ''
    };
    this.groupService.getUserGroups(data)
        .subscribe(
          (response) => {
            if (response.success === 1) {
              this.isLoading = false;
              this.myGroups = response.data;
              console.log(this.myGroups);
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

  acceptRejectGroups(group , type , status){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      groupId : group.group_id,
      status : status,
      language : ''
    };
    console.log(data);

    this.groupService.acceptDeleteGroup(data)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.success === 1) {
            if(type == 1){
              this.getNearbyGroups()
            }else {
              this.getmyGroups()
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

  exitGroup(group , type ){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      groupId : group.group_id,
      language : ''
    };
    this.groupService.exitGroup(data)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.success === 1) {
            if(type == 1){
              this.getNearbyGroups()
            }else {
              this.getmyGroups()
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


  joinGroup(){
    
  }

  //----------------delete Group --------------

  deleteGroup(group , type ){
    const data = {
      lastId: '',
      userId : this.user.user_id,
      groupId : group.group_id,
      language : ''
    };
    console.log(data);

    this.groupService.exitGroup(data)
      .subscribe(
      (response) => {
        console.log(response);
        if (response.success === 1) {
          if(type == 1){
            this.getNearbyGroups()
          }else {
            this.getmyGroups()
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

  //------ set group detail -----------
  groupDetail(group){
    //console.log(group);
    this.groupService.setGroup(group);
  }

}
