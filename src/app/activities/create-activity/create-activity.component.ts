import { Component, OnInit, Output, EventEmitter, TemplateRef, ViewEncapsulation, ElementRef, NgZone,  ViewChild } from '@angular/core';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service'
import { MapsAPILoader, AgmMap } from '@agm/core';

import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent, BsModalRef, BsModalService } from 'ngx-bootstrap';
 import { ActivitiesService } from '../activities.service';
import { NgForm , FormControl} from '@angular/forms';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit {

  mapModal: HTMLElement;
  mapModalInput : HTMLElement;

   //variables 


   displayMsg;
   displayImage = 'assets/images/newAssests/user.png';
   dummyImage = 'assets/images/newAssests/fav_icon.png';
   userImage: File = null;
   isLoading = true;
   imagePath = this.globalService.ImagePath;
   user;

  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  userFriends;
  userFriendsMessage;
  activities;
  selectedActivity;
  activitySelected = false;
  uploadPic = 'assets/images/profile-placeholder.png';
  uploadFormPic ;

   userData;
   hideModal: boolean = true;
   Placelat : number;
   Placelng : number;
   locationName;
   createActivityMembers = [];

  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  //map: google.maps.Map;


  constructor(private activitiesService: ActivitiesService,
    private localStorage: LocalStorageService,
    private router: Router,
    private globalService : GlobalService,
    private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user-data'));

    const data = {
      page_no: '',
      userId : this.user.user_id,
      friendId : this.user.user_id
    };
    this.userData =  data;


    //-----next function ----

    this.mapsAPILoader.load().then(() => {
      console.log(this.searchElementRef.nativeElement);
     // this.map = new google.maps.places.Autocomplete();
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //formatted_address
          this.locationName = place.formatted_address;

          //set latitude, longitude and zoom
          this.Placelat = place.geometry.location.lat();
          this.Placelng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  onFileChange(file: FileList) {
    //this.groupUploadGroupPic
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = (event: any) => {
      this.uploadPic = event.target.result;
    };
    
    this.uploadFormPic = file[0];
  }


  //---------get activities ------------

  getActivities(){

    this.activitiesService.getUserActivities(this.userData)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           this.user = response.user;
           
           this.activities = response.activity;
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

  //---------get user Friends ------

  getUserFriends(){
    this.activitiesService.getUserFriends(this.userData)
    .subscribe(
      (response) => {
        if (response.success === 1) {
          this.isLoading = false;
          this.userFriends = response.friend;
          console.log(this.userFriends);
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
      }
    );
  }

  setActivity(activity){
    this.activitySelected = true;
    this.selectedActivity = activity; 
    // activity_name;
    this.closeModal();
  }

  createGroupMember(userFriend){
    this.createActivityMembers.push(userFriend.user_id);
  }


  createGroup (form : NgForm){

    if ( this.uploadFormPic === "" || this.uploadFormPic === undefined) {
        this.uploadFormPic =""
      }
     //(req.file === undefined) ? "" : req.file.filename
    var sendMembers = this.createActivityMembers.toString();
    const data = {
      form: form.value,
      locationName : (this.locationName == undefined) ? "" : this.locationName,
      group_admin : this.user.user_id,
      groupImage : this.uploadFormPic,
      group_activity_id : this.selectedActivity.activity_id,
      group_activity_name : this.selectedActivity.activity_name,
      group_type : 1,
      group_lat : this.Placelat,
      group_long : this.Placelng,
      group_members : sendMembers
      
    };
    console.log(data);
     this.activitiesService.createActivity(data).subscribe(
       (response) =>{

        if (response.success === 1) {
          this.isLoading = false;
          const data = {
            page_no: '',
          };
          this.router.url === '/group'
           //this.modalRef.hide();
           //this.getArtist(response.data._id);

        } else {
          // navigate to error page
          this.isLoading = false;
          console.log(response);
          // this.globalErrorService.errorOccured(response);
        }
      },
      (error) =>{
        console.log(error , "error aya hai");
      }
    );
  }

}
