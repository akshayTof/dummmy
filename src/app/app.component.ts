import { Component } from '@angular/core';
import { Router, NavigationEnd, Event} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLogin = true;
  currentUrl: string;

  constructor(private router: Router, private location: Location) {
    this.router.events
  this.router.events.subscribe((event:Event) => {
		if (event instanceof NavigationEnd ){
			this.currentUrl = event.url;
			console.log(this.currentUrl);
		}
	});
  }

  ngOnInit() {
  console.log(this.location.path());

    console.log('asdasdasdasdasdasd');
    console.log(this.router.url );
    if (this.location.path() === '/login' || this.location.path() === '/') {
      console.log('sdfsdfsdfsdf');
      this.showLogin = false;
    }
  }
}
