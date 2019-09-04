(function () { 
		var usnm = "swiftspar@emilence.com";
		var passw = "Emilence@1";
		var auther = "Basic " + btoa(usnm + ":" + passw);
	function init(){
		 
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var profilepage = location.pathname;
		
		//if(profilepage=='/user/get_user_profile'){
		if(profilepage.indexOf("/user/achievements/") != -1) {
			var profilepage ='/user/achievements';
			GetUser(profilepage);
			setTimeout(function(){ 
			   GetAchievements(imagepath);
			}, 2000);
			
		}
		if(profilepage.indexOf("/event/edit_event/") != -1) {
			var profilepage='/event/edit_event/';
			Getactivity(profilepage);
		}
		if((profilepage=='/event/create_event/') ||(profilepage=='/linkup_new/add_new_request') || (profilepage=='/user/favfans') || (profilepage=='/user/favteams')|| (profilepage=='/user/profile')){
			Getactivity(profilepage);
		}
		if((profilepage=='/feed/feeds') || (profilepage=='/user/edit_profile') ||(profilepage=='/user/edit_details')){
			Getfeed(profilepage);
		}
		//alert(profilepage);
		if(profilepage=='/user/viewprofile'){
			getfriend();
			GetUser(profilepage);
		}
		if(profilepage=='/user/profile'){
			getfriend();
			GetUser(profilepage);
		}	
         /*commented */		
		/* if(profilepage=='/event/view-events/'){
			var headerform = document.getElementById('headerform');
			var usertype = headerform.user_type.value;
			if(usertype !='organization'){
			  GetUser(profilepage);
		    }
		}  */
		if(profilepage.indexOf("/user/days-avail/") != -1) {
			GetavailableDays();
		}
		$(document).on("click", ".availtounavail" , function() {
			var id =$(this).attr('id');
			var dayid = id.split('-');
			var day_id = dayid[1];
			var name = dayid[2];
			$("#start_time-"+day_id).val('00:00');
			$("#end_time-"+day_id).val('00:00');
			$("#notavailrowrem-"+day_id).removeClass('removerow');
			$("#buttonrow-"+day_id+"-"+name).addClass('removerow');
			$("#pannelrow-"+day_id).addClass('removerow'); 
			//Removedayavail(day_id,name);
		}); 
		 $(document).on("click", ".addunavailtoavail" , function() {
			var id =$(this).attr('id');
			var dayid = id.split('-');
			var day_id = dayid[1];
			var week = dayid[2];
			$("#notavailrowrem-"+day_id).addClass('removerow');
			$("#buttonrow-"+day_id+"-"+week).removeClass('removerow');
			$("#pannelrow-"+day_id).removeClass('removerow'); 
        }); 
		function checkundefined(val){
		   if(typeof(val)  === "undefined"){
			   val='00:00';
		   }
		   return val;
		}
		
		//  cancel available days
		$(document).on("click","#cancelavail",function() {
			if (!confirm('Are you sure ?')) return false;
		});
		// save available days 
		$(document).on("click","#save_availdays",function() { 
		   // alert("fdfdfdfd");
			var headerform = document.getElementById('headerform');
		    var user_id =headerform.user_id.value;
			//alert($("#start_time-1").val())
			var start_time1 = $("#start_time-1").val();
			//alert(start_time1);
			start_time1 = checkundefined(start_time1);
			
			var start_time2 = $("#start_time-2").val();
			start_time2 = checkundefined(start_time2);
			
			var start_time3 = $("#start_time-3").val();
			start_time3 = checkundefined(start_time3);
			
			var start_time4 = $("#start_time-4").val();
			start_time4 = checkundefined(start_time4);
			
			var start_time5 = $("#start_time-5").val();
             start_time5 = checkundefined(start_time5);
			 
			var start_time6 = $("#start_time-6").val();
            start_time6 = checkundefined(start_time6);
			
			var start_time7 = $("#start_time-7").val();
			start_time7 = checkundefined(start_time7);
			
			//endttime
			var end_time1 = $("#end_time-1").val();
			end_time1 = checkundefined(end_time1);
			
			var end_time2 = $("#end_time-2").val();
			end_time2 = checkundefined(end_time2);
			
			var end_time3 = $("#end_time-3").val();
			end_time3 = checkundefined(end_time3);
			
			var end_time4 = $("#end_time-4").val();
			end_time4 = checkundefined(end_time4);
			
			var end_time5 = $("#end_time-5").val();
			end_time5 = checkundefined(end_time5);
			
			var end_time6 = $("#end_time-6").val();
			end_time6 = checkundefined(end_time6);
			
			var end_time7 = $("#end_time-7").val();
			end_time7 = checkundefined(end_time7);
			
			
			var values =[
			  {
				"day_id" : "1",
				"start_time" : start_time1,
				"name" : "Sunday",
				"end_time" : end_time1
			  },
			  {
				"day_id" : "2",
				"start_time" : start_time2 ,
				"name" : "Monday",
				"end_time" :end_time2
			  },
			  {
				"day_id" : "3",
				"start_time" : start_time3,
				"name" : "Tuesday",
				"end_time" :end_time3
			  },
			  {
				"day_id" : "4",
				"start_time" : start_time4,
				"name" : "Wednesday",
				"end_time" : end_time4
			  },
			  {
				"day_id" : "5",
				"start_time" : start_time5,
				"name" : "Thursday",
				"end_time" : end_time5
			  },
			  {
				"day_id" : "6",
				"start_time" :start_time5 ,
				"name" : "Friday",
				"end_time" : end_time6
			  },
			  {
				"day_id" : "7",
				"start_time" :start_time7,
				"name" : "Saturday",
				"end_time" : end_time7
			  }
			  ];
			var par = JSON.stringify(values);
			$.ajax({
				
				url: '/user/update_days',
				type: 'POST',
				data: {
					user_id : user_id,
					user_available_days : par,
				},
				beforeSend:function(){
					$("#postsendavail").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			   },
				success:function(data) {
					//alert(JSON.stringify(data));
					 $(jQuery.parseJSON(JSON.stringify(data))).each(function() {
						 var msg =this.msg;
						 var success =this.success;
						 if(success==1){
							alert("Available days updated successfully !");
							//location.reload();
							location.replace("/user/profile");
						 }else{
							  alert("Error !");
						 } 
					});   
				}
			});
				/*  $.each(values, function (key, val2) {
					$(jQuery.parseJSON(JSON.stringify(val2))).each(function() {
						var start_time = this.start_time;
						var end_time = this.end_time;
						var day_id = this.day_id;
						var name = this.name;
						alert("start_time : "+ start_time +" end_time : "+end_time+ " day_id: "+day_id+ "name : "+name)
					});
				});  */
		});
		$(document).on("click", ".setactivity" , function() {
			var id =$(this).attr('id');
			var actid = id.split('-');
			var activity_id = actid[1]; 
			setactivity(activity_id);
			
		});
	    $('#frienrequesttab').click(getrequest);
		$('#friendstab').click(getfriend);
		//$('.setactivity').click(setactivity);
		//$('.updatedaysavail').click(UpdateAvailableDays);
		//$('#signupbuss').attr('disabled','disabled');
		$('#accceptcondition').click(Acceptagreement);
		$('#signupbuss').click(function(){
		
		});
		
		
		$("#searchalluser").keyup(function() {
			var searchStr = $("#searchalluser").val();
			if(searchStr!=''){
				 get_people_or_organization(imagepath,searchStr);
			}else{
				$("#searchfriendlist").html('<div class="message"> No Friend Found! </div>'); 
			}
        });
		// on change event 
		 $('input[type=radio][name=typeofsearch]').change(function() {
			// alert(this.value);
			 var searchStr = $("#searchalluser").val();
			 if(searchStr!=''){
				 get_people_or_organization(imagepath,searchStr);
			}else{
				$("#searchfriendlist").html('<div class="message"> No Friend Found! </div>'); 
			}
		});
		//on button click 
		$('#friend_searchbutton').click(function() {
			// alert(this.value);
			 var searchStr = $("#searchalluser").val();
			 if(searchStr!=''){
				 get_people_or_organization(imagepath,searchStr);
			}else{
				$("#searchfriendlist").html('<div class="message"> No Friend Found! </div>'); 
			}
		});
		// friend_searchbutton
		//$('#forgetbutton').click(forgetpassword);
		
		$(document).on("click", ".addsearchedfriend" , function() {
			var id =$(this).attr('id');
			var friendid = id.split('-');
			var friend_id = friendid[1];
			AddSearchedfriend(imagepath,friend_id);
		}); 
		/* $(document).on("click", ".addavail" , function() {
			var id =$(this).attr('id');
			var dayid = id.split('-');
			var day_id = dayid[1];
			var week = dayid[2];
			AddavailableDays(day_id,week); 
        }); */
		$(document).on("click", ".unfriendclass" , function() {
			var unfriendid =$(this).attr('id');
			var unfriendid = unfriendid.split('-');
			var friend_id = unfriendid[1];
			unfriendfun(friend_id);
        });
		$(document).on("click", ".postcomment" , function() {
			var id =$(this).attr('id');
			var feedid = id.split('-');
			var feed_id = feedid[1];
			PostComment(feed_id);
        });
		$(document).on("click", ".postlike" , function() {
			var id =$(this).attr('id');
			var feedid = id.split('-');
			var feed_id = feedid[1];
			var feed_count = feedid[2];
			PostLike(feed_id,feed_count);
        });
		
		if((profilepage=='/user/verify_account') || (profilepage=='/user/forgot_password/') || (profilepage=='/user/signup-personal') || (profilepage=='/user/signup-business')||(profilepage=='/user/login')){
			
		}else{
			GetfriendRequestsheader();
		}
		/*##########feed page  validation ##############*/
		$("#checkinform" ).submit(function( event ) {
			if($("#feed_title").val()=='') {
				$("#feed_title").addClass('errorClass');
				
				$("#postsubmitfeed").html('<div class="message">Mandatory fields can not be empty !  </div>');
				$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
				event.preventDefault();
			}else{
				$("#postsubmitfeed").html('');
				$("#feed_title").removeClass('errorClass');
				
			}
		});
		$("#verifyform" ).submit(function( event ) {
			if(($("#code").val()=='') ||($("#verifyuser_id").val()=='')) {
				$("#code").addClass('errorClass');
				$("#post-results-container").html('<div class="message">Mandatory fields can not be empty !  </div>');
				$(".error").addClass('removerow');
				event.preventDefault();
			}else{
				$("#post-results-container").html('');
				$("#code").removeClass('errorClass');
				$(".error").removeClass('removerow');
			}
		});
		
		$("#editprofileform" ).submit(function( event ) {
		    var newpassword =$("#password").val();
		    var cpassword =$("#cpassword").val();
			if(newpassword==cpassword) {
				
			}else{
				alert("Password Not Match!");
				event.preventDefault();
			}
			/* if(($("#password").val()=='') ||($("#password").val()=='')) {
				
				event.preventDefault();
			}else{
				//$("#post-results-container").html('');
				//$("#code").removeClass('errorClass');
				//$(".error").removeClass('removerow');
			} */
		});
		
		// 
		//("#code").keyup()
		//search activity in fava fans and fav teams 
		$("#searchactivitybutton").click(function(){ 
			Getactivity(profilepage); 
		});
		$("#searchactivity").keyup(function(){  
			Getactivity(profilepage); 
		});
		$("#signupPersonal" ).submit(function( event ) {
			
		    //get full name , split and send as first and last name 
			var fullname = $("#fullname").val();
			var fullarr= fullname.split(' ');
			$("#first_name").val(fullarr[0]);
			$("#last_name").val(fullarr[1]);
			
			//get email and password  
			var email = $("#email").val();
			var password = $("#password").val();
			var cpassword = $("#cpassword").val();  
			var dob = $("#dob").val();
			var submit;
			
			submit=1;
			if(fullname=='')submit=0;
			if(email=='')submit=0;
			if(password=='')submit=0;
			if(dob=='')submit=0;
			
			
			
			if((submit==1) && (cpassword=='')){
				submit=2;
				$("#cpassword").focus();
			}
			if((submit==1) && (cpassword!='')){
				if(password!=cpassword) {
					submit=3;
					$("#password").focus();
					$("#cpassword").focus();
				}
			}
			var $checkb = $('input[name=accept]:checked');
			var termsacccepted =$checkb.val();
			if((submit==1) && (termsacccepted!='terms_accepted')){
				submit=4;
			}else{
				$("#postaccept").html('');
			} 
			//email validation 
			if(submit==1){
				var vemail = validateEmail(email);
				if(vemail==true){
				}else{
					submit=5;
					$(".postsubmit").html('<div class="error"> PLease Enter Valid Email ! </div>');
				}
			}
			if(submit==0){
				$(".postsignup").html('<div class="error">Mandatory Parameter Missing!</div>');
				$("#topLink" ).trigger( "click" );
				return false;
			}else if(submit==2){
				$(".postsignup").html('<div class="error">Verify Password </div>');
				$("#topLink" ).trigger( "click" );
				return false;
			}else if(submit==3){
				$(".postsignup").html('<div class="error">Password Not Match! </div>');
				$("#topLink" ).trigger( "click" );
				return false;
			}else if(submit==4){
				$(".postsignup").html('');
				$(".postaccept").html('<p class="message">Please Accept Agreement</p>');
				return false;
			}else if(submit==5){
				$(".postsignup").html('<div class="error">Please Enter Valid Email !</div>');
				$("#topLink" ).trigger( "click" );
			}
			
		});
		
		//close achievement model 
		/* $(document).on("click", "#closeachievementback" , function() {
			
		}); */
	
	}
   /*Achievements Popup*/
	
	$(document).on("click", ".achievements" , function() {
		var id =$(this).attr('id');
		var datasrc =$(this).attr('data-src');
		var datasrcarr = datasrc.split('.');
		var image2x =datasrcarr[0]+'@2x.'+datasrcarr[1];
		var idd = id.split('-');
		var idnew =idd[1];
		var statusval =idd[2];
		//alert(image2x);
		
		//get clicked  img src and  message 
		var imgsrc = $("img", this).prop("src");
		var achievementtitle = $("#achievementtitle-"+idnew).val();
		
		// additional text message
		if(statusval==1) { 
			var addtionalmsg = '<h4>CONGRATULATIONS</h4>';
		}else{
			var addtionalmsg = '<h4>ACHIEVEMENT NOT UNLOCKED YET</h4>';
		} 
		$("#addtionalmsg").html(addtionalmsg);
		 
		//set clicked  img src and  title to model
		$("#achievement_model_title").text(achievementtitle);
		//$('#achievement_model_img_src').attr('src','/images/achievements/'+image2x);
		$('#achievement_model_img_src').attr('src',imgsrc);
		
		//achievement_model_title
		//achievement_model_img_src
		//display model on click 
		var achievementmodel = document.getElementById('achievementmodel');
		achievementmodel.style.display = "block";
		
		//close button
		var closebtn = document.getElementById("closeachievementback");
		closebtn.onclick = function() {
			achievementmodel.style.display = "none";
		}
	    
	}); 
	/*#######*/
	
	 function GetAchievements(imagepath){ 
		var userachive = document.getElementById('userachive');
		$.ajax({
			url: '/user/user_achievements',
			type: 'GET',
			data: {
				user_id: userachive.user_achive_id.value,
				timezone: userachive.timezone.value
			},
			beforeSend:function(){
				$("#achievementsdiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) {
                var $achievementsdiv =$("#achievementsdiv");
				$achievementsdiv.html('');
				$(".postsubmit").html('');
			    $.each(data, function (key, val) {
					if((key=='user_achievements')&&(val!='')){
						var i =1;
						$(jQuery.parseJSON(JSON.stringify(val))).each(function(){
							var name = this.name;
							var image = this.image;
							var status = this.status;
							var message = this.message;
							if(status==1) { 
								var classoverlay = ""; 
							}else{
								var classoverlay = "overlay"; 
						    } 
							/* $achievementsdiv.append('<div class="col-xs-12 col-sm-6 col-md-3"><div class="achievements text-center clearfix mb-30" id="'+name+'" ><a href="#"><div class="'+classoverlay+'" ></div><div class="hover-content">'+name+'</div><img src="/images/achievements/'+image+'" class="center-block img-responsive"></a></div></div><input type="hidden" value="'+name+'" id="achievementtitle">'); */
							
							$achievementsdiv.append('<div class="col-xs-12 col-sm-6 col-md-3"><div class="achievements text-center clearfix mb-30" data-src="'+image+'" id="achievements-'+i+'-'+status+'" ><a href="#"><div class="'+classoverlay+'" ></div><img src="/images/achievements/'+image+'" class="center-block img-responsive"></a></div></div><input type="hidden" value="'+message+'" id="achievementtitle-'+i+'">');
							i++;
						});
					}else if((key=='user_achievements')&&(val=='')){
						
					}
				}); 
			}
		});
	 }
	/*#############Verify Account  ########*/
	function Acceptagreement(){
		var $checkb = $('input[name=accept]:checked');
		var termsacccepted =$checkb.val();
		//alert(termsacccepted);
		if(termsacccepted=='terms_accepted'){
			$('#signupbuss').removeAttr('disabled');
		}else{
			//$('#signupbuss').attr('disabled','disabled');
		}
	}
	/*add friend on  search */
	function AddSearchedfriend(imagepath,friend_id){
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/send_friend_request',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				friend_id: friend_id
			},
			beforeSend:function(){
				//$("#postsend-"+friend_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) { 
			//alert(JSON.stringify(data));
			     $.each(data, function (key, val) {
					if((key=='msg')&&(val!='')){
						$("#postsend-"+friend_id).html('<div class="message">'+val+'</div>');
					}
				}); 
			}
		}); 
	}
	/*######## Get People Or organization ########*/
	function get_people_or_organization(imagepath,searchStr){
		var radioValue = 'people';
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/event/mix_up_get_nearby_users',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				name:searchStr
			},
			beforeSend:function(){
				$("#searchfriendlist").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) { 
			    var $searchfriend_html = $("#searchfriendlist");
				$searchfriend_html.html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() { 
					var success=this.success;
					var msg=this.msg;
					var nearbyuser=this.nearbyuser;
					var org=this.data;
					if(success==1){
						if(radioValue=='people'){
							if(nearbyuser==''){
								$searchfriend_html.append('<div class="message"> No Match Found !</div>'); 
							}
							$(jQuery.parseJSON(JSON.stringify(nearbyuser))).each(function() { 
								var user_id = this.user_id;
								var first_name = this.first_name;
								var last_name = this.last_name;
								var email = this.email;
								var friend = this.friend;
								var user_pic = this.user_pic;
								if(user_pic==''){
									var picsrc = '/images/user.png';
								}else{
									if(user_pic.indexOf('http') > -1) { 
										var picsrc = this.user_pic;
									}else{ 
										var picsrc = imagepath+user_pic;
									} 
								}
								
								if(friend==1){
									var addfriendhtml ='<button class="btn btn-dark btn-rounded effect text-uppercase mt-20 pl-40 pr-40 addsearchedfriend removerow" id="addsearchedfriend-'+user_id+'">Add friend</button>';
								}else if(friend==2){
									var addfriendhtml ='<button class="btn btn-dark btn-rounded effect text-uppercase mt-20 pl-40 pr-40 addsearchedfriend disabledlink" id="addsearchedfriend-'+user_id+'">Request Send</button>';
								} else if(friend==3){
									var addfriendhtml ='<button class="btn btn-dark btn-rounded effect text-uppercase mt-20 pl-40 pr-40 addsearchedfriend" id="addsearchedfriend-'+user_id+'">Add friend</button>';
								}else{
									var addfriendhtml ='<button class="btn btn-dark btn-rounded effect text-uppercase mt-20 pl-40 pr-40 addsearchedfriend" id="addsearchedfriend-'+user_id+'">Add friend</button>';
								
								}
								
								var posthtml ='<div id="postsend-'+user_id+'"></div>';
								//if(searchStr))
								$searchfriend_html.append('<div class="friend-list relative" id="friend-'+user_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/user/viewprofile?viewid='+user_id+'"><img src="'+picsrc + '" class="media-object img-circle" style="width:100px;height:100px"></a></div><div class="media-body media-middle"><h3 class="media-heading"> <a href="/user/viewprofile?viewid='+user_id+'">'   + first_name + ' '+last_name+ '</a></h3></div>'+posthtml+'</div><div class="action">'+addfriendhtml+'</div></div>'); 
							});
						}else if(radioValue=='organization'){
							if(org==''){
								$searchfriend_html.append('<div class="message"> No Match Found !</div>'); 
							}
							$(jQuery.parseJSON(JSON.stringify(org))).each(function() { 
								var user_id = this.user_id;
								var first_name = this.first_name;
								var last_name = this.last_name;
								var email = this.email;
								var friend = this.friend;
								var user_pic = this.user_pic;
								if(user_pic==''){
									var picsrc = '/images/user.png';
								}else{
									if(user_pic.indexOf('http') > -1) { 
										var picsrc = this.user_pic;
									}else{ 
										var picsrc = imagepath+user_pic;
									} 
								}
							    var addfriendhtml ='';
								var posthtml ='<div id="postsend-'+user_id+'"></div>';
								$searchfriend_html.append('<div class="friend-list relative" id="friend-'+user_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/event/bussiness-profile/'+user_id+'"><img src="'+picsrc + '" class="media-object img-circle" style="width:100px;height:100px" ></a></div><div class="media-body media-middle"><h3 class="media-heading"> <a href="/event/bussiness-profile/'+user_id+'">'   + first_name + ' '+last_name+ '</a></h3</div>'+posthtml+'</div><div class="action">'+addfriendhtml+'</div></div>');
							});
						}
						
					}
					
				});
			}
		});
	}
	
	/*################ Get User ###################*/
	function GetUser(profilepage){
		var imagepath = $("#uploadspath").val();
		var feedform = document.getElementById('feedform');
		var headerform = document.getElementById('headerform');
		var loggedinuser =headerform.user_id.value;
		
		//added 24Apr
		var user_id = headerform.user_id.value;
		var friend_id = feedform.friend_id.value;
		var linkup_pending_form = document.getElementById('linkup_new_pending_activityform');
		//var user_id =linkup_pending_form.user_id.value;
		var purl = "http://35.163.199.28:3000/swiftSpar/user/get_user_profile?user_id="+user_id+"&friend_id="+friend_id;
		var get_token = Cookies2.get('token_name');	
		
		
		$.ajax({
			//url: '/user/get_user_profile',
			//url: '/user/get_user_profile_new',
			 //running on 24 apr 
			//url: '/user/get_user_profile',
			//type: 'GET',
			url: 'https://swiftspar.com/curl_all.php',
			type: 'POST',
			data: { 'url': purl, 'authenticate': auther, 'ss_token': get_token, 'utype': 'GET' },
			
			/* data: {
				user_id: headerform.user_id.value,
				friend_id: feedform.friend_id.value,
				page: feedform.page.value,
				limit: 100,
				
			}, */
			beforeSend:function(){
				$("#posts").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) { 
			    $("#posts").html('');
				var $profile_pic_html = $('.profile-pic');
				var $profile_stats_html = $('.profile-stats');
				var $posts_html = $('#posts');
				var $uprofileactivity_html = $('#uprofileactivity');
				
				
				//empty  the  output div 
				$profile_pic_html.html('');
				$profile_stats_html.html('');
				$posts_html.html('');
				$uprofileactivity_html.html('');
				var viewid =feedform.user_id.value;
				$.each(JSON.parse(data), function (key, val) {
			       //console.log(data);
				if((key=='user') && (val!='')){
						 $(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
							var user_id = this.user_id;
							var first_name = this.first_name;
							var last_name = this.last_name; 
							var email = this.email;  
							var gender = this.gender; 
							var user_pic = this.user_pic; 
							var dob = this.dob; 
							var age = this.age;
							var user_lat = this.user_lat; 
							var user_long = this.user_long; 
							var favourite_team = this.favourite_team; 
							var shoe_size = this.shoe_size; 
							var pant_size = this.pant_size; 
							var shirt_size = this.shirt_size; 
							var hat_size = this.hat_size; 
							var tracksuit_size = this.tracksuit_size; 
							var organization_type = this.organization_type; 
							var user_available_days = this.user_available_days; 
							var favourite_team_id = this.favourite_team_id; 
							var favourite_brand_id = this.favourite_brand_id; 
							
							/*extra */
							var badge = this.badge;
							var gamesPlayed = this.gamesPlayed;
							var netWorth = this.netWorth;
							var level = this.level;
							var points = this.points;
							var friend = this.friend;
							var event_count = this.event_count;
							var linkup_count = this.linkup_count;
							
							if(user_pic !=''){
								if(user_pic.indexOf('http') > -1) { 
									var picurl = this.user_pic;
								}else{ 
									var picurl = imagepath+user_pic;
								} 
							}else{
								var picurl = '/images/user.png';
							}
							if(friend==1){
								var addfriendhtm ='<a href="javascript:void(0);" class="btn btn-dark text-uppercase btn-rounded effect mt-10 addfriend removerow" id="addfriend-'+user_id+'">ADDFRIEND</a>';
							}else if(friend==2){
								var addfriendhtm ='<a href="javascript:void(0);" class="btn btn-dark text-uppercase btn-rounded effect mt-10 addfriend disabledlink" id="addfriend-'+user_id+'">Request Send</a>';
							} else if(friend==3){
								var addfriendhtm ='<a href="javascript:void(0);" class="btn btn-dark text-uppercase btn-rounded effect mt-10 addfriend" id="addfriend-'+user_id+'">ADDFRIEND</a>';
							}else{
								var addfriendhtm ='<a href="javascript:void(0);" class="btn btn-dark text-uppercase btn-rounded effect mt-10 addfriend" id="addfriend-'+user_id+'">ADDFRIEND</a>';
							}
							if(profilepage=='/user/profile'){
								var addfriendhtm ='';
							}
							if(profilepage=='/user/achievements'){
								var addfriendhtm ='';
							}
							$profile_pic_html.append('<div class="profile-pic"><img src="'+picurl+'" class="center-block img-circle img-responsive mb-20" style="height:100px; width:100px;" ><div class="profile-meta text-center"><p class="text-uppercase">'+first_name+' '+ last_name +'<br><span class="small">'+age+',  '+gender+'</span></p>'+addfriendhtm+'<div id="message"></div></div></div>');
								
							/*below code commented  for   hiding  revenue  And Event attented (17-feb ) Comment it out  when needed*/
							
							/*$profile_stats_html.append('<ul class="list-inline text-center"><li><i class="fa fa-trophy bronze"></i>'+badge+'</li><li><i class="fa fa-bar-chart-o blue"></i>Level '+level+' | '+points+' Points </li> <li> <i class="fa fa-dollar green"></i>'+netWorth+'</li><li><i class="fa fa-flag-checkered"></i>Activities Played '+gamesPlayed+'</li><li><a href="#"><i class="fa fa-calendar-check-o green"></i>Events Attended '+event_count+'</a></li><li><i class="fa fa-calendar"></i><a href="/user/get_days_available?user_id='+user_id+'">Days Available</a></li></ul>'); */ 
							$profile_stats_html.append('<ul class="list-inline text-center"><li><a href="/user/achievements/'+user_id+'"><img src="/images/achievements.png" style="height:35px; width="35px;">Achievements</a></li><li><i class="fa fa-bar-chart-o blue"></i>Level '+level+' | '+points+' Points </li> <li><i class="fa fa-flag-checkered"></i>Activities Played '+linkup_count+'</li><li><i class="fa fa-calendar"></i><a href="/user/days-avail/'+user_id+'">Days Available</a></li></ul>');
						});
					} 
					if(key=='feed'){
						if(val==''){
							$posts_html.html('<div class="message">No Post Found!</div>');
						}else{
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
								var feed_id = this.feed_id;
								var feed_image = this.feed_image;
								var feed_title = this.feed_title; 
								var check_in = this.check_in;  
								var feed_time = this.feed_time; 
								
								/* var today = new Date();
								var newtoday = today.toString('dd-MM-y');
								var todayparts = newtoday.split(" ");
								var TDay = todayparts[2]
								var TMonth = todayparts[1];
								var TYear = todayparts[3];
								var Ttime24 = todayparts[4];
								var Ttime12 = tConvert (Ttime24); */
									
								
								var date = new Date(feed_time);
								//var newDate = date.toString('dd-MM-y');
								var newDate = date.toUTCString();
								var parts = newDate.split(" ");
								var Day = parts[2]
								var Month = parts[1];
								var Year = parts[3];
								var time24 = parts[4];
								var time12 = tConvert (time24);
								
							    // UTC Current Time  
								 var currentdate = new Date();
								 var utcdateandtime = currentdate.toUTCString();
								 var UTCparts = utcdateandtime.split(" ");
								 var UTCDay = UTCparts[2]
								 var UTCMonth = UTCparts[1];
								 var UTCYear = UTCparts[3];
								 var UTCTtime24 = UTCparts[4];
								 
								 /* if(feed_id=='195'){
									 alert(" utcdateandtime : "+utcdateandtime);
									 alert(" UTCDay : "+UTCDay +" DAY : "+Day);
									 alert(" UTCMonth : "+UTCMonth +" Month : "+Month);
									 alert(" UTCYear : "+UTCYear+" Year : "+Year );
									 alert(" UTCTtime24 : "+UTCTtime24+" time24 : "+time24 );
								 } */
								//filter   today's post and  previous post 
/* 								if((UTCYear==Year)&&(UTCMonth==Month)&&(UTCDay==Day)){
									alert("fdfdfdsf");
									var datetime ='';
								}else{
									 //var datetime = 'Oct 27 at 3:30 pm' 
									 var datetime = Year+' '+Month+' '+Day+' '+time12;
								} */
								/*checkin  html */
								 if(check_in!=''){
									 var checkin_html = '<small> Checked in  at the <span class="green" >  '+check_in+'</span></small>';
								 }else{
									 var checkin_html = '';
								 }
								 
								/*userdetail */
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
								    //var picurl = imagepath+user_pic;
								}else{
									var picurl = '/images/user.png';
								}
								
								//alert(feed_image)
								if(feed_image!=''){
									var feed_image_url =imagepath+feed_image;
									var feedimahehtml ='<img src="'+feed_image_url+'" class="img-responsive">';
								} else{
									var feedimahehtml ='';
								}
								
							    /*comment details*/
								var commentCount =this.commentCount;
								var likeCount =this.likeCount;
								
								/*comment details*/
								var commentCount =this.commentCount;
								var likeCount =this.likeCount;
								if(viewid==user_id){
									/* $posts_html.append('<div class="post thumbnail mt-50"><div class="media mb-20"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+ last_name +'</h3><p class="text-muted">'+Month+' '+Day+' at '+time12+' <i class="fa fa-clock-o"></i> </p></div></div><div class="post-text mb-10">'+feed_title+'</div><div class="post-media mb-10 relative"> <img src="'+feed_image_url+'" class="img-responsive"> </div><div class="post-action mb-30"><span class="mr-30" id="likehtm-'+feed_id+'"><a href="javascript:void(0)" class="postlike" id="postlike-'+feed_id+'-'+likeCount+'"><i class="fa fa-heart red" id="likeicon-'+feed_id+'"></i> '+likeCount+' likes</a></span><span id="commentcounthtm-'+feed_id+'"><a href="javascript:void(0)"><i class="fa fa-comment blue"></i> '+commentCount+' comment</a></span></div><div class="comments mb-30" id="feedcommenteeeee-'+feed_id+'"> <div id="feedcomment-'+feed_id+'"> </div><form><div class="postcomment" id="postcomment-'+feed_id+'"></div><div class="input-group"><input type="text" id="comment_text-'+feed_id+'" name="comment-'+feed_id+'" class="form-control" placeholder="your comment here"><input type="hidden" value="'+commentCount+'" id="commentcountval-'+feed_id+'"> <span class="input-group-btn"><button class="btn btn-default postcomment" id="postcomment-'+feed_id+'" type="button"> <i class="fa fa-paper-plane"></i> </button></span></div></form></div></div>'); */
									
									$posts_html.append('<div class="post thumbnail mt-50"><div class="media mb-20"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+ last_name + ' '+checkin_html+'</h3><p class="text-muted" id="postdate-'+feed_id+'"> </p></div></div><div class="post-text mb-10">'+feed_title+'</div><div class="post-media mb-10 relative"> '+feedimahehtml+'</div><div class="post-action mb-30"><span class="mr-30" id="likehtm-'+feed_id+'"><a href="javascript:void(0)" class="postlike" id="postlike-'+feed_id+'-'+likeCount+'"><i class="fa fa-heart red" id="likeicon-'+feed_id+'"></i> '+likeCount+' likes</a></span><span id="commentcounthtm-'+feed_id+'"><a href="javascript:void(0)"><i class="fa fa-comment blue"></i> '+commentCount+' comment</a></span></div><div class="comments mb-30" id="feedcommenteeeee-'+feed_id+'"> <div id="feedcomment-'+feed_id+'"> </div><div class="postcomment" id="postcomment-'+feed_id+'"></div><div class="input-group"><input type="text" id="comment_text-'+feed_id+'" name="comment-'+feed_id+'" class="form-control" placeholder="your comment here"><input type="hidden" value="'+commentCount+'" id="commentcountval-'+feed_id+'"> <span class="input-group-btn"><button class="btn btn-default postcomment" id="postcomment-'+feed_id+'" type="button"> <i class="fa fa-paper-plane"></i> </button></span></div></div></div>');
									
									if((UTCYear==Year)&&(UTCMonth==Month)&&(UTCDay==Day)){
										var  hours = parseInt(UTCTtime24.split(':')[0]) - parseInt(time24.split(':')[0]);
										var  minutes = parseInt(UTCTtime24.split(':')[1]) - parseInt(time24.split(':')[1]);
										var  seconds = parseInt(UTCTtime24.split(':')[2]) - parseInt(time24.split(':')[2]);
										if((hours<=0) && (minutes<0)){
											var datehtm = ' Today at '+ seconds +' seconds ago ';
										}else if(hours <= 0){
											var datehtm = ' Today at '+ minutes +' minutes ago '; 
										}else if((hours > 0) && (minutes > 30)){
											var datehtm = ' Today at '+ hours +'.5 hours ago ';
										}else{
											var datehtm = ' Today at '+ hours +' hours ago ';
										}
										//var tym = " hours :"+hours+" minutes :"+minutes+" seconds :"+seconds;
										$("#postdate-"+feed_id).html(datehtm);
										//$("#postdate-"+feed_id).append(+'<p>'feed_time +'-------'+utcdateandtime +tym+'<p>');
									}else{
										
										 var datetime = +Month+' '+Day+' '+Year+' at '+time12;
										 var feeddate = datetime+' <i class="fa fa-clock-o"></i> ';
										 $("#postdate-"+feed_id).html(feeddate);
									}
									$.ajax({
										url: '/feed/get_comments',
										type: 'GET',
										data: {
											feed_id: feed_id,
											limit: 100,
										},
										success:function(data) {
											$.each(data, function (key, val) {
												if((key=='data') && (val!='')){
													//alert(JSON.stringify(val));
													$(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
														var comment_id = this.comment_id;
														var comment = this.comment;
														var comment_time = this.comment_time;
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
															//var picurl = imagepath+user_pic;
														}else{
															var picurl = '/images/user.png';
														}
														
														/* $("#feedcomment-"+feed_id).prepend('<div class="comments mb-30"><div class="comment media mb-20"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><p class="lead media-heading">'+comment+'</p></div></div>'); */
														
														$("#feedcomment-"+feed_id).prepend('<div class="comments mb-10"><div class="comment media mb-10 pb-10"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle"width="40" height="40"></div><div class="media-body media-middle"><p><strong>'+first_name+' '+last_name+'</strong></p><p class=" media-heading">'+comment+'</p></div></div>'); 
													 
													});
												}
											});  
										}
									});
								}
							});
						}
					} 
					if(key=='activity'){
						if(val!=''){
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
								var activity_id = this.activity_id;
								var activity_name = this.activity_name;
								var activity_pic = this.activity_pic; 
								var selected = this.selected;
								//alert(selected);
								if(activity_pic !=''){
									var picpath = imagepath+activity_pic;
								} else {
									var picpath = 'http://placehold.it/80x80';
								}
								/* if(selected==1){  
									var selectedclass ='selectedx';
									var buttontxt ='REMOVE';
								}else{
									var selectedclass ='';
									var buttontxt ='ADD';
								}  */
								if(selected==1){
									//alert(selected)
									$uprofileactivity_html.append('<li><a href="#"> <img class="img-circle center-block" width="80" height="80"src="'+picpath+'">'+activity_name+'</a></li>');
								}
								 /* if(profilepage=='/user/profile'){
									//alert("dfdfds");
									$profileActivity_html.append('<div class="media activity '+selectedclass+'"  id="activityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body "><h3 class="media-heading customhead">'+activity_name+'</h3></div><div class="action"><button class="btn btn-rounded effect text-uppercase mt-20 pl-40 pr-40 setactivity" id="setactivity-'+activity_id+'">'+buttontxt+' </button></div></div>'); 
							    } */
							});
						}else{
							$uprofileactivity_html.html('<div class="message"> No Activity Found!</div>');
						}
						 
				   }
				  //alert(data);
				});
			} 
		});
	}
	/*#############Get feeds #################*/
	function Getfeed(profilepage){
		//header  requests goes here
		var imagepath = $("#uploadspath").val();
		var feedform = document.getElementById('feedform');
		$.ajax({
			//url: '/user/get_user_profile',
			//url: '/user/get_user_profile_new',
			url: '/user/get_user_profile',
			type: 'GET',
			data: {
				user_id: feedform.user_id.value,
				friend_id: feedform.friend_id.value,
				page: feedform.page.value,
				limit: 150,
				
			},
			beforeSend:function(){
				//$("#loadinglinkup").html('');
				$("#loadinglinkup").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				$("#loadinglinkup").html('');
				if(profilepage=='/feed/feeds'){
					var $posts_html = $('#posts');
					$posts_html.html('');
					$.each(data, function (key, val) {
						if((key=='feed') && (val!='')){
							var myJSON = JSON.stringify(val);
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
								var feed_id = this.feed_id;
								var feed_image = this.feed_image;
								var feed_title = this.feed_title; 
								var check_in = this.check_in;  
								var feed_time = this.feed_time; 
								
								/* var today = new Date();
								var newtoday = today.toString('dd-MM-y');
								var todayparts = newtoday.split(" ");
								var TDay = todayparts[2]
								var TMonth = todayparts[1];
								var TYear = todayparts[3];
								var Ttime24 = todayparts[4];
								var Ttime12 = tConvert (Ttime24); */
									
								
								var date = new Date(feed_time);
								//var newDate = date.toString('dd-MM-y');
								var newDate = date.toUTCString();
								var parts = newDate.split(" ");
								var Day = parts[2]
								var Month = parts[1];
								var Year = parts[3];
								var time24 = parts[4];
								var time12 = tConvert (time24);
								
							    // UTC Current Time  
								 var currentdate = new Date();
								 var utcdateandtime = currentdate.toUTCString();
								 var UTCparts = utcdateandtime.split(" ");
								 var UTCDay = UTCparts[2]
								 var UTCMonth = UTCparts[1];
								 var UTCYear = UTCparts[3];
								 var UTCTtime24 = UTCparts[4];
								 
								 
								/*checkin  html */
								 if(check_in!=''){
									 var checkin_html = '<small> Checked in  at the <span class="green" >  '+check_in+'</span></small>';
								 }else{
									 var checkin_html = '';
								 }
								 
								/*userdetail */
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
								    //var picurl = imagepath+user_pic;
								}else{
									var picurl = '/images/user.png';
								}
								
								//alert(feed_image)
								if(feed_image!=''){
									var feed_image_url =imagepath+feed_image;
									var feedimahehtml ='<img src="'+feed_image_url+'" class="img-responsive">';
								} else{
									var feedimahehtml ='';
								}
								
							    /*comment details*/
								var commentCount =this.commentCount;
								var likeCount =this.likeCount;
								
								
								$posts_html.append('<div class="post thumbnail mt-50"><div class="media mb-20"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+ last_name + ' '+checkin_html+'</h3><p class="text-muted" id="postdate-'+feed_id+'"> </p></div></div><div class="post-text mb-10">'+feed_title+'</div><div class="post-media mb-10 relative"> '+feedimahehtml+'</div><div class="post-action mb-30"><span class="mr-30" id="likehtm-'+feed_id+'"><a href="javascript:void(0)" class="postlike" id="postlike-'+feed_id+'-'+likeCount+'"><i class="fa fa-heart red" id="likeicon-'+feed_id+'"></i> '+likeCount+' likes</a></span><span id="commentcounthtm-'+feed_id+'"><a href="javascript:void(0)"><i class="fa fa-comment blue"></i> '+commentCount+' comment</a></span></div><div class="comments mb-30" id="feedcommenteeeee-'+feed_id+'"> <div id="feedcomment-'+feed_id+'"> </div><div class="postcomment" id="postcomment-'+feed_id+'"></div><div class="input-group"><input type="text" id="comment_text-'+feed_id+'" name="comment-'+feed_id+'" class="form-control" placeholder="your comment here"><input type="hidden" value="'+commentCount+'" id="commentcountval-'+feed_id+'"> <span class="input-group-btn"><button class="btn btn-default postcomment" id="postcomment-'+feed_id+'" type="button"> <i class="fa fa-paper-plane"></i> </button></span></div></div></div>');
								
								if((UTCYear==Year)&&(UTCMonth==Month)&&(UTCDay==Day)){
									
									var  hours = parseInt(UTCTtime24.split(':')[0]) - parseInt(time24.split(':')[0]);
									var  minutes = parseInt(UTCTtime24.split(':')[1]) - parseInt(time24.split(':')[1]);
									var  seconds = parseInt(UTCTtime24.split(':')[2]) - parseInt(time24.split(':')[2]);
									if((hours<=0) && (minutes<0)){
										var datehtm = ' Today at '+ seconds +' seconds ago ';
									}else if(hours <= 0){
										var datehtm = ' Today at '+ minutes +' minutes ago '; 
									}else if((hours > 0) && (minutes > 30)){
										var datehtm = ' Today at '+ hours +'.5 hours ago ';
									}else{
										var datehtm = ' Today at '+ hours +' hours ago ';
									}
									//var tym = " hours :"+hours+" minutes :"+minutes+" seconds :"+seconds;
									$("#postdate-"+feed_id).html(datehtm);
									//$("#postdate-"+feed_id).append(+'<p>'feed_time +'-------'+utcdateandtime +tym+'<p>');
								}else{
									
									 var datetime = +Month+' '+Day+' '+Year+' at '+time12;
									 var feeddate = datetime+' <i class="fa fa-clock-o"></i> ';
									 $("#postdate-"+feed_id).html(feeddate);
								}
								$.ajax({
									url: '/feed/get_comments',
									type: 'GET',
									data: {
										feed_id: feed_id,
										limit: 100,
										
									},
									success:function(data) {
										$.each(data, function (key, val) {
											if((key=='data') && (val!='')){
												//alert(JSON.stringify(val));
												$(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
												    var comment_id = this.comment_id;
												    var comment = this.comment;
												    var comment_time = this.comment_time;
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
														//var picurl = imagepath+user_pic; 
													}else{
														var picurl = '/images/user.png';
													} 
													
													$("#feedcomment-"+feed_id).prepend('<div class="comments mb-10"><div class="comment media mb-10 pb-10"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle"width="40" height="40"></div><div class="media-body media-middle"><p><strong>'+first_name+' '+last_name+'</strong></p><p class=" media-heading">'+comment+'</p></div></div>'); 
													
													/* $("#feedcomment"+feed_id).append('<div class="comments mb-10"><div class="comment media mb-10 pb-10"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle"width="40" height="40"></div><div class="media-body media-middle"><p><strong>'+first_name+' '+last_name+'</strong></p><p class=" media-heading">'+comment+'</p></div></div>'); */
												});
											}
										});  
									}
								});
							}); 
						}else if((key=='feed') && (val=='')){
							$posts_html.html('<div class="message"> No Feed Found !</div>');
						}
					});
				}else{ 
				  /*edit profile  */
				    $("#profilepicedit").html('');
					$.each(data, function (key, val) {
						if((key=='user') && (val!='')){
							var myJSON = JSON.stringify(val);
							//alert(myJSON);
							//var genarr = ['','male','female','Unique Identity'];
							//$("#selectgen").html('');
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
								var user_id = this.user_id;
								var first_name = this.first_name;
								var last_name = this.last_name; 
								var email = this.email;  
								var gender = this.gender; 
								var user_pic = this.user_pic; 
								var dob = this.dob; 
								var age = this.age; 
								var user_lat = this.user_lat; 
								var user_long = this.user_long; 
								var favourite_team = this.favourite_team; 
								var shoe_size = this.shoe_size; 
								var pant_size = this.pant_size; 
								var shirt_size = this.shirt_size; 
								var hat_size = this.hat_size; 
								var tracksuit_size = this.tracksuit_size; 
								var organization_type = this.organization_type; 
								var user_available_days = this.user_available_days; 
								var favourite_team_id = this.favourite_team_id; 
								var favourite_brand_id = this.favourite_brand_id;
                                $("#firstname").val(first_name);								
                                $("#lastname").val(last_name);
								if(user_pic!=''){
									if(user_pic.indexOf('http') > -1) { 
										var picsrc = this.user_pic;
									}else{ 
										var picsrc = imagepath+user_pic;
									} 
								}else{
									var picsrc ='/images/user.png';
								}
								
								$("#profilepicedit").append('<img src="'+picsrc+'"  style="height:100px;width:100px;" class="center-block img-circle img-responsive mb-20"><div class="profile-meta text-center"><p class="text-uppercase">'+first_name+' '+last_name+'<br><span class="small">'+age+', '+gender+'</span></p></div>');
								
								if(profilepage=='/user/edit_profile'){
									$('#blah').attr('src',picsrc);
									$('#date222').val(dob);
									//alert(gender);
									gender = gender.toLowerCase();
									$("#selectgen").val(gender);
									$("#firstname").val(first_name);
									$("#lastname").val(last_name);
								}
													
							}); 
						}
					});
				}
			} 
		});
	}
	/*################# Post comments ###################*/
	function PostComment(feed_id){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
	    var headerform = document.getElementById('headerform');
		var user_id = headerform.user_id.value;
		var comment = $("#comment_text-"+feed_id).val();
		var commentcountval = $("#commentcountval-"+feed_id).val();
		
		//alert(commentcountval);
		$.ajax({
			url: '/feed/comment_feeds',
			type: 'POST',
			data: {
				user_id: user_id,
				feed_id: feed_id,
				comment: comment,
			},
			beforeSend:function(){
				$("#postcomment-"+feed_id).html('<div class="message"><img src="/images/ajax-loader.gif"> </div>');
			},
			success: function(data) {
				$("#postcomment-"+feed_id).html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg = this.msg;
					var success = this.success;
					var datain = this.data;
					//alert(datain);
				    if((success==1) && (msg=='feeds data')){
						//alert(JSON.stringify(datain));
						$(jQuery.parseJSON(JSON.stringify(datain))).each(function() {
							var comment_id = this.comment_id;
							var comment = this.comment;
							var comment_time = this.comment_time;
							var user_id = this.user_id;
							var first_name = this.first_name;
							var last_name = this.last_name; 
							var user_pic = this.user_pic; 
							if(user_pic !=''){
								var picurl = imagepath+'/'+user_pic;
							}else{
								var picurl = '/images/user.png';
							}
							 
							//$("#feedcomment-"+feed_id).append('<div class="comments mb-30"><div class="comment media mb-20"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><p class="lead media-heading">'+comment+'</p></div></div>');
							
							/* $("#feedcomment-"+feed_id).prepend('<div class="comments mb-10"><div class="comment media mb-10 pb-10"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle"width="40" height="40"></div><div class="media-body media-middle"><p><strong>'+first_name+' '+last_name+'</strong></p><p class=" media-heading">'+comment+'</p></div></div>'); */
							
							 $("#feedcomment-"+feed_id).append('<div class="comments mb-10"><div class="comment media mb-10 pb-10"><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle"width="40" height="40"></div><div class="media-body media-middle"><p><strong>'+first_name+' '+last_name+'</strong></p><p class=" media-heading">'+comment+'</p></div></div>'); 
							//postcomment
							
							commentcountval++;
							$("#commentcounthtm-"+feed_id).html('');
							$("#commentcounthtm-"+feed_id).html('<a href="javascript:void(0)"><i class="fa fa-comment blue"></i> '+commentcountval+' comment</a>');
							$("#commentcountval-"+feed_id).val(commentcountval);
							
							$("#comment_text-"+feed_id).val('');
							
						}); 
					}else{
						//alert(msg);
					}
				}); 
					
			}
		});
	}
	function PostLike(feed_id,feed_count){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var headerform = document.getElementById('headerform');
		var user_id = headerform.user_id.value;
		$.ajax({
			url: '/feed/like_feeds',
			type: 'POST',
			data: {
				user_id: user_id,
				feed_id: feed_id
			},
			success: function(data) {
				//$.each(data, function (key, val) {
					//alert(key);
					//alert(JSON.stringify(val));
					$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
						var msg = this.msg;
						var success = this.success;
						var data = this.data;
						if((success==1) && (msg=='like successfully')){
							feed_count++;
							$("#likehtm-"+feed_id).html('');
							$("#likehtm-"+feed_id).append('<a href="javascript:void(0)" class="postlike" id="postlike-'+feed_id+'-'+feed_count+'"><i class="fa fa-heart green" id="likeicon-'+feed_id+'"></i> '+feed_count+' likes</a>');
						}else if((success==1) && (msg=='unlike Successfully')){ 
							feed_count--;
							$("#likehtm-"+feed_id).html('');
							$("#likehtm-"+feed_id).append('<a href="javascript:void(0)" class="postlike" id="postlike-'+feed_id+'-'+feed_count+'"><i class="fa fa-heart red" id="likeicon-'+feed_id+'"></i> '+feed_count+' likes</a>');
						}
					}); 
				//});
				//$.each(data, function (key, val) {
					//var myJSON = JSON.stringify(val);
					//alert(myJSON);
					//if((key=='success') && (val==1)){
						//$("#likeicon-"+feed_id).toggleClass("red");
						//alert(feed_count);
						//location.reload();
						/* $("#postlike-"+feed_id).html='';
						$("#postlike-"+feed_id).append("<i class="fa fa-heart red" id="likeicon-'+feed_id+'"></i> '+likeCount+' likes"); */
					//}
				//});	 		
			}
		}); 
		
	}
	/*###############Get Available DAys  ####################*/
	function GetavailableDays(){
		var daysavailform = document.getElementById('daysavail');
		var avail_user_id = daysavailform.avail_user_id.value;
		$.ajax({
			url: '/user/get_days_available_new',
			type: 'GET',
			data: {
				user_id : avail_user_id,
			},
			beforeSend:function(){
				$("#postsendavail").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				$("#postsendavail").html('');
				var $avail_days_div = $('#avail_days_div');
				var $unavail_days_div = $('#unavail_days_div');
				$avail_days_div.html('');
				$unavail_days_div.html('');
				$.each(data, function (key, val) {
					//alert(JSON.stringify(val));
					if((key=='data') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
							var  user_id =this.user_id;
							var  user_available_days =this.user_available_days;
							//if user avail days not avail  
							if(user_available_days==''){
								var values =[
									  {
										"day_id" : "1",
										"start_time" : "00:00",
										"name" : "Sunday",
										"end_time" :"00:00"
									  },
									  {
										"day_id" : "2",
										"start_time" :"00:00" ,
										"name" : "Monday",
										"end_time" :"00:00"
									  },
									  {
										"day_id" : "3",
										"start_time" : "00:00",
										"name" : "Tuesday",
										"end_time" :"00:00"
									  },
									  {
										"day_id" : "4",
										"start_time" : "00:00",
										"name" : "Wednesday",
										"end_time" : "00:00"
									  },
									  {
										"day_id" : "5",
										"start_time" : "00:00",
										"name" : "Thursday",
										"end_time" : "00:00"
									  },
									  {
										"day_id" : "6",
										"start_time" :"00:00" ,
										"name" : "Friday",
										"end_time" :"00:00"
									  },
									  {
										"day_id" : "7",
										"start_time" :"00:00",
										"name" : "Saturday",
										"end_time" : "00:00"
									  }
								];
								var user_available_days = JSON.stringify(values);
							}
							var par = JSON.parse(user_available_days); // parse json
						     $.each(par, function (key, val2) {
								$(jQuery.parseJSON(JSON.stringify(val2))).each(function() {
									var start_time = this.start_time;
									var end_time = this.end_time;
									var day_id = this.day_id;
									var name = this.name;
									if(((start_time=='00:00') && (end_time=='00:00')) || ((start_time=='') && (end_time==''))){ 
										$unavail_days_div.append('<li id="notavailrowrem-'+day_id+'">'+name+'<span class="pull-right addunavailtoavail" id="addavail-'+day_id+'-'+name+'"> <i class="fa fa-plus-circle green"></i> </span></li>');
										
										$avail_days_div.append('<button class="accordion days active availtounavail removerow" id="buttonrow-'+day_id+'-'+name+'">'+name+'</button><div class="panel panelopen removerow" id="pannelrow-'+day_id+'"><ul class="list-unstyled time"><li>Starts <input type="text" class="start_time_days" id="start_time-'+day_id+'" value="00:00" name="start-time" readonly="true"><li>Ends <input type="text" class="end_time_days" id="end_time-'+day_id+'" value="00:00" name="end-time" readonly="true"></li></ul></div>');
									}else{
										$unavail_days_div.append('<li class="removerow" id="notavailrowrem-'+day_id+'">'+name+'<span class="pull-right addunavailtoavail" id="addavail-'+day_id+'-'+name+'"> <i class="fa fa-plus-circle green"></i> </span></li>');
										
										$avail_days_div.append('<button class="accordion days active availtounavail" id="buttonrow-'+day_id+'-'+name+'">'+name+'</button><div class="panel panelopen" id="pannelrow-'+day_id+'"><ul class="list-unstyled time"><li>Starts <input type="text" class="start_time_days" id="start_time-'+day_id+'" value="'+start_time+'" name="start-time" readonly="true"><li>Ends <input type="text" class="end_time_days" id="end_time-'+day_id+'" value="'+end_time+'" name="end-time" readonly="true"></li></ul></div>');
									}
								});
							});
							return false;
						}); 
					}else if((key=='data') && (val=='')){
						$("#postsendavail").html('<div class="message"> No Days Available </div>');
					}
					
				});
				$('.start_time_days').timepicker({
					 controlType: 'select',
					 oneLine: true,
					 timeFormat: 'HH:mm',
				});
				$('.end_time_days').timepicker({
					 controlType: 'select',
					 oneLine: true,
					 timeFormat: 'HH:mm',
				});
			}
		});
	}
	/*###################### Add available  days Commented  and not used  ################*/
	/* function AddavailableDays(day_id,week){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		//removes row  from unavailable
		$("#notavailrow-"+day_id).toggleClass("removerow");
		var start_time ='';
		var end_time ='';
		$.ajax({
			url: '/user/update_available_days',
			type: 'GET',
			data: {
				day_id: day_id,
				start_time: start_time,
				end_time: end_time
			},
			beforeSend: function() {
				$("#postsendavail").html('<div class="message" > <img src="/images/ajax-loader.gif"> </div>');
			},
			success: function(data) {
				$("#postsendavail").html('');
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#button-"+day_id).toggleClass("removerow");
						$("#panel-"+day_id).toggleClass("removerow");
					}
				});				
			}
		}); 
	} */
	/*###############Update Available  days  Commented  and closed #####################*/
	/* function UpdateAvailableDays(){
		var id =$(this).attr('id');
		var dayid = id.split('-');
		var day_id = dayid[1];
		var start_time = $("#start_time-"+day_id).val();
		var end_time = $("#end_time-"+day_id).val();
		$.ajax({
			url: '/user/update_available_days',
			type: 'GET',
			data: {
				day_id: day_id,
				start_time: start_time,
				end_time: end_time
			},
			beforeSend: function() {
				$("#postsendavail").html('<div class="message" > <img src="/images/ajax-loader.gif"> </div>');
			},
			success: function(data) {
				$("#postsendavail").html('');
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#message").html("Successfully Saved !");
					}
				});				
			}
		});
	} */
	/*##########  Activitty select and deselectcall  ##########*/
	function  setactivity(activity_id){
		/* var id =$(this).attr('id');
		var actid = id.split('-');
		var activity_id = actid[1];  */
		var user_id = $("#user_id").val();
		$.ajax({
			url: '/activity/set_activity',
			type: 'POST',
			data: {
				user_id: user_id,
				activity_id: activity_id
			},
			success: function(data) {
				//alert("success");
                $("#activityrow-"+activity_id).toggleClass("selectedx");				
                var btntext = $("#setactivity-"+activity_id).html();	
				if(btntext=='REMOVE'){
					$("#setactivity-"+activity_id).html('ADD');
				}else{
					$("#setactivity-"+activity_id).html('REMOVE');
				}				
                				
			}
		});
	}
	/*############### Getactivity call  ################*/
	function Getactivity(profilepage){
		var imagepath = $("#uploadspath").val();
		var activityform = document.getElementById('activityform');
		var searchstring= $("#searchactivity").val();
		var search_status =0;
		//alert(searchstring);
		$.ajax({
			url: '/activity/get_activity',
			type: 'GET',
			data: {
				user_id: activityform.user_id.value,
				friend_id: activityform.friend_id.value
			},
			beforeSend:function(){
				$("#profileActivity").html('<div class="message"><img src="/images/ajax-loader.gif"> </div>');
				$("#favactivity").html('<div class="message"><img src="/images/ajax-loader.gif"> </div>');
			},
			success: function(data) {
				$("#postsuccess").html('')
				var $favactivity_html = $('#favactivity');
				var $eventactivityt_html = $('#eventactivity');
				var $profileActivity_html = $('#profileActivity');
				$favactivity_html.html('');
				$eventactivityt_html.html('');
				$profileActivity_html.html('');
				//$eventactivityt_html.append('<option value="">SELECT</option>')
				$.each(data, function (key, val) {
					if(key=='activity'){
						var myJSON = JSON.stringify(val);
						//alert(myJSON);
						 $(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
							var activity_id = this.activity_id;
							var activity_name = this.activity_name;
							var activity_pic = this.activity_pic; 
							var selected = this.selected; 
							if(activity_pic !=''){
								var picpath = imagepath+'/'+activity_pic;
							} else {
								var picpath = 'http://placehold.it/100x100';
							}
							if(selected==1){  
								var selectedclass ='btn-green' ;
							} else { 
							    var selectedclass ='' ;
							} 
							if((profilepage=='/event/create_event/') ||(profilepage=='/linkup_new/add_new_request') || (profilepage=='/event/edit_event/')){
								$eventactivityt_html.append('<option value="'+activity_id+'">'+activity_name+'</option>');
							}else if(profilepage=='/user/favteams'){
								if(searchstring!=''){ 
								    searchstring =searchstring.toLowerCase();
									searchstring = $.trim(searchstring);
									var activity_name_str =activity_name.toLowerCase();
									if(activity_name_str.indexOf(searchstring)!= -1){
									search_status=1;
										$favactivity_html.append('<div class="media activity favteamactivityrow" id="favteamactivityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body"><h3 class="media-heading">'+activity_name+'</h3></div></div>'); 
									}
								}else{
									
									$favactivity_html.append('<div class="media activity favteamactivityrow" id="favteamactivityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body"><h3 class="media-heading">'+activity_name+'</h3></div></div>');
								}
								
							}else if(profilepage=='/user/favfans'){
								if(searchstring!=''){
									searchstring =searchstring.toLowerCase();
									searchstring = $.trim(searchstring);
									var activity_name_str =activity_name.toLowerCase();
									if(activity_name_str.indexOf(searchstring)!= -1){
									search_status=1;
										$favactivity_html.append('<div class="media activity favactivityrow" id="favactivityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body"><h3 class="media-heading">'+activity_name+'</h3></div></div>'); 
									}
								}else{
									$favactivity_html.append('<div class="media activity favactivityrow" id="favactivityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body"><h3 class="media-heading">'+activity_name+'</h3></div></div>'); 
								}
							}else if(profilepage=='/user/profile'){
								
								if(activity_pic !=''){
									var picpath = imagepath+activity_pic;
								} else {
									var picpath = 'http://placehold.it/80x80';
								}
								if(selected==1){  
									var selectedclass ='selectedx';
									var buttontxt ='REMOVE';
								}else{
									var selectedclass ='';
									var buttontxt ='ADD';
								} 
								
								$profileActivity_html.append('<div class="media activity '+selectedclass+'"  id="activityrow-'+activity_id+'"><div class="media-left media-top"><img src="'+picpath+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body "><h3 class="media-heading customhead">'+activity_name+'</h3></div><div class="action"><button class="btn btn-rounded effect text-uppercase mt-20 pl-40 pr-40 setactivity" id="setactivity-'+activity_id+'">'+buttontxt+' </button></div></div>'); 		
							}
							
						});  
					}
				});
				//display empty message  
				 if((search_status==0) &&(searchstring!='')){
					 $favactivity_html.append('<div class="message"> No activity  Found ! </div>')
				 }
			}
		});
	}
	/*###############Get friend rewquests   for header ##################*/
	function GetfriendRequestsheader(){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var friendform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/get_pending_request',
			type: 'GET',
			data: {
				user_id: friendform.user_id.value,
				friend_id: friendform.friend_id.value
			},
			success: function(data) {
				var $data = $('#headerfriendrequest');
				//var $datacount = $('#friendnotification');
				var $datadropdown = $('#headerfriendrequestdropdown');
				$.each(data, function (key, val) {
					//alert(JSON.stringify(val)); 
					if(key=='friend'){
						if(val==''){
							$data.html('');
							$data.append('<a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i class="fa fa-users"></i></a><ul class="dropdown-menu" id="headerfriendrequestdropdown"><li><div class="media green">No New friend Request ! </div></li></ul>');
						}else{
							var count = val.length;
							$data.html('');
							$data.append('<span class="notification" id="friendnotification">'+count+'</span> <a class="dropdown-toggle" data-toggle="dropdown" href="#"> <i class="fa fa-users"></i></a><ul class="dropdown-menu" id="headerfriendrequestdropdown"></ul>');
							var $datadropdown = $('#headerfriendrequestdropdown');
						
							$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
							    //alert(JSON.stringify(val));
								var user_id = this.user_id;
								var id = this.id;
								var first_name = this.first_name;
								var last_name = this.last_name;
								var email = this.email;
								var user_pic = this.user_pic;
								if(user_pic==''){
									var picsrc = 'http://placehold.it/50x50';
								}else{
									var picsrc = imagepath+user_pic;
								}
								$datadropdown.append('<li><div class="media"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="50" height="50"></div><div class="media-body media-middle"><h4 class="media-heading"><a href="#">'+ first_name +' '+last_name+'</a></h4><i class="fa fa-check green acceptrequest" id="acceptrequest-'+user_id+'-'+id+'"></i><i class="fa fa-close red rejectrequest" id="rejectrequest-'+user_id+'-'+id+'"></i></div></div></li>');
							});				
				     	}	 
					} 
				}); 
			}
		}); 
	}
	/*########### get friend requests call ##############*/
	function getrequest(){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var activityform = document.getElementById('activityform');
		$.ajax({
			url: '/friend/get_pending_request',
			type: 'GET',
			data: {
				user_id: activityform.user_id.value,
				friend_id: activityform.friend_id.value
			},
			beforeSend:function(){
				//$("#message").html('');
				$("#friendsRequests").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: postgetrequestSuccessHandler
		});
	}
	function postgetrequestSuccessHandler(jsonData){
		var imagepath = $("#uploadspath").val();
		var $data = $('#friendsRequests');
		$data.html('');
		$.each(jsonData, function (key, val) {
			if(key=='friend'){ 
			    if(val==''){
					$data.append('<div class="message">No Pending Request Found! </div>');
				}else{
					//alert("jfdfkjdafdfdd");
					$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
						var user_id = this.user_id;
						var id = this.id;
						var first_name = this.first_name;
						var last_name = this.last_name;
						var email = this.email;
						var user_pic = this.user_pic;
						if(user_pic==''){
							var picsrc = '/images/user.png';
						}else{
							var picsrc = imagepath+'/'+user_pic;
						}
						$data.append('<div class="request"><div class="media mb-20"><div class="media-left media-middle pr-30"><img src="'+picsrc+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body media-middle"><div class="media-body media-middle"><h3 class="media-heading">'+first_name +' '+last_name+'</h3><p class="text-muted"><small><strong>Rating:</strong> Wood</small></p></div></div><div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 acceptrequest" id="acceptrequest-'+user_id+'-'+id+'">Accept</button><button class="btn btn-red btn-rounded effect text-uppercase mt-20 pl-40 pr-40 rejectrequest" id="rejectrequest-'+user_id+'-'+id+'">Delete</button></div></div>');
					});
				}
				
			}
		});
	}
	/*################ Unfriend   call ################*/
	function unfriendfun(friend_id){
		var imagepath = $("#uploadspath").val();
		$.ajax({
			url: '/friend/unfriend',
			type: 'POST',
			data: {
				user_id: friend_id,
				friend_id: friend_id
			},
			beforeSend:function(){
				$("#postunfriend-"+friend_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) {
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#friend-"+friend_id).html('');
					} 
				}); 
			}
		}); 
	} 
	/*###########get friend call################## */
	function getfriend(){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var activityform = document.getElementById('activityform');
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/get_friends',
			type: 'GET',
			data: {
				user_id: activityform.user_id.value,
				friend_id: activityform.friend_id.value
			},
			beforeSend:function(){
				//$("#message").html('');
				$("#friendlist").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: postgetfriendSuccessHandler
		});
	}

	function postgetfriendSuccessHandler(jsonData){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads';
		var imagepath = $("#uploadspath").val();
		var $friendlist_html = $('#friendlist');
		$friendlist_html.html('');
		var userloggedin = headerform.user_id.value;
		var viewuser = activityform.user_id.value;
		//var f_list_ids =[];
		$.each(jsonData, function (key, val) {
			if(key=='friend'){
				var myJSON = JSON.stringify(val);
				if(val==''){
					$friendlist_html.append('<div class="message">No Friend Found !</div> ');
					
				}else{
					$(jQuery.parseJSON(JSON.stringify(val))).each(function() {  
						var user_id = this.user_id;
						var first_name = this.first_name;
						var last_name = this.last_name;
						var email = this.email;
						//var badge = this.badge;
						//alert(badge);
						var user_pic = this.user_pic;
						if(user_pic==''){
							var picsrc = '/images/user.png';
						}else{
							if(user_pic.indexOf('http') > -1) { 
								var picsrc = this.user_pic;
							}else{ 
								var picsrc = imagepath+user_pic;
							} 
						}
						//prevent other user  for unfriend 
						if(userloggedin==viewuser){
							$friendlist_html.append('<div class="friend-list relative" id="friend-'+user_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/user/viewprofile?viewid='+user_id+'"><img src="'+picsrc + '" class="media-object img-circle"width="100" height="100"></a></div><div class="media-body media-middle"><h3 class="media-heading"> <a href="/user/viewprofile?viewid='+user_id+'">'   + first_name + ' '+last_name+ '</a></h3><p class="text-muted"></p></div></div><div class="action"><button class="btn btn-red btn-rounded effect text-uppercase mt-20 pl-40 pr-40 unfriendclass" id="unfriend-'+user_id+'">Unfriend</button></div><div id="postunfriend-'+user_id+'"></div></div>');
						}else{
							$friendlist_html.append('<div class="friend-list relative" id="friend-'+user_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/user/viewprofile?viewid='+user_id+'"><img src="'+picsrc + '" class="media-object img-circle" width="100" height="100"></a></div><div class="media-body media-middle"><h3 class="media-heading"><a href="/user/viewprofile?viewid='+user_id+'">'   + first_name +' '+last_name+ '</a></h3><p class="text-muted"></p></div></div></div>');
						}
						//f_list_ids.push(user_id);
						
					}); 
				}
			}
       });
	  // $("#friendlis_idshere").val(f_list_ids);
    }
    /*validate email */
	function validateEmail(Email) {
		var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		return $.trim(Email).match(pattern) ? true : false;
    }
	/*convert  time into  day format */
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
 
//init on document ready
$(document).ready(init);
})();