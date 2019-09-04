import { ProfileService } from '../profile.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../../shared/filter.pipe';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
@Pipe({
  name: 'filter'
})
export class UserProfileComponent implements OnInit {

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
  nopost = 'assets/images/newAssests/post-it.svg';
  empty_friends = 'assets/images/newAssests/empty_friends.png';
  userShow;


  userPostEmpty = true;
  userlistedActivities;
  userActivities;
  userFriends;
  userFriendsMessage = false;
  userFriendRequests;
  userFriendRequestsMessage = false;
  type = 0;
  searchText;
  activityLoading = false;
  acticityId;
  localSearch = true;

constructor(private profileService: ProfileService,
  private localStorage: LocalStorageService,
  private router: Router,
  private globalService : GlobalService,
  private route: ActivatedRoute) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user-data'));
    this.userShow = this.profileService.getUser(); 
    console.log(this.userShow);
    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.userShow.user_id
    };

    this.profileService.getUserProfile(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.user = response.user;
           
           this.userActivities = response.activity;
          //  if(this.userFriends[0] == null){
          //   this.userFriendsMessage = true;
          // }
           
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


  //function to get the user friends list

  getUserFriends(){
    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.userShow.user_id
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

  
  //--------get user profile ----------
  getUserProfile(data){
    this.profileService.getUserProfile(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.user = response.user;
           
           this.userActivities = response.activity;
          //  if(this.userFriends[0] == null){
          //   this.userFriendsMessage = true;
          // }
           
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

  //------change profile friends arrays change ---------

  getChengedUserFriends(data){

    console.log(data);
    
    //-----can be done below
    this.profileService.getUserFriends(data)
    .subscribe(
      (response) => {
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

  //--------change the arrays for changing the profile -----------

  changeProfile (user){
    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : user.user_id
    };
    //this.userShow.user_id
    this.userShow = user;
    this.getUserProfile(data);
    this.getChengedUserFriends(data);
    
  }

  userProfile (user){
    console.log("user profile fro m profile")
    this.profileService.setUser(user);
  }

}
