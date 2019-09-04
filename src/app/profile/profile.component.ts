import { ProfileService } from './profile.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../shared/local-storage.service';
import { GlobalService } from '../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../shared/filter.pipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
@Pipe({
  name: 'filter'
})
export class ProfileComponent implements OnInit  {

// ------- global variables ---------
postSubmit = false;
message = false;
error;
displayMsg;
displayImage = 'assets/images/newAssests/user.png';
dummyImage = 'assets/images/newAssests/fav_icon.png';
userImage: File = null;
isLoading = true;
user;
noReqImage = 'assets/images/newAssests/no_req.png';
empty_friends = 'assets/images/newAssests/empty_friends.png';


userlistedActivities;
userActivities;
userFriends;
userFriendsMessage = false;
userFriendRequests;
userFriendRequestsMessage = false;
imagePath = this.globalService.ImagePath;
type = 0;
searchText;
activityLoading = false;
acticityId;
localSearch = true;
//-----search screen variables-----
searchUserValue;
searchUsers = [];

rotation = true;
  constructor(private profileService: ProfileService,
              private localStorage: LocalStorageService,
              private router: Router,
              private globalService : GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user-data'));

    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.user.user_id
    };

   this.profileService.getUserActivities(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.user = response.user;
           
           this.userlistedActivities = response.activity;
           console.log(this.userlistedActivities);
           this.displayActivities(this.userlistedActivities).then(data => {
            this.userActivities = data;
           console.log(data);
           })
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
      //-----can be done below
      this.profileService.getUserFriends(data)
     .subscribe(
       (response) => {
        // console.log(response.numPages);
         if (response.success === 1) {
           this.isLoading = false;
           this.userFriends = response.friend;
           if(this.userFriends[0] == null){
            this.userFriendsMessage = true;
            console.log(this.userFriendsMessage)
          }
          else {
            this.userFriendsMessage = false;
          }

           //console.log(this.activities);
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

  //have to check where this function is using
  profileTab (type){
    this.type = type;
  }

  //sorting function of activities

  displayActivities(data) {
    return new Promise((resolve, reject) => {
     data.sort(function(a, b){return  b.selected - a.selected });
     resolve (data);
      })
  }

  //-----to go to the user profile

  userProfile (user){
    this.profileService.setUser(user);
  }

  //function to get the user friends list

  getUserFriends(){
    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.user.user_id
    };
    //-----can be done below
    this.profileService.getUserFriends(data)
    .subscribe(
      (response) => {
       // console.log(response.numPages);
        if (response.success === 1) {
          this.isLoading = false;
          this.localSearch = true;
          this.userFriends = response.friend;
          if(this.userFriends[0] == null){
           this.userFriendsMessage = true;
         }
         else {
          this.userFriendsMessage = false;
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


  friendReq(user){
    const data = {
      page_no: '',
      userId : user.user_id,
      friendId : user.user_id
    };
     this.profileService.getUserFriendRequest(data)
     .subscribe(
       (response) => {
        // console.log(response.numPages);
         if (response.success === 1) {
           this.isLoading = false;
           this.localSearch = true;
           this.userFriendRequests = response.friend;
           if(this.userFriendRequests[0] == null){
             this.userFriendRequestsMessage = true;
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


  setActivity(activity , index){
    this.acticityId = index;
    this.userActivities[index].selected = 2;
    this.activityLoading = true; 
    const data = {
      page_no: '',
      userId : this.user.user_id,
      activityId : activity.activity_id
    };
    console.log(data);
    this.profileService.setActivity(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.getActivity ()           
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

  getActivity (){
    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.user.user_id
    };
    this.profileService.getUserActivities(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.activityLoading = false;
           this.acticityId = undefined
           //this.visibility = true;
           this.isLoading = false;
           this.localSearch = true;
           this.user = response.user;
           
           this.userlistedActivities = response.activity;
           console.log(this.userlistedActivities);
           this.displayActivities(this.userlistedActivities).then(data => {
            this.userActivities = data
            console.log(data);
            })
           //==========sorted code 
           //var sorted = this.userActivities.selected.sort();
           //console.log(sorted);
           //console.log(this.activities);
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

  //----- for unfriend function -----------------

  unfriend(user){
    this.activityLoading = true; 

    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : user.user_id
    };
    console.log(data);
    this.profileService.unfriend(data)
     .subscribe(
       (response) => {
        // console.log(response.numPages);
         if (response.success === 1) {
           this.isLoading = false;
           this.getUserFriends ()
           

           //console.log(this.activities);
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


  acceptReject(friend, status){
    // console.log(user , "sss");

    this.activityLoading = true; 
    console.log("acceptReject ");

    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : friend.user_id,
      id : friend.id,
      status : status
    };
    console.log(data);
    console.log("acceptReject ");
    this.profileService.acceptReject(data)
     .subscribe(
       (response) => {
        // console.log(response.numPages);
         if (response.success === 1) {
           this.isLoading = false;
           this.friendReq(this.user)
           //console.log(this.activities);
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


  searchUser(){
    this.localSearch = false;
  }
  searchPeoples(valueName){
 
     if(valueName === '' || valueName === undefined || valueName === null){
      this.searchUsers = [];
     } else {
      const data = {
        page_no: '',
        userId : this.user.user_id,
        valueName : valueName
      };
      this.profileService.allSearchUsers(data)
        .subscribe(
          (response) => {
            if (response.success === 1) {
              this.isLoading = false; 
              this.searchUsers = [];
              console.log(data);
              console.log(valueName)
              this.searchUsers = response.nearbyuser;
              console.log(response.nearbyuser);
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

  addFriend(searchUser , searchUserValue){
    this.activityLoading = true; 
    console.log("send_friend_request ");

    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : searchUser.user_id,
    };
    console.log("acceptReject ");
    this.profileService.sendFriendRequest(data)
     .subscribe(
       (response) => {
        // console.log(response.numPages);
         if (response.success === 1) {
           console.log(response);
           this.isLoading = false;
           this.searchPeoples(searchUserValue);
           
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
