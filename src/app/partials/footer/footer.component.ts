import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  footer = true;
  constructor(private router: Router) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {

          if (this.router.url === '/') {

            this.footer = true;
          }else if (
            this.router.url === '/user/login' || // login , signup-personal
            this.router.url === '/user/signup-personal' ||
            this.router.url === '/user/verify_account' ||
            this.router.url === '/user/forgot'  ) {
            this.footer = false;
          }
          else {
            this.footer = true;
          }
    });
  }

}
