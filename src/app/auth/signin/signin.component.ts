import { LocalStorageService } from '../../shared/local-storage.service';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showMessage = false;
  message;
  showMsg = false ;
  postaccept = false;
  constructor(private authService: AuthService,
              private localStorage: LocalStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  //   $(window).scroll(function() {
  //     if ($(window).scrollTop() >= 115) {
  //         $('.navbar.navbar-default.navbar-fixed-top').addClass('condensed');
  //         $('.navbar-default .navbar-toggle').css('margin-top', '21px');
  //         $('.navbar-collapse.collapse').css('top', '-26px');
  //         $('.navbar-collapse.collapse').css('position', 'relative');
  //     } else {
  //         $('.navbar.navbar-default.navbar-fixed-top').removeClass('condensed');
  //         $('.navbar-default .navbar-toggle').css('margin-top', '40px');
  //         $('.navbar-collapse.collapse').css('top', '0px');
  //     }
  // });

  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const pass = form.value.password;
    const body = {
     'email': email,
     'password': pass
   };
   this.authService.signin(body).subscribe(
      (response) => {
        console.log(response);
        // if response 2 verify account
        console.log(response.msg);
        if (response.success === 2) {
          console.log('print error message');
          this.showMessage = true;
          this.showMsg = true;
          this.message = response.msg;
        } else if (response.success === 1) {
          // if response 1 clear local storage and store data again

          // clearing data in local storage
          localStorage.clear();

          // storing data in local storage
          this.localStorage.set('user-data', response.data);
          this.localStorage.set('token', response.data.token);

          // navigating to profile
          this.router.navigate(['profile']);
        }
        if (response.success === 0) {
          this.showMsg = true;
          this.postaccept = true;
          console.log('something went wrong!!', response.msg);
        }
    },
      (error) => 
      this.showMsg = true
      // console.log('error!!', error)
    );
 }

}
