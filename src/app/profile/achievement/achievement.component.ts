import { ProfileService } from '../profile.service';
import { Component, OnInit , Pipe, PipeTransform} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css']
})
export class AchievementComponent implements OnInit {

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
  timezone;

  userAchievements;
  localAchievementsImage = 'assets/images/achievements/'

  constructor(private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private router: Router,
    private globalService : GlobalService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.userShow = this.profileService.getUser(); 

    // console.log(this.userShow);
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = {
      page_no: '',
      userId : this.userShow.user_id,
      timezone : this.timezone
    };

    this.profileService.getUserAchievments(data)
     .subscribe(
       (response) => {
         if (response.success === 1) {
           this.isLoading = false;
           console.log("this.userAchievements");
           
           this.userAchievements = response.user_achievements;
           console.log(this.userAchievements);
           
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
