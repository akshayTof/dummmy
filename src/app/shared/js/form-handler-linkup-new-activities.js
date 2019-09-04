(function () {
		var usnm = "swiftspar@emilence.com";
		var passw = "Emilence@1";
		var auther = "Basic " + btoa(usnm + ":" + passw);
	function init(){
		var imagepath = $("#uploadspath").val();
		var profilepage = location.pathname;
		//alert(profilepage);
		if(profilepage=='/linkup_new/my_activity'){
			setTimeout(function(){ 
			   get_my_activities(profilepage,imagepath);
			   get_nearby_activities(profilepage,imagepath);
			   get_historic_activities(profilepage,imagepath);
			}, 2000);
		}
		if(profilepage.indexOf("/linkup_new/view_activity/") != -1){ 
			var profilepage='/linkup_new/view_activity';
			get_single_linkup(profilepage,imagepath);
			
		}
		if(profilepage=='/linkup_new/add_new_request'){
			var teamid='1';
			getfriendforlinkup(profilepage,imagepath,teamid);
		}
		if(profilepage=='/linkup_new/activity-historic'){
			setTimeout(function(){ 
			   get_historic_activities(profilepage,imagepath);
			}, 3000);
			
		} 
		if(profilepage=='/linkup_new/activity-nearby'){
			//getLocation();
			setTimeout(function(){ 
			   get_nearby_activities(profilepage,imagepath);
			}, 2000);
			
		}
		if(profilepage=='/linkup_new/activity-pending'){
			//getLocation();
			get_user_pending_req(profilepage,imagepath);
			get_link_group_total_pending(profilepage,imagepath);
		}  		
		//myactivities_search 
		$('#searchbox_myactivity').keyup(searchbox);
		$('#searchbox_myactivity_btn').click(searchbox);
		
		
		$(document).on("click", ".deletelinkupbutton" , function() {
			var id =$(this).attr('id');
			var linkup_ids = id.split('-');
			var linkup_id = linkup_ids[1];
			//alert(linkup_id);
			deletelinkup(linkup_id); 
		});
		$(document).on("click", ".linkupeditbutton" , function() {
			var id =$(this).attr('id');
			var linkup_ids = id.split('-');
			var linkup_id = linkup_ids[1];
			linkup_new_edit(linkup_id); 
		});
		$(document).on("click", ".singleplayer" , function() {
			var id =$(this).attr('id');
			var user_ids = id.split('-');
			var player_id = user_ids[1];
			singleplayer(player_id);
		});
		$(document).on("click", "#donewithplayer" , function() {
			$("#playertab").toggleClass("removerow");
			$("#allteams").toggleClass("removerow");
			$("#addanotherteam").toggleClass("removerow");
			$(this).addClass("removerow");
			$("#groupmust").val(1);
			$("#linkup_single_activity").val(0);
		});
		$(document).on("click", ".teamplayer" , function() {
			var id =$(this).attr('id');
			var user_ids = id.split('-');
			var team_id = user_ids[1];
			var player_id = user_ids[2];
			teamplayer(team_id,player_id);
		});
		$('#Addlinkup').click(Addlinkup);
		$('#addanotherteam').click(AddTeam);
		
	
		$("#private_public_switch").on('change', function() {
			var value = $(this).is(":checked");
			if(value==true){
				$("#private_public").val('1');
			}else{
				$("#private_public").val('0');
			}
		});
		$("#all_day_switch").on('change', function() {
			var value = $(this).is(":checked");
			if(value==true){
				$("#all_day").val('1');
			}else{
				$("#all_day").val('0');
			}		
		});
		
		//get activity location on change Activity
		$("#eventactivity").on('change', function() {
			var activity_id = $(this).val();
		    getActivityLocation(activity_id);	
		});
		// link_up accept
		$(document).on("click", ".linkupaccept" , function() {
			var id =$(this).attr('id');
			var linkup_ids = id.split('-');
			var linkup_id = linkup_ids[1];
			var status=1;
			Accept_Reject_linkup_request(linkup_id,status);
		}); 
		
		// link_up accept
		$(document).on("click", ".linkupreject" , function() {
			var id =$(this).attr('id');
			var linkup_ids = id.split('-');
			var linkup_id = linkup_ids[1];
			var status=2;
			Accept_Reject_linkup_request(linkup_id,status);
		});
		/* $("#activity_locationselectbox").on('change', function() {
			var activity_id = $(this).val();
			$("#linkupnew_location").val(activity_id);
			 //getActivityLocation(activity_id);	
		}); */
		
	}
	/*validation  */
	
	/* $("#create_linkupactivityForm" ).submit(function( event ) {
		alert("dfdfdsfd");
		event.preventDefault();
	}); */
	
	
		
	
	function Accept_Reject_linkup_request(linkup_id,status){
		var headerform = document.getElementById('headerform');
		var user_id =headerform.user_id.value;
		$.ajax({
			url: '/linkup_new/linkup_accept_delete',
			type: 'POST',
			data: {
				user_id : user_id,
				linkup_id : linkup_id,
				status : status,
			},
			beforeSend:function(){
				$("#poststatushtml-"+linkup_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
				   var success=this.success;
				   if(success==1){
					   alert(this.msg);
					   location.reload();
				   }
				});
			}
		});
	}
	function linkup_new_edit(linkup_id){
		var  linkup_name= $("#linkupnote").text();
		var  activity_id= $("#activity_id").val();
		var  start_time1= $("#linkup_start_time").val();
		var  end_time1= $("#linkup_end_time").val();
		
		var all_day = $("#all_day").val();;
		var partstartdate = start_time1.split(" ");
		var partenddate = end_time1.split(" ");
		
		var start_timenew = new Date(start_time1);
		var newstarttime = start_timenew.toString('dd-MM-y');
		var partstarttime = newstarttime.split(" ");
		var time24_start = partstarttime[4]; 
		
		var end_timenew = new Date(end_time1);
		var newendtime = end_timenew.toString('dd-MM-y');
		var partendtime = newendtime.split(" ");
		var time24_end = partendtime[4];
	    if(all_day==1){
			var start_time = partstartdate[0]+'T00:00:00';
			var end_time = partenddate[0]+'T23:59:00';
		}else{
			var start_time = partstartdate[0]+'T'+time24_start;
			var end_time = partenddate[0]+'T'+time24_end;
		}
		
		$.ajax({
			//url: '/linkup_new/linkup_new_edit',
			url: '/linkup_new/linkup_new_edit_custom',
			type: 'POST',
			data: {
				linkup_id : linkup_id,
				start_time : start_time,
				end_time : end_time,
			},
			success:function(data) {
				//alert(JSON.stringify(data));
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					 var msg =this.msg;
					 var success =this.success;
					 if(success==1){
						alert(msg);
						window.location.replace("/linkup_new/view_activity/"+linkup_id);
					 }else{
						  alert(msg);
					 }
				}); 
			}
		});
	}
	function deletelinkup(linkup_id){
		var linkup_new_single_activityform = document.getElementById('linkup_new_single_activityform');
		var headerform = document.getElementById('headerform');
		var logged_in =headerform.user_id.value;
        //confirm("Press a button!");	
		if (!confirm('Are you sure ?')) return false;		
		$.ajax({
			url: '/linkup_new/delete_linkUp',
			type: 'POST',
			data: {
				linkup_id:linkup_id
			},
			success:function(data) {
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					 var msg=this.msg;
					 var success=this.success;
					 if(success==1){
						 alert(msg);
						window.location.replace("/linkup_new/my_activity");
					 }else{
						  alert(msg);
					 }
				});
			}
		});
	}
	function getActivityLocation(activity_id){
		var linkupform = document.getElementById('create_linkupactivityForm');
		var state = linkupform.state.value;
		var country = linkupform.country.value;
		console.log(activity_id);
		console.log(state);
		console.log(country);
		$.ajax({
			url: '/linkup/get_activity_locations',
			type: 'GET',
			data: {
				activity_id:activity_id,
				state:state,
				country:country,
			},
			beforeSend:function(){
				//$("#postsubmit").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				$activity_locationselectbox_html=$("#activity_locationselectbox");
				$activity_locationselectbox_html.html('');
				$.each(data, function (key, val) {
					//alert(key)
					//alert(JSON.stringify(val));
					if((key=='data') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var City = this.City;
							var State = this.State;
							var Address = this.Address;
							var Country = this.Country;
							var Latitude = this.Latitude;
							var Longitude = this.Longitude;
							$activity_locationselectbox_html.append('<option value="'+Address+'"> '+Address+'</option>');
						});
						//alert(JSON.stringify(val));
						//check it again   when  all things done!
					}else if((key=='data') && (val=='')){
						$activity_locationselectbox_html.html('<option value="">No Known Location Found ...</option>');
					}
				});
			}
		});
	}
	/*Link group for join request*/
	function get_link_group_total_pending(profilepage,imagepath){
		var linkup_pending_form = document.getElementById('linkup_new_pending_activityform');
		var user_id =linkup_pending_form.user_id.value;
		var purl = "http://35.163.199.28:3000/swiftSpar/linkup_new/get_my_active_linkups?user_id="+user_id;
		var get_token = Cookies2.get('token_name');	
		console.log(get_token);		
		$.ajax({
			url: 'https://swiftspar.com/curl_all.php',
			type: 'POST',
			data: { 'url': purl, 'authenticate': auther, 'ss_token': get_token, 'utype': 'GET' },
			beforeSend:function(){
				$("#linkup_pending_request").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				/*response data from api*/
				//alert(data);	
				var $linkup_pending_request = $('#linkup_pending_request');
				$linkup_pending_request.html('');				
				$.each(JSON.parse(data), function (key, val) {
					if((key=='data') && (val!='')){						
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;							
							var private_public = this.private_public; 
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 
							
							//date
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//SPLIT DATE AND TIME 
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							
							if(place_name!=''){
								var placename ='@ '+place_name;
							}else{
								var placename ='';
							}
							
							 var linkupactionhtm ='<a href="/linkup_new/view_activity/'+linkup_id+'"><button class="btn btn-grey btn-rounded effect text-uppercase mt-20 pl-40 pr-40 " id="tt'+linkup_id+'">View</button></a>' 
							
							/*append response content to div*/
							$linkup_pending_request.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading bold">'+activity_name+'</span> With  <span class="red" id="teamnum-'+linkup_id+'"></span></a> <p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action">'+linkupactionhtm+'</div></div>');
							
								$("#teamnum-"+linkup_id).html('');
								$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name;  
									var link_group_id = this.link_group_id; 
									if(link_group_name==''){
										link_group_name='team name';
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length;
									  
                                    if(user_count<=1){
										$("#teamnum-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											$("#teamnum-"+linkup_id).append(first_name+' '+last_name);
										});
									}else{
										$("#teamnum-"+linkup_id).append(' Team '+link_group_name);
									}		
								});	
						
						});  
					}else if((key=='data') && (val=='')){
						//alert("zxcvzxcv");
						/*if no record present*/
						$linkup_pending_request.append('<div class="message"> No Join Request !</div>');
					}
				}); 
			}
		});
		
	}
	/*Get Activity Pending Requests */
	function get_user_pending_req(profilepage,imagepath){
		var linkup_pending_form = document.getElementById('linkup_new_pending_activityform');
		var user_id =linkup_pending_form.user_id.value;
		//var user_id =44;
		$.ajax({
			url: '/linkup_new/user_pending_req',
			type: 'GET',
			data: {
				user_id:user_id,
			},
			beforeSend:function(){
				$("#linkup_pending_activity_div").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				//alert("success");
				var $linkup_pending_activity_div = $('#linkup_pending_activity_div');
				$linkup_pending_activity_div.html('');
				
				//alert(JSON.stringify(val));
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert(JSON.stringify(val))
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							
							var private_public = this.private_public; 
							

							
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 
							
							//
							//var link_group_total_friend = this.link_group_total_friend; 
							//var user_count = link_group_total_friend.length;
							//alert(user_count);
							
							//date
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//SPLIT DATE AND TIME 
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							
							//var time24 = parts[4];
							//var time12 = tConvert (time24);
							
							
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							if(place_name!=''){
								var placename ='@ '+place_name;
							}else{
								var placename ='';
							}

							/* var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name;
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							var posthtml = '<div class="message"><img src="/images/ajax-loader.gif"></div>'; */
							
							 var linkupactionhtm ='<button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 linkupaccept" id="linkupaccept-'+linkup_id+'">Accept</button><button class="btn btn-red btn-rounded effect text-uppercase mt-20 pl-40 pr-40 linkupreject" id="linkupreject-'+linkup_id+'">Reject</button>' 
							
							/* $linkup_pending_activity_div.append('<div class="media activity" activereq-'+linkup_id+'><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body media-middle"><h3 class="media-heading">'+activity_name+'</h3></div><div class="action">'+linkupactionhtm+'</div><div class="poststatushtml-'+linkup_id+'"></div></div>');  */
							
							/*added  new design */
							
							$linkup_pending_activity_div.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading bold">'+activity_name+'</span> With  <span class="red" id="teamnum-'+linkup_id+'"></span></a> <p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action">'+linkupactionhtm+'</div></div>');
							
								$("#teamnum-"+linkup_id).html('');
								$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name;  
									var link_group_id = this.link_group_id; 
									if(link_group_name==''){
										link_group_name='team name';
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length;
									//var link_group_friend_pending = this.link_group_friend_pending; 
									//var user_pending = link_group_friend_pending.length;
									//alert(user_count);    
                                    if(user_count<=1){
										$("#teamnum-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											$("#teamnum-"+linkup_id).append(first_name+' '+last_name);
										});
									}else{
										$("#teamnum-"+linkup_id).append(' Team '+link_group_name);
									}		
								});	
							/*added new design  end */
							
							
						});  
					}else if((key=='data') && (val=='')){
						$linkup_pending_activity_div.append('<div class="message"> No Pending Request !</div>');
					}
				}); 
			}
		});
	}
	/*Get current location + coordinates */
	/* var x = document.getElementById("demo");
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	function showPosition(position) {
		x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
	} */
	/*function  SEARCH */
	function searchbox(){
		var profilepage ='/linkup_new/my_activity';
		var imagepath = $("#uploadspath").val();
		get_my_activities(profilepage,imagepath);
	}
	/*fdfdfdsf*/
	function Addlinkup(){
		var linkupform = document.getElementById('create_linkupactivityForm');
		var user_id = linkupform.user_id.value;
		var linkup_name = linkupform.linkup_name.value;
		var start_time1 = linkupform.start_time.value;
		var end_time1 = linkupform.end_time.value;
		var timezone = linkupform.timezone.value;
		//var linkup_group_name = $("#linkup_group_name-1").val();
		var location = linkupform.location.value;
		var linkup_lat = linkupform.linkup_lat.value;
		var linkup_long = linkupform.linkup_long.value;
		var activity_id = linkupform.activity_id.value;
		var private_public = linkupform.private_public.value;
		// for places 
		var city = linkupform.city.value;
		var place_name = linkupform.place_name.value;
		var state = linkupform.state.value;
		var zip_code = linkupform.zip_code.value;
		var country = linkupform.country.value;
		var linkup_single_activity = linkupform.linkup_single_activity.value;
		
		//alert(linkup_single_activity);
		var all_day = linkupform.all_day.value;
		var partstartdate = start_time1.split(" ");
		var partenddate = end_time1.split(" ");
		
		var start_timenew = new Date(start_time1);
		var newstarttime = start_timenew.toString('dd-MM-y');
		var partstarttime = newstarttime.split(" ");
		var time24_start = partstarttime[4]; 
		
		var end_timenew = new Date(end_time1);
		var newendtime = end_timenew.toString('dd-MM-y');
		var partendtime = newendtime.split(" ");
		var time24_end = partendtime[4];
	    if(all_day==1){
			var start_time = partstartdate[0]+'T00:00:00';
			var end_time = partenddate[0]+'T23:59:00';
		}else{
			var start_time = partstartdate[0]+'T'+time24_start;
			var end_time = partenddate[0]+'T'+time24_end;
		}
		//alert(start_time1);
		//alert(start_time);
		var city = linkupform.city.value;
		
		if((user_id=='') || (start_time1='') || (end_time1=='') ||(location=='') ||(city=='')){
			$(".postsubmit").html('<div class="error"> Mandatory parameter missing ! </div>');
			$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
			return false;
		}
		var submit=1;
		/* else{
			var submit=1;
			var groupmust = $("#groupmust").val();
			if(groupmust==1){
				$("input[name='linkup_group_name[]']").each(function() {
					var linkup_group_name = $(this).val();
					//var groupmust = $("#groupmust").val();
					if(groupmust==1){
						if(linkup_group_name==''){
							$(".postsubmit").html('<div class="error"> Please Enter Team Name! </div>');
							$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
							return false;
							submit=0;
						}
					}
				});
			}
		} */
		//alert("submit11 "+submit);
		var i=1;
		var ik=0;
		var leng = 0;
		var datanewarr=[];
		var datanewarr2=[];
		$("input[name='linkup_group_name[]']").each(function() {
			var linkup_group_name = $(this).val();
			var groupmust = $("#groupmust").val();
			/* if(groupmust==1){
				if(linkup_group_name==''){
					$(".postsubmit").html('<div class="error"> Please Enter Team Name ! </div>');
					$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
					submit=0;
					return false;
				}
			} */ 
			
			var inputfld = $("#friend_pending-"+i).val();
			var words = inputfld.split(",");
			
			if(words.length >=2){			
				var inputc = $("#linkup_group_name-"+i).val();				
				if(inputc==""){
					$(".postsubmit").html('<div class="error"> Please Enter Team Name ! </div>');
					$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
					submit=0;
					return false;
				}
			}
			
			var friend_accept = $("#friend_accept-"+i).val();
			var friend_pending = $("#friend_pending-"+i).val();
			
			datanewarr = {linkup_group_name:linkup_group_name,friend_accept: friend_accept,friend_pending: friend_pending};
			datanewarr2.push(datanewarr);
			i++;		
		});
		//alert(leng);
		//alert(ik);
		//return false;
		//alert("submit22 "+submit);
		var values1 =[];
		var valuesnx2 = {data:datanewarr2};
		var values = [JSON.stringify(valuesnx2)];
		if($("#friend_pending-1").val()==''){
			$(".postsubmit").html('<div class="error"> Minimum One player is Required ! </div>');
			$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
			return false;
		}
		//return false;
		if(submit==1){
			$.ajax({
				url: '/linkup_new/send_new_linkup_request',
				//url: '/linkup_new/send_new_linkup_request_ccc',
				type: 'POST',
				data: {
					user_id : user_id,
					linkup_name : linkup_name,
					start_time : start_time,
					end_time : end_time,
					timezone : timezone,
					city:city,
					location : location,
					linkup_lat : linkup_lat,
					linkup_long : linkup_long,
					activity_id : activity_id,
					private_public :private_public,
					all_day :all_day,
					linkup_image : '1212',
					city: city,
					place_name: place_name,
					state: state,
					country: country,
					linkup_single_activity: linkup_single_activity,
					values
				},
				beforeSend:function(){
					$("#message").html('<div class="message"><img src="/images/ajax-loader.gif"> </div>');
				},
				success:function(data) {
					//alert(JSON.stringify(data));
					 $(jQuery.parseJSON(JSON.stringify(data))).each(function() {
						 var msg =this.msg;
						 var success =this.success;
						 if(success==1){
							 //alert(msg);
							  $(".postsubmit").html('<div class="message">'+msg+'</div>');
							 window.location.href="/linkup_new/my_activity";
						 }else{
							 $(".postsubmit").html('<div class="message">'+msg+'</div>');
						 }
					}); 
				}
			}); 
		}
		  
	}
	/*Add New Team */
	function AddTeam(){
		var imagepath = $("#uploadspath").val();
		var profilepage='/linkup_new/add_new_request';
		var no_of_teams =0;
		$('#allteams > div').each(function () { 
		  no_of_teams++;
		});
		var nextteamid = ++no_of_teams;
        $("#allteams").append('<div class="team" id="team-'+nextteamid+'"><input type="hidden" class="frind_req" id="friend_pending-'+nextteamid+'" name="friend_pending-'+nextteamid+'"><input type="hidden" class="frind_acpt"  id="friend_accept-'+nextteamid+'" name="friend_accept-'+nextteamid+'"><div class="col-xs-12"><div class="form-group mb-20"><input type="text" name="linkup_group_name[]" id="linkup_group_name-'+nextteamid+'" class="form-control" placeholder="TEAM NAME"></div></div><div class="form-group col-xs-12"><div id="accordion"><a  data-toggle="collapse" data-parent="#addTeam-'+nextteamid+'" href="#addTeam-'+nextteamid+'" class="btn btn-default btn-md btn-block text-left" role="button"> Add Team Member</a><div class="collapse" id="addTeam-'+nextteamid+'"><div class="panel-list" id="addTeampanel-'+nextteamid+'"></div></div></div></div></div>');
		
		getfriendforlinkup(profilepage,imagepath,nextteamid);
	}
	/*when on team player*/
	function teamplayer(team_id,player_id){
		var friend_pending_arr=[];
		var friend_pendingvalue = $("#friend_pending-"+team_id).val();
		if(friend_pendingvalue!=''){
			var friend_pending_val = friend_pendingvalue.split(',');
			$.each(friend_pending_val, function (index, value) {
				friend_pending_arr.push(value);
				$("#teamplayer-"+team_id+'-'+value).html('');
				$("#teamplayer-"+team_id+'-'+value).append('<i class="fa fa-minus-circle red"></i>');
			});
			var player = $.inArray(player_id, friend_pending_arr );
			if(player >-1){
				//alert("Cannot Add same player  for twice");
				//remove the element from  array and assign back to input type  
				friend_pending_arr.splice(player, 1);
				$("#friend_pending-"+team_id).val(friend_pending_arr);
				$("#teamplayer-"+team_id+'-'+player_id).html('');
				$("#teamplayer-"+team_id+'-'+player_id).append('<i class="fa fa-plus-circle green"></i>');
			}else {
				friend_pending_arr.push(player_id);
				$("#teamplayer-"+team_id+'-'+player_id).html('');
				$("#teamplayer-"+team_id+'-'+player_id).append('<i class="fa fa-minus-circle red"></i>');
				$("#friend_pending-"+team_id).val(friend_pending_arr);
			}
		}else{
			$("#friend_pending-"+team_id).val(player_id);
			$("#teamplayer-"+team_id+'-'+player_id).html('');
			$("#teamplayer-"+team_id+'-'+player_id).append('<i class="fa fa-minus-circle red"></i>');
		}
	}
	/*when  on single player */
	function singleplayer(player_id){
		var friend_pendingvalue = $("#friend_pending-1").val();
		var friend_pending_arr=[];
		var friend_pending_val = friend_pendingvalue.split(',');
		
		if(friend_pending_val==''){
			
			$("#linkup_group_name-1").val('');
			$("#friend_pending-1").val(player_id);
			$("#singleplayer-"+player_id).html('');
			$("#singleplayer-"+player_id).append('<i class="fa fa-minus-circle red"></i>');
			$("#teamplayer-1-"+player_id).html('');
			$("#teamplayer-1-"+player_id).append('<i class="fa fa-minus-circle red"></i>');
		}else{
            // update_linkup single_activity  to 0 ie team 	
			
		    $("#linkup_single_activity").val(0);
			$("#donewithplayer").removeClass("removerow");
			//var friend_pending_val = friend_pendingvalue.split(',');
			$.each(friend_pending_val, function (index, value) {
				friend_pending_arr.push(value);
				$("#singleplayer-"+value).html('');
			    $("#singleplayer-"+value).append('<i class="fa fa-minus-circle red"></i>');
				$("#teamplayer-1-"+value).html('');
				$("#teamplayer-1-"+value).append('<i class="fa fa-minus-circle red"></i>');
			});
			
			var player = $.inArray(player_id, friend_pending_arr );
			
			if(player >-1){
				//alert("Cannot Add same player  for twice");
				//remove the element from  array and assign back to input type  
				friend_pending_arr.splice(player, 1);
				if(friend_pending_arr.length > 1){
					
				}else{
					$("#donewithplayer").addClass("removerow");
					$("#linkup_single_activity").val(1);
					
				}
				$("#friend_pending-1").val(friend_pending_arr);
				$("#singleplayer-"+player_id).html('');
			    $("#singleplayer-"+player_id).append('<i class="fa fa-plus-circle green"></i>');
				$("#teamplayer-1-"+player_id).html('');
				$("#teamplayer-1-"+player_id).append('<i class="fa fa-plus-circle green"></i>');
			}else {
				friend_pending_arr.push(player_id);
				$("#singleplayer-"+player_id).html('');
			    $("#singleplayer-"+player_id).append('<i class="fa fa-minus-circle red"></i>');
				$("#teamplayer-1-"+player_id).html('');
				$("#teamplayer-1-"+player_id).append('<i class="fa fa-minus-circle red"></i>');
				$("#friend_pending-1").val(friend_pending_arr);
			}
			
			/* $("#linkup_group_name-1").val('');
			$("#friend_pending-1").val(player_id);
			$("#singleplayer-"+player_id).html('');
			$("#singleplayer-"+player_id).append('<i class="fa fa-minus-circle red"></i>');
			$("#teamplayer-1-"+player_id).html('');
			$("#teamplayer-1-"+player_id).append('<i class="fa fa-minus-circle red"></i>'); */
			
			
			
			//$("#playertab").toggleClass("removerow");
			//$("#allteams").toggleClass("removerow");
			//$("#addanotherteam").toggleClass("removerow");
		}
	}
	/*Create New Linkup Activity */
	function getfriendforlinkup(profilepage,imagepath,teamid){
		
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/get_friends',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				friend_id: headerform.friend_id.value
			},
			success:function(data) {
				var $addPlayerpanel = $('#addPlayerpanel');
				var $addTeampanel = $('#addTeampanel-'+teamid);
				$addPlayerpanel.html('');
				$addTeampanel.html('');
				$.each(data, function (key, val) {
					//alert(key);
					//alert(JSON.stringify(val));
					if(key=='friend'){
						if(val==''){
							//alert("Val is empty ");
							//$friendlist_html.append(' No Friend  Found ! ');
						}else{
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
								var user_id = this.user_id;
								var first_name = this.first_name;
								var last_name = this.last_name;
								var email = this.email;
								var user_pic = this.user_pic;
								if(user_pic==''){
									var picsrc = '/images/user.png';
								}else{
									if(user_pic.indexOf('http') > -1) { 
									    var picsrc = user_pic; 
									} else {
										var picsrc = imagepath+user_pic;
									} 
								}
								$addPlayerpanel.append('<div class="media player"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+last_name+'</h3></div><div class="action singleplayer" id="singleplayer-'+user_id+'"> <i class="fa fa-plus-circle green"></i></div></div>');
								
								$addTeampanel.append('<div class="media player"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+last_name+'</h3></div><div class="action teamplayer" id="teamplayer-'+teamid+'-'+user_id+'"><i class="fa fa-plus-circle green"></i> </div></div>');
							});
						}
					}
				});	  				
			}
		});
	}
	
	/*request for user status update*/
	
	$(document).on("click", ".linkg" , function() {		
		var id =$(this).attr('id');
		var linkup_ids = id.split('-');
		var user_id = linkup_ids[1];
		var access_status = linkup_ids[2];
		var linked_id = $("#hidenlink-"+user_id).val();  
		var tokn = $(".token_hid").val();			
		var send_linksup = 'http://35.163.199.28:3000/swiftSpar/linkup_new/linkup_accept_delete';
		//alert(user_id);
			$.ajax({
				url:"https://swiftspar.com/curl_all.php", 
				type: "POST",			
				data:{ 'url': send_linksup, 'authenticate': auther, 'ss_token': tokn, 'utype': 'POST', 'linkup_id': linked_id, user_id: user_id, 'status': access_status },
				dataType:'text',
				success:function(datanew) {
					//alert(datanew);
					console.log(datanew.length);
					//alert(user_id);
					if(access_status==3){					
						$("#linkjoin-"+user_id).removeClass("dropdown");
						$("#linkjoin-"+user_id+" .btn-rounded").removeClass("btn-info");
						$("#linkjoin-"+user_id+" .btn-rounded").addClass("btn-green");
						$("#linkjoin-"+user_id+" .btn-rounded").text("Accepted");
						$("#linkjoin-"+user_id+" .btn-rounded").prop("href", "#");
					} else if(access_status==4){		
						$("#linkjoin-"+user_id).removeClass("dropdown");
						$("#linkjoin-"+user_id+" .btn-rounded").removeClass("btn-info");
						$("#linkjoin-"+user_id+" .btn-rounded").addClass("btn-red");
						$("#linkjoin-"+user_id+" .btn-rounded").text("Rejected");
						$("#linkjoin-"+user_id+" .btn-rounded").prop("href", "#");
					}
					window.location.href="/linkup_new/view_activity/"+linked_id;
				}
			});	
	});
	
	/*Create New Linkup Activity */
	/*#######-- Get Single Activity --#########*/
	function get_single_linkup(profilepage,imagepath){
		var linkup_new_single_activityform = document.getElementById('linkup_new_single_activityform');
		var headerform = document.getElementById('headerform');
		var logged_in =headerform.user_id.value;	
		var linkupuid = linkup_new_single_activityform.linkup_id.value; 		
		var get_token = Cookies2.get('token_name');	
		console.log(get_token);
		var single_linkup_url = "http://35.163.199.28:3000/swiftSpar/linkup_new/get_single_linkup?linkup_id="+linkupuid;
		
		$.ajax({		
			url: 'https://swiftspar.com/curl_all.php',
			type: 'POST',
			data: { 'url': single_linkup_url, 'authenticate': auther, 'ss_token': get_token, 'utype': 'GET' },
			success:function(data) {
			console.log(JSON.stringify(data));
				var $linkuplocation = $('#linkuplocation');
				var $allteamsandplayer = $('#allteamsandplayer');
				var $linkupactivity = $('#linkupactivity');
				$linkuplocation.html('');
				$allteamsandplayer.html('');
				$linkupactivity.html('');
				$.each(JSON.parse(data), function (key, val) {
					if((key=='data') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							console.log(JSON.stringify(val));
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							var place_name = this.place_name; 
							
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							
							//public private and all day
							var private_public = this.private_public;					
							var all_day=this.all_day;

							//date
							var linkup_start_time =this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//start time
							var startsplit =linkup_start_time.split('T');
							var timatartspl =startsplit[1].split('.');
							var starttime12 = tConvert(timatartspl[0]);
							var linkup_start_time_new =startsplit[0]+' '+starttime12;
							
							//end time
							var endsplit =linkup_end_time.split('T');
							var timendspl =endsplit[1].split('.');
							var endtime12 = tConvert(timendspl[0]);
							var linkup_end_time_new =endsplit[0]+' '+endtime12;
							
							var gp_name = this.link_group_name
							var teamcount = gp_name.length
							
							//delete link if user
							 if(logged_in==linkup_user_id){
								  var deletelink ='<div class="pull-right green" id="deletehtm"></div>';
								  $("#activity_id").val(activity_id);
								  
								  $("#deletehtm").html('<a href="javascript:void(0);" class="btn btn-rounded btn-red btn-block deletelinkupbutton" id="deletelinkup-'+linkup_id+'" > DELETE </a> ');
								  
								  $("#linkupdatehtml").html('<a href="javascript:void(0);" class="btn btn-rounded btn-green btn-block linkupeditbutton" id="linkupeditbutton-'+linkup_id+'" > UPDATE </a> ');
								  $("#linkup_start_time_readonly").addClass('removerow');
								  $("#linkup_end_time_readonly").addClass('removerow');
								  $("#linkup_start_time").val(linkup_start_time_new);
								  $("#linkup_end_time").val(linkup_end_time_new);
							 }else{
								  $("#linkup_start_time").addClass('removerow');
								  $("#linkup_end_time").addClass('removerow');
								  
								  $("#linkup_start_time_readonly").val(linkup_start_time_new);
								  $("#linkup_end_time_readonly").val(linkup_end_time_new);
							 }
							//teams and members
							$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
								var link_group_name = $.trim(this.link_group_name);  
								var link_group_id = this.link_group_id; 
								//var link_id = this.link_id; 
								var link_group_total_friend = this.link_group_total_friend; 
								
								var user_count = link_group_total_friend.length;
								
								if(link_group_name==''){
									link_group_name='team name ';
								}
								
								var splitname = link_group_name.split(' ');
								var linkupgroupname =splitname[0]+'-'+splitname[1];
								if(user_count <=1){
									$allteamsandplayer.append('<div class="form-group"><input type="hidden" class="token_hid" value="'+get_token+'"><div id="accordion"><div class="collapse in" id="'+linkupgroupname+'-'+link_group_id+'" aria-expanded="true"><div class="panel-list" id="players-'+link_group_id+'"></div></div><div></div');
								}else{
									$allteamsandplayer.append('<div class="form-group"><input type="hidden" class="token_hid" value="'+get_token+'"><div id="accordion"><a data-toggle="collapse" data-parent="#'+linkupgroupname+'-'+link_group_id+'" href="#'+linkupgroupname+'-'+link_group_id+'" class="btn btn-default btn-md btn-block text-left" role="button" aria-expanded="false"> Team '+link_group_name+'</a><div class="collapse in" id="'+linkupgroupname+'-'+link_group_id+'" aria-expanded="true"><div class="panel-list" id="players-'+link_group_id+'"></div></div><div></div');
								}
								//$allteamsandplayer.append('<div class="form-group"><div id="accordion"><a data-toggle="collapse" data-parent="#'+linkupgroupname+'-'+link_group_id+'" href="#'+linkupgroupname+'-'+link_group_id+'" class="btn btn-default btn-md btn-block text-left" role="button" aria-expanded="false"> Team '+link_group_name+'</a><div class="collapse in" id="'+linkupgroupname+'-'+link_group_id+'" aria-expanded="true"><div class="panel-list" id="players-'+link_group_id+'"></div></div><div></div');
								
								$("#players-"+link_group_id).html('');
								$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
									var user_id = this.user_id;  
									var first_name = this.first_name;  
									var last_name = this.last_name;  
									var user_pic = this.user_pic;
									if(user_pic !=''){
										if(user_pic.indexOf('http') > -1) { 
											var picurl = this.user_pic;
										}else{ 
											var picurl = imagepath+user_pic;
										} 
									}else{
										var picurl = '/images/user.png';
									}
									var accept_status = this.accept_status;
									
									console.log(accept_status);
									   /*  alert(logged_in);
									alert(linkup_user_id);  */   
									if(logged_in==linkup_user_id){
										if(user_id == linkup_user_id){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Admin</a></div>';
										}
										else if(accept_status==0){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Pending</a></div>'; 
										}else if(accept_status==1){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Accepted</a></div>'; 
										}else if(accept_status==3){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Accepted</a></div>'; 
										}else if(accept_status==4){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Rejected</a></div>'; 
										}
										else {											
											var btn = '<ul class="list-unstyled p-0 m-0" style="border:none;"><li id="linkjoin-'+user_id+'" class="dlinkj dropdown"><a class="dropdown-hover btn btn-info btn-rounded text-uppercase mt-20 pl-40 pr-40">Requested</a><ul style="padding: 0px; margin-top:-13px; margin-left:23px " id="linkul-'+user_id+'" class="dropdown-menu dropdown-hover-menu"><li style="padding: 0px;"><a class="linkg" href="javascript:void(0);" id="linkoptn-'+user_id+'-3">Accept</a></li><li style="padding: 0px;"><a class="linkg" href="javascript:void(0);" id="linkoptn-'+user_id+'-4">Reject</a></li></ul><input type="hidden" id="hidenlink-'+user_id+'" name="teamids" value="'+linkup_id+'"></li></ul>'; 
										}
										
									}else{
										if(accept_status==0){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Pending</a></div>'; 
										}else if(accept_status==1){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Accepted</a></div>';
										}else if(accept_status==2){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">REQUESTED</a></div>';
										}else if(accept_status==3){
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Accepted</a></div>';
										}
										else{
											var btn ='<div class="action"><a class="btn btn-green btn-rounded text-uppercase mt-20 pl-40 pr-40">Rejected</a></div>';
										}
									}
									$("#players-"+link_group_id).append('<div class="media activity"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body media-middle"><h3 id="'+user_id+'" class="media-heading">'+first_name+' '+last_name +'</h3></div><div class="action action-1"></div><div class="groupmain action" style="" id="grp-'+linkup_id+'">'+btn+'</div></div>');
								});
							});	
							
							var arr = [];
							var arr_accept = [];
							$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
								/*THIS CODE IN ARRAY*/
									 	var pending_id = this.link_group_friend_pending;
										var result = pending_id.split(',');
										$.each(result, function( index, value ) {
											arr.push(value);
										});
										
										var accept_id = this.link_group_friend_accept;
										var accept_id_result = accept_id.split(',');
											$.each(accept_id_result, function( key, val ) {
											arr_accept.push(val);
										});
							});
							
							var pending_user_id = "["+arr+"]";
							var pending_response = pending_user_id.indexOf(logged_in);
							
							var aceept_user_id = "["+arr_accept+"]";
							var aceept_response = aceept_user_id.indexOf(logged_in);
							//alert(logged_in);
							
							//if not pending
							// not a participant
							//
							
							if(logged_in==linkup_user_id || aceept_response=="true"){
							   $linkuplocation.append(linkup_location);
							   var currentloc= $("#current_location_viewlink").val();
								$("#directionmap").attr('href', 'https://www.google.co.in/maps/dir/'+currentloc+'/'+linkup_location+'/');
							} else{
								$linkuplocation.append("Location will show when you are added in this activity");
								$("#directionmap").html('');
								
							}
							
								
							//alert(arr);							
							//append location 
							//alert(linkup_location);
							//$linkuplocation.append(linkup_location);
							
							//activity
							$linkupactivity.append(activity_name);
							
							//alert(private_public);
							//set private public
							if(private_public=='private'){
								$("#private_public").attr( 'checked', 'checked');
								$("#private_public").val('1');
							}
							//set all day
							if(all_day=='1'){
								$("#all_day").attr( 'checked', 'checked');
								$("#all_day").val('1');
							}
							
							//start and end time 
							
							/* $("#linkup_start_time").val(newstartdate);
							$("#linkup_end_time").val(newenddate); */
							
							//$("#linkup_start_time").val(linkup_start_time_new);
							//$("#linkup_end_time").val(linkup_end_time_new);
							
							
							//linkup name ad note 
							$("#linkupnote").text(linkup_name);
							//GetLocationByIp22();
							
							//alert( "linkup_location : "+ linkup_location);
							//alert( "currentloc : "+ currentloc);
							
							
							return false; 
						});
					}
				});
				
			}
		});
		
	}
	
	/****check for join request******/
	
	function createJoinRequest(){ 
						
	}
	
		$(document).on("click", ".groupbtn" , function() {	
				var grid = 'a';
				var id =$(this).attr('id');
				var datval = $(this).attr("data-val");
				
				if(datval != 1){
					var dd = $(this).closest('ul').attr('id');
				} 
				else{
					//var grid = 1;
					var dd =$(this).attr('id');
				}
			
			
			
			if(dd != 'undefined'){
				var lids = dd.split('-');
				var grid = lids[1];
			}
			//alert(dd);
			var linkup_ids = id.split('-');
			var group_id = linkup_ids[1];			
			var tokn = $(".token_hid").val();			
			var send_linksup = 'http://35.163.199.28:3000/swiftSpar/linkup_new/join_request_linkup';
			
			//alert(group_id); 
			//console.log(auther);
			 $.ajax({
				url:"https://swiftspar.com/curl_all.php",
				type: "POST",			
				data:{ 'url': send_linksup, 'authenticate': auther, 'ss_token': tokn, 'utype': 'POST', 'groupid': group_id },
				dataType:'text',
				success:function(datanew) {
					//alert(datanew);
					if(grid != 'a'){
					  $("#grp-"+grid).empty().html('<button class="join join_comn">Requested</button>');
					}
					window.location.href="/linkup_new/activity-nearby";
				}
			});						
		});
	
	//get_nearby_activities
	/* Get Nearby Activity  */
	function get_nearby_activities(profilepage,imagepath){ 
		var linkup_new_nearby_activityform = document.getElementById('linkup_new_my_activityform');
		
		var get_token = Cookies2.get('token_name');	
		console.log(get_token);
		var user_id = linkup_new_nearby_activityform.user_id.value;
		var headerform = document.getElementById('headerform');
		var logged_in =headerform.user_id.value;
		//alert(logged_in);
		var timezone = linkup_new_nearby_activityform.timezone.value;
		var linkup_lat = linkup_new_nearby_activityform.user_lat.value;
		var linkup_long = linkup_new_nearby_activityform.user_long.value;
		var get_near_by_activities = "http://35.163.199.28:3000/swiftSpar/linkup_new/get_near_by_activities?user_id="+user_id+"&linkup_lat="+linkup_lat+"&linkup_long="+linkup_long+"&timezone="+timezone;
		//console.log(get_near_by_activities);
		var auther = "Basic " + btoa(usnm + ":" + passw);
		//console.log(auther);
		$.ajax({
			url:"https://swiftspar.com/curl_all.php",
			type: "POST",  				
			data:{ 'url': get_near_by_activities, 'authenticate': auther, 'ss_token': get_token, 'utype': 'GET' },
			success:function(data) {	
				console.log(data);
				var $linkup_nearby_activity = $('#linkup_nearby_activity_div');
				$linkup_nearby_activity.html('');
				$.each(JSON.parse(data), function (key, val) {
					if((key=='data') && (val!='')){						
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							
							var activity_id = this.activity_id;
							//alert(activity_id);
							var activity_name = this.activity_name;
							
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;							
							var private_public = this.private_public; 						
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 							
							
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
					
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var groupnm = this.link_group_name;
							var group_count = groupnm.length;						
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							var token = '<input type="hidden" name="tokenvl" class="token_hid" value="'+get_token+'">';
							var btn = "";
							
							
							if(place_name!=''){
											var placename ='@ '+place_name;
										}else{
											var placename ='';
										}
						if(logged_in != linkup_user_id){
									   var mem_gr = this.link_group_name[0]['link_group_total_friend'];
									   var mem_cnt = mem_gr.length;
									   //alert(mem_cnt);
									// if(group_count == 1){
									  if(mem_cnt == 1){
										var fn_m = this.first_name;
										var fn_w = this.link_group_name[0]['link_group_total_friend'][0]['first_name'];
										
										$linkup_nearby_activity.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading gf bold">'+activity_name+'</span>  between <span class="red">'+fn_m+' and '+fn_w+'</span> </a><p id="axdrs-'+linkup_id+'">Location will show when you are added in this activity</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"></div><div class="groupmain" id="grp-'+linkup_id+'">'+btn+'</div>'+token+'<div style="display:none; text-align:right; margin-top:30px;"  id="group_main-'+linkup_id+'"></div></div>');
										
									  }
									else{
									 $linkup_nearby_activity.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading vb bold">'+activity_name+'</span>  With <span class="red" id="teamnum-'+linkup_id+'"></span> </a><p id="adr-'+linkup_id+'"><span class="red""> '+placename+'</span></p><p id="adrs-'+linkup_id+'">'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"></div><div class="groupmain" id="grp-'+linkup_id+'">'+btn+'</div>'+token+'<div style="display:none; text-align:right; margin-top:30px;"  id="group_main-'+linkup_id+'"></div></div>');
										
									}
							} 
							 else{
										/*else{
											var btn = '<button id="join-'+linkup_id+'" class="join join_comn">Join</button>';
										}*/
										
										   
										$linkup_nearby_activity.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading bv bold">'+activity_name+'</span>  With <span class="red" id="teamnum-'+linkup_id+'"></span> </a><p id="adr-'+linkup_id+'"><span class="red""> '+placename+'</span></p><p id="adrs-'+linkup_id+'">'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"></div><div class="groupmain" id="grp-'+linkup_id+'">'+btn+'</div>'+token+'<div style="display:none; text-align:right; margin-top:30px;"  id="group_main-'+linkup_id+'"></div></div>');
										
									}
									
								//$("#teamnum-"+linkup_id).html(''); 
								var inc = 1;
								
								var arr = [];
							var arr_accept = [];
							$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
								/*THIS CODE IN ARRAY*/
									 	var pending_id = this.link_group_send_pending;
										var result = pending_id.split(',');
										$.each(result, function( index, value ) {
											arr.push(value);
										});
										
									
							});
							
							var req_user_id = "["+arr+"]";
							var req_response = req_user_id.indexOf(logged_in);
							
					
								$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name; 	
									var link_group_send_pending=this.link_group_send_pending;
									var link_group_friend_pending=this.link_group_friend_pending;
									var link_group_friend_accept=this.link_group_friend_accept;
									var split_send_pending = link_group_send_pending.split(",");
									var split_friend_pending = link_group_friend_pending.split(",");
									var split_friend_accept = link_group_friend_accept.split(",");
									
									var link_group_id = this.link_group_id; 								
									if(link_group_name==''){
										link_group_name='team name';												
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length;
									//console.log(user_count);
                                    if(user_count<=1){
										$("#teamnum-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											$("#teamnum-"+linkup_id).append(first_name+' '+last_name);
											$("#adr-"+linkup_id).html('');											
											$("#adrs-"+linkup_id).hide;											
											//$("#join-"+linkup_id).hide();
										});
									}else{
										/*show join only once.*/
										
										if(inc<=1){
											
											console.log(linkup_user_id);
											/*check if loggedin user id equals to linkup user id.*/
											
											if(logged_in==linkup_user_id){	
												//show as admin
												var btn = '<button class="join join_comn">Admin</button>';
											}else if(split_send_pending.indexOf(logged_in) !== -1){
												/*check if loggedin id present in send pending****/
													var btn = '<button class="join join_comn">Requested</button>';
													$("#adr-"+linkup_id).html('');
													$("#adrs-"+linkup_id).html('');
											}else if(split_friend_pending.indexOf(logged_in) !== -1){
												/*check if loggedin id present in send pending****/
													var btn = '<button class="join join_comn">Pending</button>';
											}else if(split_friend_accept.indexOf(logged_in) !== -1){
												/*check if loggedin id present in send pending****/
													var btn = '<button class="join join_comn">Joined</button>';
											}
											else{
												//show as join
											
												if(group_count<=1){
													var btn = '<button id="groupbtn-'+link_group_id+'" data-val="1" class="join join_comn groupbtn grpbtn">Join</button>';												
												}
												else{
													//if more then one team then show in dropdown
													

										//alert(link_group_send_pending);		
												
													/* if(linkup_id==683){
														var link_group_send_pending=this.link_group_send_pending;		
														alert(link_group_send_pending);
														if(split_send_pending.indexOf(logged_in) !== -1){
															alert("yes");
														} else{
															alert("no");
														}
													} */
												
												if(req_response != -1){	
												
													var btn = '<div class="groupmain action" id="join-'+linkup_id+'"><button class="join join_comn">Requested</button></div>';
													//$("#grp-"+linkup_id).append(btn);
													
												} else{
													var btn = '<div class="groupmain action" id="join-'+linkup_id+'"><ul class="list-unstyled p-0 m-0" style="border:none;"><li  class="dlinkj dropdown"><a data-val="2" class="join join_comn groupbtn grpbtn dropdown-hover btn mt-20 pl-20 pr-20">Join</a><ul id="uljn-'+linkup_id+'" class="dropdown-menu dropdown-hover-menu" style="margin-top: -1px;"></ul></li></ul></div>'
												}
												}
												$("#adr-"+linkup_id).html('');
												$("#adrs-"+linkup_id).html('');
											}
											$("#grp-"+linkup_id).append(btn);
											
										}						
										var group_btn = '<li style="padding: 0px;"><a class="groupbtn" href="javascript:void(0);" id="groupbtn-'+link_group_id+'">'+link_group_name+'</a></li>';
										
										/* if(linkup_id==683){
													alert(req_response);
												} */
												
										
											$("#uljn-"+linkup_id).append(group_btn);
										
													
										
										
										//alert(link_group_name);	
									$(document).ready(function(){
										var pathname = window.location.pathname;
										//alert(pathname);
										//if(pathname=='/linkup_new/activity-nearby'){
											$("#teamnum-"+linkup_id).append(' Team '+link_group_name);
										//}
									});
										/* if(linkup_id==675){
											alert(link_group_name);										
										} */
									}
									inc++; 
								});	
								
						});
					}
				});
			}
		});
		
		/*$.ajax({
			url: '/linkup_new/get_near_by_activities',
			type: 'GET',
			data: { 
				user_id: linkup_new_nearby_activityform.user_id.value,
				timezone: linkup_new_nearby_activityform.timezone.value,
				limit: 100,
				linkup_lat: linkup_new_nearby_activityform.user_lat.value,
				linkup_long:linkup_new_nearby_activityform.user_long.value,
			},
			beforeSend:function(){
				$("#linkup_nearby_activity_div").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				var $linkup_nearby_activity = $('#linkup_nearby_activity_div');
				$linkup_nearby_activity.html('');
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert("fgfgfgfdg");
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							
							var private_public = this.private_public; 
							

							
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 
							
							//date
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//SPLIT DATE AND TIME 
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							//var time12 = tConvert (time24);
							
							
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							
							if(place_name!=''){
								var placename ='@ '+place_name;
							}else{
								var placename ='';
							}
							$linkup_nearby_activity.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading bold">'+activity_name+'</span> With  <span class="red" id="teamnum-'+linkup_id+'"></span></a><p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"><a href="/linkup_new/view_activity/'+linkup_id+'"> <i class="fa fa-angle-right"></i> </a></div></div>');
							
								$("#teamnum-"+linkup_id).html('');
								$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name;  
									var link_group_id = this.link_group_id; 
									if(link_group_name==''){
										link_group_name='team name';
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length;
									//var link_group_friend_pending = this.link_group_friend_pending; 
									//var user_pending = link_group_friend_pending.length;
									//alert(user_count);    
                                    if(user_count<=1){
										$("#teamnum-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											$("#teamnum-"+linkup_id).append(first_name+' '+last_name);
										});
									}else{
										$("#teamnum-"+linkup_id).append(' Team '+link_group_name);
									}		
								});	
							//}
							
                      	
						});
					}
				});
				
			}
		});*/
	}
	/*################ Get Historic activity  #############*/
	function get_historic_activities(profilepage,imagepath){
		var linkup_new_historic_activityform = document.getElementById('linkup_new_my_activityform');
		var headerform = document.getElementById('headerform');
		var currentloc= $("#current_location_viewlink").val();
		var logged_in_user = headerform.user_id.value;
		$.ajax({
			url: '/linkup_new/get_historic_activities',
			type: 'GET',
			data: {
				user_id: linkup_new_historic_activityform.user_id.value,
				timezone: linkup_new_historic_activityform.timezone.value,
				limit: 100,

			},
			beforeSend:function(){
				$("#linkup_historic_activity_div").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				var $linkup_historic_activity = $('#linkup_historic_activity_div');
				$linkup_historic_activity.html('');
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert("fgfgfgfdg");
						//alert(JSON.stringify(val));
					
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							
							
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							
							var private_public = this.private_public; 
							

							
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 
							var linkup_user_id = this.linkup_user_id; 
							
							//date
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//SPLIT DATE AND TIME 
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24);
							
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							
							if(place_name!=''){
								var placename ='@ '+place_name;
							}else{
								var placename ='';
							}
							
							if(logged_in_user==linkup_user_id){
								var action ='<button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown" aria-expanded="false">Action</button><ul class="dropdown-menu"><li><a href="#" id="navigateact-'+linkup_id+'" target="_blank">Navigate</a></li><li><a href="/linkup_new/view_activity/'+linkup_id+'-h">Reuse</a></li></ul>';
							}else{
								var action ='<button class="btn btn-white btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown" aria-expanded="false" disabled>Action</button><ul class="dropdown-menu"><li><a href="#" target="_blank" id="navigateact-'+linkup_id+'">Navigate</a></li><li><a href="/linkup_new/view_activity/'+linkup_id+'-h">Reuse</a></li></ul>';
							}
							
						//	var action ='<button class="btn btn-white btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown" aria-expanded="false">Action</button><ul class="dropdown-menu"><li><a href="#" id="navigateact-'+linkup_id+'">Navigate</a></li><li><a href="/linkup_new/view_activity/'+linkup_id+'">Reuse</a></li></ul>';
							
							$linkup_historic_activity.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'-h"><span class="media-heading bb bold">'+activity_name+'</span> With  <span class="red" id="teamnum-'+linkup_id+'"></span></a><p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1" id="actionid">'+action+'</div></div>');
							
							
							$("#navigateact-"+linkup_id).attr('href', 'https://www.google.co.in/maps/dir/'+currentloc+'/'+linkup_location+'/');
							
							$("#teamnum-"+linkup_id).html('');
							$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name;  
									var link_group_id = this.link_group_id; 
									if(link_group_name==''){
										link_group_name='team name';
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length; 
                                    if(user_count<=1){
										$("#teamnum-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											$("#teamnum-"+linkup_id).append(first_name+' '+last_name);
										});
									}else{
										$("#teamnum-"+linkup_id).append(' Team '+link_group_name);
									}		
								});
						});
					} else if((key=='data') && (val=='')){
						$linkup_historic_activity.html('<div class="message"> No Activity Found! </div>');
					}
				});
			}
		});
	}
	/*################ Get Link Up New Activities  #############*/
	function get_my_activities(profilepage,imagepath){
		var linkup_new_my_activityform = document.getElementById('linkup_new_my_activityform');
		var  searchstring = $("#searchbox_myactivity").val();
		if(searchstring!=''){
			searchstring = searchstring.toLowerCase();
			searchstring = $.trim(searchstring);
		}
		var search_status =0;
		$.ajax({
			url: '/linkup_new/get_my_activities',
			type: 'GET',
			data: {
				user_id: linkup_new_my_activityform.user_id.value,
				timezone: linkup_new_my_activityform.timezone.value,
				limit: 200,

			},
			beforeSend:function(){
				var $linkup_my_activity_div = $('#linkup_my_activity_div');
				$("#linkup_my_activity_div").html('');
				$("#linkup_my_activity_div").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				var $linkup_my_activity_div = $('#linkup_my_activity_div');
				$linkup_my_activity_div.html('');
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert("fgfgfgfdg");
						//alert(JSON.stringify(val));
						//console.log(val);
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var linkup_id = this.linkup_id;
							var linkup_user_id = this.linkup_user_id;
							var linkup_name = this.linkup_name; 
							var linkup_location = this.linkup_location;  
							var place_name = this.place_name;  
							
							var timezone = this.timezone;  
							var linkup_image = this.linkup_image;  
							var linkup_lat = this.linkup_lat;  
							var linkup_long = this.linkup_long;  
							var linkup_status = this.linkup_status; 
							
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic;
							var activityimg_url =imagepath+activity_pic;
							
							var private_public = this.private_public; 
							

							
							var first_name = this.first_name;  
							var last_name = this.last_name;  
							var user_pic = this.user_pic; 
							
							//
							//var link_group_total_friend = this.link_group_total_friend; 
							//var user_count = link_group_total_friend.length;
							//alert(user_count);
							
							//date
							var linkup_start_time=this.linkup_start_time;
							var linkup_end_time=this.linkup_end_time;
							var linkup_created_on=this.linkup_created_on;
							
							//SPLIT DATE AND TIME 
							var date = new Date(linkup_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							
							//var time24 = parts[4];
							//var time12 = tConvert (time24);
							
							
							var timesplit = linkup_start_time.split("T");
							var timesp =timesplit[1].split('.');
							var time12 = tConvert (timesp[0]);
							if(place_name!=''){
								var placename ='@ '+place_name;
							}else{
								var placename ='';
							}
							if(searchstring!=''){
								var activity_name_str =activity_name.toLowerCase();
								var linkup_location_str =linkup_location.toLowerCase();
								//var team_name2 = JSON.stringify(this.link_group_name[1].link_group_name);
								var namesearch = activity_name_str.indexOf(searchstring);
								var locationsearch = linkup_location_str.indexOf(searchstring);
								if ((namesearch >= 0) || (locationsearch >0 )){
									search_status=1;
									$linkup_my_activity_div.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading nn bold">'+activity_name+'</span> With  <span class="red" id="teamnumx-'+linkup_id+'"></span></a><p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p>'+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"><a href="/linkup_new/view_activity/'+linkup_id+'"> <i class="fa fa-angle-right"></i> </a></div></div>');
									
									$("#teamnumx-"+linkup_id).html('');
									$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
										var link_group_name = this.link_group_name;  
										var link_group_id = this.link_group_id; 
										if(link_group_name==''){
											link_group_name='team name';
										}
										
										var link_group_total_friend = this.link_group_total_friend; 
										var user_count = link_group_total_friend.length;
                                        if(user_count <=1){
											$("#teamnumx-"+linkup_id).html('');
											$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
												var user_id = this.user_id;  
												var first_name = this.first_name;  
												var last_name = this.last_name;
												$("#teamnumx-"+linkup_id).append(first_name+' '+last_name);
											});
										}else{
											$("#teamnumx-"+linkup_id).append(' Team '+link_group_name);
										}										
										
									});	
								}
								
							}else{
								$linkup_my_activity_div.append('<div class="media activity"><div class="media-left media-middle"><img src="'+activityimg_url+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="/linkup_new/view_activity/'+linkup_id+'"><span class="media-heading mm bold">'+activity_name+'</span> With  <span class="red" id="teamnumx-'+linkup_id+'"></span></a> <p><span class="red""> '+placename+'</span></p><p>'+linkup_location+'</p><p> '+Day+' '+ Month+' '+Year+' '+time12+' </p></div><div class="action action-1"><a href="/linkup_new/view_activity/'+linkup_id+'"> <i class="fa fa-angle-right"></i> </a></div></div>');
							
								$("#teamnumx-"+linkup_id).html('');
								$(jQuery.parseJSON(JSON.stringify(this.link_group_name))).each(function() {
									var link_group_name = this.link_group_name;  
									var link_group_id = this.link_group_id; 
									if(link_group_name==''){
										link_group_name='team name';
									}									
									var link_group_total_friend = this.link_group_total_friend; 
									var user_count = link_group_total_friend.length;
									//var link_group_friend_pending = this.link_group_friend_pending; 
									//var user_pending = link_group_friend_pending.length;
									//alert(user_count);    
                                    if(user_count<=1){
										$("#teamnumx-"+linkup_id).html('');
										$(jQuery.parseJSON(JSON.stringify(this.link_group_total_friend))).each(function() {
											var user_id = this.user_id;  
											var first_name = this.first_name;  
											var last_name = this.last_name;
											//alert("test1");
											$("#teamnumx-"+linkup_id).append(first_name+' '+last_name);
										});
									}else{
										//alert("test");
										$("#teamnumx-"+linkup_id).append(' Team '+link_group_name);
										
									}		
								});	
							}
						});
						//if no record match 
						if((search_status==0) && (searchstring!='')){
							$linkup_my_activity_div.html('<div class="message"> No Activity Matches Your Search ! </div>');
						}
					} else if((key=='data') && (val=='')){
						$linkup_my_activity_div.html('<div class="message">No Activity Found! </div><a class="btn btn-green pull-right" href="/linkup_new/my_activity" style="margin-top:5px"> Add New</a>');
					}
				});
				
			}
		}); 
	}
	/* function GetLocationByIp22(){
		geoip2.city(function(location){
			var locString = location.city.names.en +", "+location.country.names.en;
			var state1 = location.most_specific_subdivision.names.en;
			$("#current_location_viewlink").val(locString);
		});
	} */
	function tConvert (time) {
		// Check correct time format and split into components
		time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
		if (time.length > 1) { // If time format correct
			time = time.slice (1);  // Remove full string match value
			time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
			time[0] = +time[0] % 12 || 12; // Adjust hours
		}
		return time.join (''); // return adjusted time or original string
	}
	/*#######  update user details  ########*/
	$(document).ready(init);
})();
