import { Component , OnInit} from '@angular/core';
import { GlobalService } from './shared/global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  latitude;
  longitude;

  title = 'app';

  constructor(
    private globalService : GlobalService)
   { }

  ngOnInit() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition( position => {

       // this.globalService.userLatitude;
       this.globalService.userLatitude = position.coords.latitude;
       this.globalService.userLongitude = position.coords.longitude;
        });
    }
  }
}
