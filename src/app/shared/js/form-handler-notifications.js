(function () {
	function init(){
		//var imagepath = 'http://35.163.199.28/swiftSpar/uploads/';
		var imagepath = $("#uploadspath").val();
		var profilepage = location.pathname;
		
		if((profilepage=='/user/verify_account') || (profilepage=='/user/forgot_password/') || (profilepage=='/user/signup-personal') || (profilepage=='/user/signup-business') ||(profilepage=='/user/login')){
			
		}else{
			LocalNotification(profilepage,imagepath);
		}
		if(profilepage=='/local_notification/view-notification'){
			LocalNotificationforPage(profilepage,imagepath);
		}
		//set cookies  for  reminder
		$(document).on("click", "#setremindersubmit" , function() {
			var val =$("#setreminderval").val();
			setCookie("setnotification", val, 20);
			$("#myModal").css("display","none");
        });
		$("#headernotification").click(change_read_status);
		
		// Add friend
		$(document).on("click", ".addfriend" , function() {
			Addfriend(imagepath);
		});
		//accept friendrequest
		$(document).on("click", ".acceptrequest" , function() {
			//alert("fdfdfdfdfdfds");
		    var friendid =$(this).attr('id');
			var friendidar = friendid.split('-');
			var friend_id = friendidar[1];
			var id = friendidar[2];
			// status 2 is for accept request 
			var status =2;
			AcceptRejectRequest(imagepath,friend_id,status,id); 
        });
		//reject friend request
		$(document).on("click", ".rejectrequest" , function() {
			//alert("fdfdfdfdfdfds");
		    var friendid =$(this).attr('id');
			var friendidar = friendid.split('-');
			var friend_id = friendidar[1];
			var id = friendidar[2];
			// status 3 is for reject request 
			var status =3;
			AcceptRejectRequest(imagepath,friend_id,status,id); 
        });
		// send feedback
		$(document).on("click", "#feedbackbutton" , function() {
			var feedback_text =$("#feedback_text").val();
			if(feedback_text==''){
				$("#postsubmitfeedback").html('<div class="message">Please Enter Feedback text</div>');
				return false;
			}else{
				$("#postsubmitfeedback").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
				insert_feedback(feedback_text);
			} 
		});
		
	}
	function insert_feedback(feedback_text){
		//alert("going to submit"); 
		//alert(feedback_text);
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/user/insert_feedback',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				feedback_text: feedback_text,
			},
			beforeSend:function(){
				$("#postsubmitfeedback").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) {
				$("#postsubmitfeedback").html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function(){
					var success =this.success;
					if(success==1){
						$("#postsubmitfeedback").html('<div class="message">'+this.msg+'</div>');
						setTimeout(function(){ 
							$("#feebackmodel").css("display","none");
						}, 1000);
						
					}else{
						$("#postsubmitfeedback").html('<div class="message">'+this.msg+'</div>');
						
					}
					
				});
				
			}
		});
	}
	function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
    //Accept Request
	function AcceptRejectRequest(imagepath,friend_id,status,id){
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/accept_friend_request',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				friend_id: friend_id,
				status: status,
				id:id
			},
			beforeSend:function(){
				$("#branddiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) {
				$("#postsubmit").html('');
				//alert(JSON.stringify(data));
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() { 
					var success= this.success;
					var msg =this.msg;
					if(success==1){
						alert(msg);
						location.reload();
					}else{
						alert(msg);
						location.reload();
					}
					
				});
			}
		});
	}
	//send friend Request
	function Addfriend(imagepath){
		//var imagepath = $("#uploadspath").val();
		var activityform = document.getElementById('activityform');
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/friend/send_friend_request',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				friend_id: activityform.friend_id.value
			},
			beforeSend:function(){
				$("#message").html('');
				$("#message").append('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) { 
			    $.each(data, function (key, val) {
					if((key=='msg')&&(val!='')){
						$("#message").html('');
						$("#message").append('<div class="message">'+val+'</div>');
					}
				});
			}
		}); 
	}
	/*change read status  of the notification */
	function change_read_status(){
		var notific_ids = $("#notificationids").val();
		var notific_arr =notific_ids.split(',');
		$.each(notific_arr, function (index, value) {
			 $.ajax({
				url: '/local_notification/change_read_status',
				type: 'PUT',
				data: {
					notification_id: value
				},
				success: function(data) {
					//$.each(data, function (key, val) {
						//alert(val);
					//});
				}
			}); 
		});
		
	}
	/*################ Get Local Notification  for header  #############*/
	
	function LocalNotification(profilepage,imagepath){
	
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/local_notification/localNotification',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				limit: 2000000,
			},
			success: function(data) {
				var $headernotification_html = $('#headernotification');
				//var $viewnotificationpage_html = $('#viewnotificationpage');
				$headernotification_html.html('');
				//$viewnotificationpage_html.html('');
				$.each(data, function (key, val) {
					if((key=='Unread_count') &&(val!='')){
						$headernotification_html.append('<span class="notification" id="headernotification">'+val+'</span><a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-bell"></i> </a><ul class="dropdown-menu" id="headernotificationdropdown"></ul>');
					} 
					if((key=='Unread_count') &&(val==0)){
						$headernotification_html.append('<a class="dropdown-toggle" data-toggle="dropdown" href="/local_notification/view-notification"> <i class="fa fa-bell"></i> </a><ul class="dropdown-menu" id="headernot"><div class="media green"> <a href="/local_notification/view-notification"> No New Notification !</a></div></ul>');
					}
					if((key=='data')&&(val!='')){
						//empty the  dropdown
						var $headernotification_dropdown_html = $('#headernotificationdropdown');
						$headernotification_dropdown_html.html('');
						var i=1;
						var notificationids=[];
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
						//alert(JSON.stringify(val));
						    var notification_id = this.notification_id;
							
							var notification_user_id = this.notification_user_id;
							var notification_friend_id = this.notification_friend_id;
							var notification_read_status = this.notification_read_status;
							var notification_message = this.notification_message;
							var first_name = this.first_name;
							var last_name = this.last_name;
							var username = first_name+' '+last_name;
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
							//if(profilepage=='/local_notification/view-notification'){
								/* $viewnotificationpage_html.append('<div class="media notification-list"><div class="media-left media-top"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h4 class="media-heading"><strong>'+username+'</strong> '+notification_message+'</h4></div><div class="action"><span class="close"><i class="fa fa-close"></i></span></div></div>'); */
							//} 
							if(i>5){
								return false;
							} 
							if(notification_read_status==0){
								notificationids.push(notification_id);
								$headernotification_dropdown_html.append('<li><div class="media"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="50" height="50"></div><div class="media-body media-middle"><h4 class="media-heading"><a href="#"><strong>'+username+' </strong> '+notification_message+' </a></h4><a href="#"></a></div></div></li>');
								i++;
							}
						});
						//alert(notificationids)
						$("#notificationids").val(notificationids);
						
						$headernotification_dropdown_html.append('<li><a href="/local_notification/view-notification" class="btn btn-blue br-0">View All</a></li>');
					}
				});
			}
		});
	}
	function LocalNotificationforPage(profilepage,imagepath){
		var headerform = document.getElementById('headerform');
		/*$.ajax({
			url: '/local_notification/update-notification',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				limit: 2000000,
			},
			
			success: function(data) {
			}
		});*/
		$.ajax({
			url: '/local_notification/localNotification',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				limit: 2000000,
				testuu:"testu",
			},
			beforeSend:function(){
				$("#viewnotificationpage").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success: function(data) {
				
				var $viewnotificationpage_html = $('#viewnotificationpage');
				$viewnotificationpage_html.html('');
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
						    var notification_id = this.notification_id;
							var notification_user_id = this.notification_user_id;
							var notification_friend_id = this.notification_friend_id;
							var notification_read_status = this.notification_read_status;
							var notification_message = this.notification_message;
							var first_name = this.first_name;
							var last_name = this.last_name;
							var username = first_name+' '+last_name;
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
							
							$viewnotificationpage_html.append('<div class="media notification-list"><div class="media-left media-top"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h4 class="media-heading"><strong>'+username+'</strong> '+notification_message+'</h4></div><div class="action"><span class="close"><i class="fa fa-close"></i></span></div></div>');
							
						});
					}else if((key=='data')&&(val=='')){ 
						$viewnotificationpage_html.html('<div class="message"> No Notification Found!</div>');
					}
				});
			}
		});
	}
	/*#######  update user details  ########*/
	$(document).ready(init);
})();
