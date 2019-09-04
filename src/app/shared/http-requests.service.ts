import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
@Injectable()
export class HttpRequestService {

  // ***** varibale defines here  for api *****

  //user
  login;
  signup;

  //Activities
  getActivities
  getHistoricActivities;

  //profile 
  getUserProfile;
  getUserActivities;
  getUserFriends;
  getUserFriendRequests;
  setActivity;
  unfriend;
  acceptFriendReq;
  sendFriendRequest;
  searchUsers;
  userAchievements;

  //------groups----------
  nearbygroups;
  myGroups;
  acceptDeleteGroup;
  updateGroup;
  createGroup;
  searchGroup;
  exitGroup;
  deleteGroup;
  groupFeeds;

  //---------events --------
  nearbyEvents;
  getUserHistoricEvent;
  getMyEvents;
  getEventDetail;
  addEventInterest;
  unintrestedEvent;
  deleteEvent;
  editEvent;
  createEvent;
  goingEvent;
  ungoingEvent;
 

  constructor() {

    this.login = 'user_auth/login';
    this.signup = 'user_auth/sign_up';

    //Activities ============
    this.getActivities = 'linkup_new/get_my_activities'  // my activity
    this.getHistoricActivities = 'linkup_new/get_historic_activities'

    //----profile 

    this.getUserProfile = 'user/get_user_profile';
    this.getUserActivities = 'activity/get_activity';
    this.getUserFriends = 'friend/get_friends';
    this.getUserFriendRequests = 'friend/get_pending_request';
    this.setActivity = 'activity/set_activity';
    this.unfriend = 'friend/unfriend';
    this.acceptFriendReq = 'friend/accept_friend_request';
    this.sendFriendRequest = 'friend/send_friend_request';
    this.searchUsers = 'event/mix_up_get_nearby_users';
    this.userAchievements = 'user/user_achievements';

    //-----------groups --------------
    this.nearbygroups = 'group_activity/get_nearby_groups';
    this.myGroups = 'group_activity/get_all_group';
    this.acceptDeleteGroup = 'group_activity/group_accept_delete';
    this.updateGroup = 'group_activity/update_group_activity'; // put
    this.createGroup = 'group_activity/create_group_activity'; // post
    this.searchGroup = 'group_activity/get_group_by_searching';
    this.exitGroup = 'group_activity/leave_group_activity';
    this.deleteGroup = 'group_activity/group_delete';
    this.groupFeeds = 'group_feeds/get_group_feeds';

    //------------Events ----------

    this.nearbyEvents = 'event/get_nearby_event';
    this.getUserHistoricEvent = 'event/get_user_historic_event';
    this.getMyEvents = 'event/get_active_event';
    this.getEventDetail = 'event/get_single_event';
    this.addEventInterest = 'event/add_event_interest'; //post // add intrested
    this.unintrestedEvent = 'event/unlike_ungoing_event'; //post // for ungoing 1 unintrested 2
    this.deleteEvent = 'event/delete_event';
    this.editEvent = 'event/edit_event';
    this.createEvent = 'event/create_event';
    this.goingEvent = 'event/accept_event'; // for add going

  }
}
