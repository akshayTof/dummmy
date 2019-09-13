import { Component, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as $ from 'jquery';
// import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-header-component',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './header.component.html'
})
export class HeaderComponent{
    public pageName = 'Job';
    constructor(public router: Router) {
    }

    @Input() callback: Function;
    redirectToHome() {
        this.router.navigateByUrl('dashboard/home');
    }
    redirectToAbout() {
        this.router.navigateByUrl('dashboard/about');
    }
    logMeOut(){
        this.router.navigateByUrl('login');
    }
    redirectToStaticpage(arg) {
        console.log(arg);
        if(this.callback){
            this.callback(arg);
        }else{
            this.router.navigateByUrl('staticpage');
        }
    }

}
