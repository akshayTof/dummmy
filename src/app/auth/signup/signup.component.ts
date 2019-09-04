import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../shared/local-storage.service';


export interface Gender {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  genders: Gender[] = [
    {value: 'male-0', viewValue: 'Male'},
    {value: 'female-1', viewValue: 'Female'},
    {value: 'others-2', viewValue: 'Other Identity'}
  ];

startDate = new Date(1990, 0, 1);

defaultGender = 'male';
postSubmit = false;
message = false;
error;
displayMsg;
displayImage = 'assets/images/profile-pic.png';
userImage: File = null;

value: Date;

rotation = true;
  constructor(private authService: AuthService,
              private localStorage: LocalStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onFileChange(file: FileList) {
    this.userImage = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.displayImage = event.target.result;
    };
     reader.readAsDataURL(this.userImage);
  }

  onSignup(form: NgForm) {
    console.log(form.status);
    console.log("======================");
    if (form.status === 'INVALID') {
      this.postSubmit = true;
      this.message = true;
      this.displayMsg = "Mandatory Parameter Missing.";
      this.error = 'Mandatory Parameter Missing.';
      console.log("0000000000000000000");
    }
    //  else if (form.value.password !== form.value.cpassword) {
    //   console.log("password eroor")
    //   this.postSubmit = true;
    //   this.error = 'Password Not Match!';
    // } 
    // else if (form.value.accept !== true) {
    //   console.log("accept eroor")
    //   this.message = true;
    //   this.displayMsg = 'Please Accept Agreement';
    // } 
    else {
      this.message = false;
      this.postSubmit = false;
      const body = {
         email : form.value.email,
         password: form.value.password,
         gender: form.value.gender,
         dob: form.value.DOB,
         first_name: form.value.fullName,
         profilePic: this.userImage
      };
      console.log("aaaaaaaaa");


      

      //Post request to store user data
      this.authService.signup(body)
      .subscribe(
        (response) => {
          console.log(response);
          console.log(response.success);
          console.log(response.success);
          // if registered successfully login
          if (response.success === 1) {
            this.message = false;
            this.postSubmit = false;
            // clearing data in local storage
            localStorage.clear();

            // storing data in local storage
            console.log("1111111111111111");
            this.localStorage.set('user-data', response.data);
            this.localStorage.set('token', response.data.token);

            this.router.navigate(['profile']);
            // redirect to varification page

          } if (response.success === 0) {
            this.postSubmit = true;
            this.message = true;
            console.log("0000000000000000");
            this.displayMsg = response.msg;
            this.error = 'Oops! Unexpected error.';
          }
            form.reset();
            this.displayImage = 'assets/images/profile-pic.png';
        },
        (error) => {
          // handle all error cases
          console.log(error);
        }
      );
    }
  }

  //ajaytest1

  checkRotate (){
    this.rotation = true;
    console.log('changes --');
  }

  valSelected() {
    this.rotation = false;
    console.log("22222");
  }
}
