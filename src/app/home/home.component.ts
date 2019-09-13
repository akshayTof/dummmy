import { Component } from '@angular/core';
// import {  } from '@';
import { environment } from '@environments/environment';
import { ArtistService } from '../artist.service';
import { HttpClient } from '@angular/common/http';

@Component ({
   selector: 'app-home-component',
   templateUrl: '/home.component.html',
})
export class HomeComponent  {

   artist: Object;

  constructor(private artistData: ArtistService, private http: HttpClient) { }

  ngOnInit() {
    this.artistData.getartist().subscribe(artistData => {
      this.artist = artistData;
      console.log(this.artist);
    })
  }
}