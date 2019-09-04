import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import { ProfileComponent } from './auth/profile/profile.component';
import { UnderConstComponent } from './under-const/under-const.component';

import { ActivitiesComponent } from './activities/activities.component';
import { CreateActivityComponent } from './activities/create-activity/create-activity.component';

import { HistoryComponent } from './activities/history/history.component';
import { ActivityDetailComponent } from './activities/activity-detail/activity-detail.component';
import { ActivityNearbyComponent } from './activities/activity-nearby/activity-nearby.component';
import { ForgotPwdComponent } from './auth/forgot-pwd/forgot-pwd.component';

import { ProfileComponent } from './profile/profile.component';
import { AchievementComponent } from './profile/achievement/achievement.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { DaysAvailableComponent } from './profile/days-available/days-available.component';

import { GroupComponent } from './group/group.component';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';
import { GroupCreateComponent } from './group/group-create/group-create.component';

import { EventsComponent } from './events/events.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';


//import { VerifyAccountComponent } from './auth/verify-account/verify-account.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'user' , children: [
     { path: 'signup-personal', component: SignupComponent},
     { path: 'login', component: SigninComponent},
     //{ path: 'verify_account', component: VerifyAccountComponent},
     //{ path: 'profile', component: ProfileComponent},
     { path: 'forgot', component: ForgotPwdComponent}
    ]},
    
    { path: 'profile' , children: [
     { path: '', component: ProfileComponent},
     {path : 'user' , component : UserProfileComponent},
     { path: 'achievements', component: AchievementComponent},
     { path: 'daysAvailable', component: DaysAvailableComponent}
    ]},

    { path: 'group' , children: [
    { path: '', component: GroupComponent},
    {path : 'detail' , component : GroupDetailComponent},
    { path: 'create', component: GroupCreateComponent}
    ]},

    { path: 'events' , children: [
      { path: '', component: EventsComponent},
      { path: 'create', component: CreateEventComponent},
      { path: 'detail', component: EventDetailComponent}
      ]},
    // { path: 'feed' , children: [
    // // { path: 'feeds', component: FeedsComponent}
    // ]},
    { path: 'chat' , children: [
    // { path: 'chat', component: ChatComponent},
    // { path: 'initiate-chat', component: InitiateChatComponent},
    // { path: 'create-group', component: CreateGroupComponent},
    ]},
    { path: 'activity' , children: [
      { path: '', component: ActivitiesComponent},
      { path: 'history', component: HistoryComponent},
      { path: 'detail', component: ActivityDetailComponent},
      { path: 'nearby', component: ActivityNearbyComponent},
      { path: 'create', component: CreateActivityComponent}
      // { path: 'create-group', component: CreateGroupComponent},
      // { path: 'create-group', component: CreateGroupComponent},
      ]},
   // { path: 'about', redirectTo: '/under-construction'},
   // { path: 'blog', redirectTo: '/under-construction'},
   // { path: 'store', redirectTo: '/under-construction'},
    //{ path: 'policy', redirectTo: '/under-construction'},
   { path: 'under-construction', component: UnderConstComponent},
   { path: '**', redirectTo: '/under-construction'} // wild card route
 ];
 @NgModule({
    imports: [RouterModule.forRoot(appRoutes , { useHash: true })],
    exports: [RouterModule]
 })
 export class AppRoutingModule {
 }
