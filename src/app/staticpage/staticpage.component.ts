import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header-component',
//   templateUrl: './staticpage.component.html',
//   styleUrls: ['./staticpage.component.css']
// })
@Component ({
  selector: 'app-static-component',
  templateUrl: '/staticpage.component.html',
})
export class StaticpageComponent implements OnInit {

  constructor(public router: Router) { }
  type:boolean = true

  ngOnInit() {
    if(this.type){
      console.log('initiliazed');
    }
  }

  callType(arg: string) {
    console.log('recalled '+arg);
    this.type = false
  }

  redirectToStaticpage() {
    this.router.navigateByUrl('staticpage');
  }
}
