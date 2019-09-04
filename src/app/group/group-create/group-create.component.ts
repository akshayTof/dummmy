/// <reference types="@types/googlemaps" />


import { Component, OnInit  , Pipe, PipeTransform , ElementRef, NgZone,  ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
// import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { GroupService } from '../group.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../../shared/filter.pipe';



 declare let google: any;

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {

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
  groupUploadPic = 'assets/images/profile-placeholder.png';
  groupUploadFormPic ;

  userData;
  hideModal: boolean = true;
  Placelat : number;
  Placelng : number;
  locationName;
  createGroupMembers = [];

  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('closeBtn') closeBtn: ElementRef;

  //map: google.maps.Map;


  constructor(private groupService: GroupService,
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
    
    this.getActivities();
    this.getUserFriends();
    this.position()

    this.zoom = 4;
    

    //[formControl]="searchControl"


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
    this.groupUploadPic = event.target.result;
  };
   
   this.groupUploadFormPic = file[0];
}
  

  position() {
    return new Promise((resolve, reject) => {
      if (navigator) {
        navigator.geolocation.getCurrentPosition( position => {
        // this.globalService.userLatitude;
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const data = {
          page_no: '',
          userId : this.user.user_id,
          groupLat : this.lat,
          groupLong : this.lng,
          language : ''
        };
        resolve(data);
        });
      }
    })
  }


  //---------get activities ------------

  getActivities(){

    this.groupService.getUserActivities(this.userData)
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
    this.groupService.getUserFriends(this.userData)
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
    this.createGroupMembers.push(userFriend.user_id);
  }

  createGroup (form : NgForm){

    if ( this.groupUploadFormPic === "" || this.groupUploadFormPic === undefined) {
        this.groupUploadFormPic =""
      }
     //(req.file === undefined) ? "" : req.file.filename
    var sendMembers = this.createGroupMembers.toString();
    const data = {
      form: form.value,
      locationName : (this.locationName == undefined) ? "" : this.locationName,
      group_admin : this.user.user_id,
      groupImage : this.groupUploadFormPic,
      group_activity_id : this.selectedActivity.activity_id,
      group_activity_name : this.selectedActivity.activity_name,
      group_type : 1,
      group_lat : this.Placelat,
      group_long : this.Placelng,
      group_members : sendMembers
      
    };
    console.log(data);
     this.groupService.createGroup(data).subscribe(
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

  

  //------------ google map function-----
  //  initAutocomplete() {
  //   var map = new google.maps.Map(this.mapModal, {
  //     center: {lat: -33.8688, lng: 151.2195},
  //     zoom: 13,
  //     mapTypeId: 'roadmap'
  //   });

  //   // Create the search box and link it to the UI element.
  //   var input = this.mapModalInput;
  //   var searchBox = new google.maps.places.SearchBox(input);
  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //   // Bias the SearchBox results towards current map's viewport.
  //   map.addListener('bounds_changed', function() {
  //     searchBox.setBounds(map.getBounds());
  //   });

  //   var markers = [];
  //   // Listen for the event fired when the user selects a prediction and retrieve
  //   // more details for that place.
  //   searchBox.addListener('places_changed', function() {
  //     var places = searchBox.getPlaces();

  //     if (places.length == 0) {
  //       return;
  //     }

  //     // Clear out the old markers.
  //     markers.forEach(function(marker) {
  //       marker.setMap(null);
  //     });
  //     markers = [];

  //     // For each place, get the icon, name and location.
  //     var bounds = new google.maps.LatLngBounds();
  //     places.forEach(function(place) {
  //       if (!place.geometry) {
  //         console.log("Returned place contains no geometry");
  //         return;
  //       }
  //       var icon = {
  //         url: place.icon,
  //         size: new google.maps.Size(71, 71),
  //         origin: new google.maps.Point(0, 0),
  //         anchor: new google.maps.Point(17, 34),
  //         scaledSize: new google.maps.Size(25, 25)
  //       };

  //       // Create a marker for each place.
  //       markers.push(new google.maps.Marker({
  //         map: map,
  //         icon: icon,
  //         title: place.name,
  //         position: place.geometry.location
  //       }));

  //       if (place.geometry.viewport) {
  //         // Only geocodes have viewport.
  //         bounds.union(place.geometry.viewport);
  //       } else {
  //         bounds.extend(place.geometry.location);
  //       }
  //     });
  //     map.fitBounds(bounds);
  //   });
  // }

  

}
