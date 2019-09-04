import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';



import {DataSource} from '@angular/cdk/table';

               

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LocalStorageService } from './shared/local-storage.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { InternetService } from './shared/internet-connection.service';
import { HttpRequestService } from './shared/http-requests.service';
import { GlobalService } from './shared/global.service';
import { GLobalErrorService } from './shared/global-error.service';
import { AuthGuard } from './shared/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
//import { ProfileComponent } from './auth/profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditProfileComponent } from './auth/edit-profile/edit-profile.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HeaderHomeComponent } from './partials/header-home/header-home.component';
import { UnderConstComponent } from './under-const/under-const.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesService } from './activities/activities.service';
import { HistoryComponent } from './activities/history/history.component';
import { ActivityDetailComponent } from './activities/activity-detail/activity-detail.component';
import { ActivityNearbyComponent } from './activities/activity-nearby/activity-nearby.component';
import {AgmCoreModule} from '@agm/core';
import { ForgotPwdComponent } from './auth/forgot-pwd/forgot-pwd.component';

import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { FilterPipe} from './shared/filter.pipe';
import { AchievementComponent } from './profile/achievement/achievement.component';

import { GroupComponent } from './group/group.component';
import { GroupService } from './group/group.service';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  } from '@angular/material';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupCreateComponent } from './group/group-create/group-create.component';
import { DaysAvailableComponent } from './profile/days-available/days-available.component';

import { EventsComponent } from './events/events.component';
import { EventsService } from './events/events.service';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { CreateActivityComponent } from './activities/create-activity/create-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    SigninComponent,
    ProfileComponent,
    SignupComponent,
    EditProfileComponent,
    FooterComponent,
    HeaderHomeComponent,
    UnderConstComponent,
    ActivitiesComponent,
    HistoryComponent,
    ActivityDetailComponent,
    ActivityNearbyComponent,
    ForgotPwdComponent,
    FilterPipe,
    AchievementComponent,
    GroupComponent,
    UserProfileComponent,
    GroupDetailComponent,
    GroupCreateComponent,
    DaysAvailableComponent,
    EventsComponent,
    CreateEventComponent,
    EventDetailComponent,
    CreateActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    AlertModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    BrowserAnimationsModule,

    OwlDateTimeModule, 
    OwlNativeDateTimeModule,

    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAV910NJZ9cwBSy-MvdDaVwVw1597icBmY',
      libraries: ["places"]
    }),
  ],
  exports: [
    MatNativeDateModule ,
    MatDatepickerModule ,
    MatTooltipModule
    ],
  providers: [
    LocalStorageService,
    AuthService,
    InternetService,
    HttpRequestService,
    GlobalService,
    GLobalErrorService,
    AuthGuard,
    ActivitiesService,
    ProfileService,
    GroupService,
    EventsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
