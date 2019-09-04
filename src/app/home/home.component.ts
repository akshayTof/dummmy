import { Router } from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
type PaneType = 'left' | 'right' | 'normal';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
   './home.component.css',
   '../shared/css/slick-theme.css',
   '../shared/css/slick.css'

  ]
})

export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
}


}
