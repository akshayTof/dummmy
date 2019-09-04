import { Component, OnInit  , Pipe, PipeTransform, ElementRef, NgZone,  ViewChild} from '@angular/core';
import { EventsService } from '../events.service';
import { FormControl , NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { copyStyles } from '@angular/animations/browser/src/util';
import { FilterPipe} from '../../shared/filter.pipe';
declare var $ : any ; 

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})



export class CreateEventComponent implements OnInit {

  //variables 
  
  displayMsg;
  displayImage = 'assets/images/newAssests/user.png';
  dummyImage = 'assets/images/newAssests/fav_icon.png';
  userImage: File = null;
  isLoading = true;
  imagePath = this.globalService.ImagePath;
  timezone;

  globalData;
  // latitude = this.globalService.userLatitude;
  // longitude = this.globalService.userLongitude;

  lat;
  long
  user;
  eventUploadPic = 'assets/images/profile-placeholder.png';
  //------
  nearbyEvents;
  myEvents;
  historyEvents;
  eventDetail;
  noEvents = 'assets/images/newAssests/noEvents.png';
  noMyEvents;
  noNearbyEvents;
  noHistoryEvents;
  userData;
  activities;
  eventUploadFormPic;

  activitySelected = false;
  selectedActivity; 

  locationName;
  Placelat;
  Placelng;

  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('closeBtn') closeBtn: ElementRef;


  constructor(private eventsService: EventsService,
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
    this.placeSearch();
  }

  pickDate(){
    console.log("aaaaaajjjj")
    $('#datetimepicker2').datepicker('show');
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
}

onFileChange(file: FileList) {
  //this.groupUploadGroupPic
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);
  reader.onload = (event: any) => {
    this.eventUploadPic = event.target.result;
  };
   
   this.eventUploadFormPic = file[0];
}

  placeSearch(){
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

  setActivity(activity){
    this.activitySelected = true;
    this.selectedActivity = activity; 
    // activity_name;
    this.closeModal();
  }

  getActivities(){

    this.eventsService.getUserActivities(this.userData)
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



  //         user_id
// event_name
// event_location -- ye event ka address hai
// event_lat
// event_long
// event_description
// event_seating_capacity
// event_country
// event_city
// event_start_time
// event_end_time
// event_timezone
// event_Category --- name of category selected
// activity_id
// host_name
// host_email
// host_phone

// ticket_price --- optional hai, 0 bhej dena
// event_type --- agar private event hai to 2 nhi to 1

// event_paid --- always send this as 1
// event_category --- id of categor
// event_category_name
// all_day --- value is 1 if all day is on and 0 if it is off

        //event_country
        //event_timezone

        createEvent (form : NgForm){

           //(req.file === undefined) ? "" : req.file.filename
          const data = {
            form: form.value,
            locationName : (this.locationName == undefined) ? "" : this.locationName,
            group_admin : this.user.user_id,
            groupImage : this.eventUploadFormPic,
            group_activity_id : this.selectedActivity.activity_id,
            group_activity_name : this.selectedActivity.activity_name,
            group_type : 1,
            group_lat : this.Placelat,
            group_long : this.Placelng,
            
          };
          console.log(data);
          //  this.eventsService.createEvent(data).subscribe(
          //    (response) =>{
      
          //     if (response.success === 1) {
          //       this.isLoading = false;
          //       const data = {
          //         page_no: '',
          //       };
          //       this.router.url === '/group'
          //        //this.modalRef.hide();
          //        //this.getArtist(response.data._id);
      
          //     } else {
          //       // navigate to error page
          //       this.isLoading = false;
          //       console.log(response);
          //       // this.globalErrorService.errorOccured(response);
          //     }
          //   },
          //   (error) =>{
          //     console.log(error , "error aya hai");
          //   }
          // );
        }

}
