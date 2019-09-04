(function () {
	function init(){
		var profilepage = location.pathname;
		var imagepath = $("#uploadspath").val();
		if(profilepage=='/chat/chat'){
			get_user_message(imagepath);
			setInterval (function(){
				var imagepath = $("#uploadspath").val();
				var friend_id = $("#chatperson_friend_id").val();
				var group_id = $("#chat_group_id").val();
				if(friend_id){
					//alert("friend");
					getSingleUserMessages(friend_id,imagepath);
				}else if(group_id){
					//alert("group");
					getSingleGroupMessages(group_id,imagepath);
				}
				//
				 
			}, 3000); 
		
		}
		//friendsearchbutton
		$(document).on("click", "#friendsearchbutton" , function() {
			get_user_message(imagepath);
		});
		//alert(profilepage);
		if(profilepage.indexOf("/chat/chat/") != -1){
			get_user_message(imagepath);
		}
		//  conversation  of group 
		$(document).on("click", ".singleGroupmessages" , function() {
			var id =$(this).attr('id');
			var group = id.split('-');
			var group_id = group[1];
			var group_name = group[2];
			$("#chat_group_id").val(group_id);
			$("#chatperson").html('');
			$("#chatperson").append(group_name);
			$('div[id ^= "active_chat_group_friend-"]').removeClass('activechat');
			$("#active_chat_group_friend-"+group_id).addClass('activechat');
			var dropdown='<li><a href="javascript:void(0)" id="clear_chat_group">Clear Chat</a></li><li><a href="javascript:void(0)" id="exit_chat_group">Exit Group </a></li> <li><a href="/chat/group-info/'+group_id+'" >Group Info</a></li> ';
			$("#settingdropdown").html('');
			$("#settingdropdown").html(dropdown);
			getSingleGroupMessages(group_id,imagepath); 
        });
		//group  old messages
        $(document).on("click", ".loadoldGroupmessages" , function() {
			var id =$(this).attr('id');
			var group = id.split('-');
			var group_id = group[1];
			var last_id = group[2];
			get_group_message(group_id,imagepath,last_id);
        });
		
		
		/* setInterval (function(){
			var imagepath = $("#uploadspath").val();
			var friend_id = $("#chatperson_friend_id").val();
			var group_id = $("#chat_group_id").val();
			if(friend_id){
			    //alert("friend");
				getSingleUserMessages(friend_id,imagepath);
			}else if(group_id){
				//alert("group");
				getSingleGroupMessages(group_id,imagepath);
			}
			//
			 
		}, 3000); 
		 */
		
		
		$(document).on("click", ".singlefriendmessages" , function() {
			var id =$(this).attr('id');
			var frnd = id.split('-');
			var friend_id = frnd[1];
			var friend_name = frnd[2];
			$("#chatperson_friend_id").val(friend_id);
			$("#chat_group_id").val('');
			$("#chatperson").html('');
			$("#chatperson").append(friend_name);
			var dropdown='<li><a href="javascript:void(0)" id="clear_chat_onetoone">Clear Chat</a></li>';
			$("#settingdropdown").html('');
			$("#settingdropdown").html(dropdown);
			$('div[id ^= "active_chat_group_friend-"]').removeClass('activechat');
			$("#active_chat_group_friend-"+friend_id).addClass('activechat');
			getSingleUserMessages(friend_id,imagepath);
        });
		$(document).on("click", ".loadoldmessages" , function() {
			var id =$(this).attr('id');
			var frnd = id.split('-');
			var friend_id = frnd[1];
			var last_id = frnd[2];
			get_message(friend_id,imagepath,last_id);
        });
		
		
	    //add friend to  group list
		$(document).on("click", ".addfriendtolist" , function() {
			var id =$(this).attr('id');
			var htm =$(this).html();
			var frnd = id.split('-');
			var friend_id = frnd[1];
			$("#formhtml").append(htm);
			AddFriendtoList(friend_id);
		 });
		 
		 // remove  friend  from group 
		 $(document).on("click", ".removefriend" , function() {
			var id =$(this).attr('id');
			var frnd = id.split('-');
			var friend_id = frnd[1];
			RemoveFriend(friend_id);
		 });
		
		//
		$("#sendmessage").click(function(){
			if($("#messsage").val()==''){
				$(".postsubmit").html('<div class="error">Please Enter Message! </div>');
				event.preventDefault();
			}else{
				$(".postsubmit").html('');
				SendMessage(imagepath);
			}
		});
		
		//when click on done  button
		$("#addfriendsdone").click(function(){
			$("#addfriendsection").css('display','none');
            $("#addgroupsection").css('display','block');
            $("#title").html('Create Group<span>Create Group</span>');
		});
		if(profilepage=='/chat/create-group'){
	       getfriend(imagepath,profilepage);
			$(document).on("keyup", "#searchfriend_forgroup" , function() {
				getfriend(imagepath,profilepage);
			});
		}
		//Preview upload  image 
		$("#file-1").change(function() {
		  readURL(this);
		});
		//initiate chat 
		if(profilepage=='/chat/initiate-chat'){
			getfriend(imagepath,profilepage);
		}
		//send popup message 
		$(document).on("click", ".startchat" , function() {
			var id =$(this).attr('id');
			var frnd = id.split('-');
			var friend_id = frnd[1];
			$("#chatperson_friend_id").val(friend_id);
			$("#myModal2").css("display","block");
		}); 
		$(document).on("click", ".closepopup" , function() {
			$("#myModal2").css("display","none");
			
			//videochat popup
			$("#myModal3").css("display","none");
		});
		$(document).on("click", "#sendpopupmessage" , function() {
		    SendpopupMessage(imagepath)
        });
		
		//$('#organizationstabinitiate').click(get_organization_follower2);
		$(document).on("click", "#organizationstabinitiate" , function() {
		   get_organization_follower2(imagepath);
        });
		$(document).on("click", "#clear_chat_onetoone" , function() {
		   clear_chat_onetoone();
        });
		$(document).on("click", "#clear_chat_group" , function() {
			//status  5 is for  clear group chat 
			var status =5;
		    clear_chat_group(status);
        });
		$(document).on("click", "#exit_chat_group" , function() {
			// status  1  for  exit from the group
			var status =1
		    clear_chat_group(status);
        });
		if(profilepage.indexOf("/chat/group-info/") != -1){
			GetGroupInfo(imagepath);
		}	
		$("#videocall").click(function(){
			var type=2;
			StartVideoVoiceCall(type);
		});
		$("#voicecall").click(function(){
			var type=1;
			StartVideoVoiceCall(type);
		})
        // VALIDATION ON CREATE GROUP
		$("#groupchatform" ).submit(function( event ) {
			if($("#group_name").val()==''){
				//alert( "Handler for .submit() called.dfdfdfdf" );
				$(".postsubmit").html('<div class="error"> Please Enter The Group Name! </div>');
				$("#group_name").toggleClass('errorClass');
				event.preventDefault();
			}else{
				$(".postsubmit").html('');
				$("#group_name").toggleClass('errorClass');
			}
		});
		 // VALIDATION ON Send Message
		/* $("#groupchatform" ).submit(function( event ) {
			if($("#group_name").val()==''){
				//alert( "Handler for .submit() called.dfdfdfdf" );
				$(".postsubmit").html('<div class="error"> Please Enter The Group Name! </div>');
				$("#group_name").toggleClass('errorClass');
				event.preventDefault();
			}else{
				$(".postsubmit").html('');
				$("#group_name").toggleClass('errorClass');
			}
		}); */
	}
	//video and voice call 
	function StartVideoVoiceCall(type){
		var headerform = document.getElementById('headerform');
		var sendchatmessage = document.getElementById('sendpopupform');
		$.ajax({
			url: '/calling/video_calling',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				type :type,
				first_name :'testing',
				last_name :'kbizsoft',
				pagefrom :'chat',
			},
			success:function(data) {
				//alert(JSON.stringify(data));
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg = this.msg;
					var success = this.success;
					var data2 =this.data;
					if(success==1){
						// alert(JSON.stringify(data));
						$(jQuery.parseJSON(JSON.stringify(data2))).each(function() {
							var sessionId = this.sessionId;
							var token = this.token1;
							var apiKey = "46051402";
							//alert("session Id : "+sessionId);
							//alert("apiKey : "+apiKey);
							//alert("token : "+token);
							//$("#tokennn").html(token);
							console.log(token);
							//$("#apiKey").val();
							// $("#sessionId").val(sessionId);
							//$("#token").val(token1); 
							//InitVideo(apiKey,sessionId,token);
							//InitVideo(apiKey,sessionId,token);
							initializeSession(apiKey,sessionId,token);
							$("#myModal3").css("display","block");
							
						});
						//$("#myModal2").css("display","none");
					}else{
						alert(msg);
					}
				});
			}
		});
	}
	//get Group Info
	function GetGroupInfo(imagepath){
		var sendchatmessage = document.getElementById('groupinfo');
		var group_id= sendchatmessage.group_id.value;
		//alert(group_id);
		$.ajax({
			url:'/chat/get_group_info',
			type: 'GET',
			data: {
				group_id:group_id,
			},
			beforeSend: function() {
				$("#group_members").html('<div class="message" id="message"> <img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data) {
				$group_members=$("#group_members");
				$group_members.html('');
				$.each(data, function (key, val) {
					//alert(key);
					//alert(JSON.stringify(val));
					if((key=='data') && (val!='')){
						
						//$('#blah').attr('src', e.target.result);
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var user_id=this.user_id;
							var first_name=this.first_name;
							var last_name=this.last_name;
							var group_admin=this.group_admin;
							var user_pic=this.user_pic;
							if(group_admin==1){
							  var admintext ='<span class="admin red"><small>~Admin</small></spam>';
							}else{
								var admintext ='';
							}
							if(user_pic==''){
								var picsrc = '/images/user.png';
							}else{
								if(user_pic.indexOf('http') > -1) { 
									var picsrc = this.user_pic;
								}else{ 
									var picsrc = imagepath+user_pic;
								} 
							}
							$group_members.append('<div class="media"><div class="media-left media-top"><img width="90" height="90"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+first_name+' '+last_name+'</h4></div><div class="action">'+admintext+'</div>'); 
						}); 
					}
				});
			}
		});
	}
	//clear group chat
	function clear_chat_group(status){
		//var status = 5;
		var headerform = document.getElementById('headerform');
		var sendchatmessage = document.getElementById('sendchatmessage');
		$.ajax({
			url: '/chat/exit_group_chat',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				group_id: sendchatmessage.group_id.value,
				status:status
			},
			beforeSend: function() {
				$conversation_html =$("#conversation");
				if($conversation_html.find('.message').length==1){
					$(".message").html('<img src="/images/ajax-loader.gif">');
				}else{
					$conversation_html.prepend('<div class="error"> <img src="/images/ajax-loader.gif"> </div>');
				}
			},
			success:function(data) {
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg = this.msg;
					var success = this.success;
					if(success==1){
						//alert(msg);
						$("#conversation").html('');
						$("#conversation").html('<div class="message">'+msg+'</div>');
					}else{
					   $("#conversation").prepend('<div class="message">'+msg+'</div>');
					}
				});
			}
		});
	}
	//clear one to one 
	function clear_chat_onetoone(){
		var status = 3;
		var headerform = document.getElementById('headerform');
		var sendchatmessage = document.getElementById('sendchatmessage');
		$.ajax({
			url: '/chat/delete_chat',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				friend_id: sendchatmessage.friend_id.value,
				status:3
			},
			beforeSend: function() {
				$conversation_html =$("#conversation");
				if($conversation_html.find('.message').length==1){
					$(".message").html('<img src="/images/ajax-loader.gif">');
				}else{
					$conversation_html.prepend('<div class="error"> <img src="/images/ajax-loader.gif"> </div>');
				}
			},
			success:function(data) {
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg = this.msg;
					var success = this.success;
					if(success==1){
						//alert(msg);
						$("#conversation").html('');
						$("#conversation").html('<div class="message">'+msg+'</div>');
					}else{
					   $("#conversation").prepend('<div class="message">'+msg+'</div>');
					}
				});
			}
		});
	}
	//send popup message 
		//send message 
	function SendpopupMessage(imagepath){
		var headerform = document.getElementById('headerform');
		var sendchatmessage = document.getElementById('sendpopupform');
		var user_id = headerform.user_id.value;
		var friend_id = sendchatmessage.friend_id.value;
		var message = sendchatmessage.message.value;
		$.ajax({
			url: '/chat/send_message',
			type: 'POST',
			data: {
				user_id: headerform.user_id.value,
				friend_id: sendchatmessage.friend_id.value,
				message: sendchatmessage.message.value
			},
			success:function(data) {
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg = this.msg;
					var success = this.success;
					if(success==1){
						alert(msg);
						$("#myModal2").css("display","none");
					}else{
					   alert(msg);
					}
				});
			}
		});
	}
	//get org follower
	function get_organization_follower2(imagepath){
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/event/get_organization_follower',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				limit: 100
			},
			success:function(data) {
				var $organizations_html = $('#organization_list');
				$organizations_html.html('');
				/* var userloggedin = headerform.user_id.value;
				var viewuser = activityform.user_id.value; */
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert(val);
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
							var org_follow_id = this.org_follow_id; 
							var first_name = this.first_name; 
							var last_name = this.last_name; 
							var email = this.email; 
							var email = this.email;  
							var gender = this.gender; 
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
							$organizations_html.append('<div class="friend-list relative" id="friend-'+org_follow_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/event/bussiness-profile/'+org_follow_id+'"><img src="'+picsrc + '" class="media-object img-circle" style="width:100px;"></a></div><div class="media-body media-middle"><h3 class="media-heading"> <a href="/event/bussiness-profile/'+org_follow_id+'">'   + first_name + ' '+last_name+ '</a></h3></div></div></div>'); 
							
						});  
					
					}
					if((key=='data') && (val=='')){
						$organizations_html.append(' No org found !');
					}
				});	 
			}
		}); 
	}
	//Remove friend from  list
	function RemoveFriend(friend_id){
		var friend_arr=[];
		var friend_value = $("#friendids").val();
		if(friend_value!=''){
			var friend_val = friend_value.split(',');
			var count =friend_val.length;
			if(count< 2){
				//remove done  option
				$("#addfriendsdone").css('display','none');
			}
			var friend_val = friend_value.split(',');
			$.each(friend_val,function (index, value) {
				if(friend_id==value){
					$("#addedrow-"+friend_id).toggleClass("removerow");
					$("#addedrowtogroup-"+friend_id).toggleClass("removerow");
					$("#mark_friend-"+friend_id).toggleClass("hidden");
				}else{
					friend_arr.push(value);
				}
			});
			$("#friendids").val(friend_arr);
		}
	}
	//add friend to  group list 
	function AddFriendtoList(friend_id){ 
	    var $friendsadded_html = $('#added_friends');
	    var friend_arr=[];
		var friend_value = $("#friendids").val();
		if(friend_value!=''){
			//add done option
			$("#addfriendsdone").css('display','block');
			var friend_val = friend_value.split(',');
			var count =friend_val.length;
			$.each(friend_val,function (index, value) {
				friend_arr.push(value);
			});
			var friends = $.inArray(friend_id, friend_arr );
			if(friends >-1){
				alert("Cannot Add same friend for twice");
			}else {
				friend_arr.push(friend_id);
				$("#mark_friend-"+friend_id).toggleClass("hidden");
				$("#addedrow-"+friend_id).toggleClass("removerow");	
				$("#addedrowtogroup-"+friend_id).toggleClass("removerow");	
			}
			$("#friendids").val(friend_arr);
		}else{
			$("#friendids").val(friend_id);
			$("#mark_friend-"+friend_id).toggleClass("hidden");
			$("#addedrow-"+friend_id).toggleClass("removerow");
			$("#addedrowtogroup-"+friend_id).toggleClass("removerow");
		}
	}
	
	
	//get friends
	function getfriend(imagepath,profilepage){
		
		var searchstring =$("#searchfriend_forgroup").val();
		
		var headerform = document.getElementById('headerform');
		var $friendlist_html = $('#friendlist');
		$friendlist_html.html('');
		
		//adding  to added list 
		var $friendsadded_html = $('#added_friends');
		$friendsadded_html.html('');
		
		var $addgroup_div_html = $('#addgroup_div');
		$addgroup_div_html.html('');
		
		$.ajax({
			url: '/friend/get_friends',
			type: 'GET',
			data: {
			user_id: headerform.user_id.value,
			friend_id: headerform.friend_id.value
			},
			beforeSend: function() {
				$friendlist_html.html('<div class="message" id="message"> <img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data){
				$friendlist_html.html('');
				$.each(data, function (key, val) {
					if(key=='friend'){
						if(val==''){
							$friendlist_html.append('<div class="error" id="message"> No Friend Found !</div>');
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
										var picsrc = this.user_pic;
									}else{ 
										var picsrc = imagepath+user_pic;
									} 
								}
								var name =first_name+' '+last_name;
								if(profilepage=='/chat/initiate-chat'){
									$friendlist_html.append('<div class="media"><div class="media-left media-top"><img width="80" height="80"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+first_name+' '+last_name+'</h4></div><div class="action"><button class="btn btn-red btn-rounded effect text-uppercase mt-20 pl-40 pr-40 startchat" id="startchat-'+user_id+'">Start Chat</button></div> </div>');
									
								}else{
									if(searchstring!=''){
										if((first_name.indexOf(searchstring) > -1) ||(last_name.indexOf(searchstring) > -1)) { 
											$friendlist_html.append('<div class="media addfriendtolist" id="addfriendtolist-'+user_id+'-'+name+'"><div class="media-left media-top"><img width="80" height="80"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+first_name+' '+last_name+'</h4></div><div class="action hidden" id="mark_friend-'+user_id+'"><i class="fa fa-check "></i></div></div>');
											
											$friendsadded_html.append('<div class="media removerow" id="addedrow-'+user_id+'"><div class="media-left media-top"><img  width="50" height="50"src="'+picsrc+'" class="media-object img-circle"></div><div class="action"><span class="close removefriend" id="removefriend-'+user_id+'"><i class="fa fa-close" ></i></span></div></div>');
											
											$addgroup_div_html.append('<div class="media removerow" id="addedrowtogroup-'+user_id+'"><div class="media-left media-top"><img  width="50" height="50"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+name+'</h4></div><div class="action"><span class="close removefriend" id="removefriend-'+user_id+'"><i class="fa fa-close"></i></span></div></div>');
											
										}else{
											
										}
									}else{
										$friendlist_html.append('<div class="media addfriendtolist" id="addfriendtolist-'+user_id+'-'+name+'"><div class="media-left media-top"><img width="80" height="80"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+first_name+' '+last_name+'</h4></div><div class="action hidden" id="mark_friend-'+user_id+'"><i class="fa fa-check "></i></div></div>');
										
										$friendsadded_html.append('<div class="media removerow" id="addedrow-'+user_id+'"><div class="media-left media-top"><img  width="50" height="50"src="'+picsrc+'" class="media-object img-circle"></div><div class="action"><span class="close removefriend" id="removefriend-'+user_id+'"><i class="fa fa-close" ></i></span></div></div>');
										
										$addgroup_div_html.append('<div class="media removerow" id="addedrowtogroup-'+user_id+'"><div class="media-left media-top"><img  width="50" height="50"src="'+picsrc+'" class="media-object img-circle"></div><div class="media-body media-middle"><h4 class="media-heading">'+name+'</h4></div><div class="action"><span class="close removefriend" id="removefriend-'+user_id+'"><i class="fa fa-close"></i></span></div></div>');
									}	
								}
							}); //inner foreach closed
						}
					}
				}); //outer foreach closed
				
				//check for  no result found during  search    and ifempty 
				 if((searchstring!='') && ($friendlist_html.html() =='')){
					$friendlist_html.append('<div class="error" id="message"> No Result Found !</div>');
				 }
			} 
		});
	}
	//send message 
	function SendMessage(imagepath){
		var headerform = document.getElementById('headerform');
		var sendchatmessage = document.getElementById('sendchatmessage');
		var user_id = headerform.user_id.value;
		var group_id = sendchatmessage.group_id.value;
		var friend_id = sendchatmessage.friend_id.value;
		var message = sendchatmessage.message.value;
		$postsubmit =$(".postsubmit");
		//alert(group_id);
		if(group_id!=''){
			//alert("group");
			$.ajax({
				url: '/chat/group_chat',
				type: 'POST',
				data: {
					user_id: headerform.user_id.value,
					group_id: sendchatmessage.group_id.value,
					message: sendchatmessage.message.value
				},
				beforeSend: function() {
					if($postsubmit.find('.error').length==1){
						$(".error").html('<img src="/images/ajax-loader.gif">');
					}else{
						$postsubmit.html('<div class="error"> <img src="/images/ajax-loader.gif"> </div>');
					}
				},
			    success:postsendmessage
			});
		}else{
			$.ajax({
				url: '/chat/send_message',
				type: 'POST',
				data: {
					user_id: headerform.user_id.value,
					friend_id: sendchatmessage.friend_id.value,
					message: sendchatmessage.message.value
				},
				beforeSend: function() {
					if($postsubmit.find('.error').length==1){
						$(".error").html('<img src="/images/ajax-loader.gif">');
					}else{
						$postsubmit.html('<div class="error"> <img src="/images/ajax-loader.gif"> </div>');
					}
				},
			    success:postsendmessage
			});
		}
	}
	//for both
	function postsendmessage(data){
		$postsubmit.html('');
		if($("#conversation").find('.message').length==1){
			$(".message").html('');
			$(".message").toggleClass('message');
		}
		var imagepath = $("#uploadspath").val();
		$conversation_html =$("#conversation");
		//alert(JSON.stringify(data));
		$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
			var msg = this.msg;
			var success = this.success;
			if(success==1){
				var message = this.message;
				var user_pic = this.user_pic;
				if(user_pic!=''){
					if(user_pic.indexOf('http') > -1) { 
						var picsrc = this.user_pic;
					}else{ 
						var picsrc = imagepath+user_pic;
					}
				}else{
					var picsrc ='/images/user.png';
				}
					//today 
					var today = new Date();
					var newtoday = today.toString('dd-MM-y');
					var todayparts = newtoday.split(" ");
					var TDay = todayparts[2]
					var TMonth = todayparts[1];
					var TYear = todayparts[3];
					var Ttime24 = todayparts[4];
					var Ttime12 = tConvert (Ttime24);						
					$conversation_html.append('<div class="sender"><div class="media"><div class="pull-right"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px" ></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br><small>'+Ttime24+'</small></h4></div></div></div>');
					
					// empty  the  text message
					$("#messsage").val('');
					
					//scroll to bottom
					var element = document.getElementById("conversation");
					element.scrollTop = element.scrollHeight+100;
			}else{
			   alert(msg);
			}
		});
	}
		
	//get old messages  of group 
	function get_group_message(group_id,imagepath,last_id){
		var headerform = document.getElementById('headerform');
		var loggedin =headerform.user_id.value;
		var groupid=group_id;
		$.ajax({
			url: '/chat/get_group_message',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				group_id: group_id,
				last_id: last_id,
				limit: 50,
			},
			beforeSend: function() {
				$conversation_html =$("#conversation");
				if($conversation_html.find('.message').length==1){
					$(".message").html('<img src="/images/ajax-loader.gif">');
				}else{
					$conversation_html.prepend('<div class="message" id="message">  </div>');
				}
			},
			success:function(data){
				last_id++;
				$("#loadoldhtm").html('<a href="javascript:void(0);"class="btn btn-default loadoldGroupmessages" id="loadoldGroupmessages-'+group_id+'-'+last_id+'"> Load Old.. </a>'); 
				
				$conversation_html =$("#conversation");
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var msg_id =this.msg_id;
							var message =this.message;
							var msg_time =this.msg_time;
							var read_unread =this.read_unread; 
							var group_id =this.group_id; 
							var user_id =this.user_id; 
							var user_pic =this.user_pic; 
							var first_name =this.first_name; 
							var last_name =this.last_name; 
							var username=first_name+' '+last_name;
							//alert(message); 
							//today 
							var today = new Date();
							var newtoday = today.toString('dd-MM-y');
							var todayparts = newtoday.split(" ");
							var TDay = todayparts[2]
							var TMonth = todayparts[1];
							var TYear = todayparts[3];
							var Ttime24 = todayparts[4];
							var Ttime12 = tConvert (Ttime24); 
							//SPLIT msg_time 
							var date = new Date(msg_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24); 
							if((TYear==Year)&&(TMonth==Month)&&(TDay==Day)){
								var msgdate =time12;
							}else{
								var msgdate = Day+' '+Month+' '+Year+' '+time12;
							}
							if(user_pic!=''){
								if(user_pic.indexOf('http') > -1) { 
									var picsrc = this.user_pic;
								}else{ 
									var picsrc = imagepath+user_pic;
								}
							}else{
								var picsrc ='/images/user.png';
							} 
							
							//group details
							/* if(group_pic!=''){
								var group_pic_src = imagepath+group_pic;
							}else{
								
							}  */
							
							var group_pic_src ='/images/org.png';
							
							if(user_id==loggedin){
								$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<span class="pull-right"> <small>~ '+username+' </small></span><br><br><small>'+msgdate+'</small></h4></div></div></div>');
							}else{
								//$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+group_pic_src+'" class="media-object img-circle" style="max-width: 70px;"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br>'+msgdate+'</h4></div></div></div>');
								
								$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<span class="pull-right"> <small>~ '+username+' </small></span><br><br><small>'+msgdate+'</small></h4></div></div></div>');
							} 
							
						});
					}
					if((key=='data') && (val=='')){
						if($conversation_html.find('.message').length==1){
							$(".message").html('No Old Message!');
						}else{
							$conversation_html.prepend('<div class="message"> No Old Message!</div>');
						}
					}
					//}
					
				});
			}
		});
	}
	//get old messages of friend
	function get_message(friend_id,imagepath,last_id){
		var headerform = document.getElementById('headerform');
		var frndid=friend_id;
		$.ajax({
			url: '/chat/get_message',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				friend_id: friend_id,
				last_id: last_id,
				limit: 50,
			},
			beforeSend: function() {
				$conversation_html =$("#conversation");
				if($conversation_html.find('.message').length==1){
					$(".message").html('<img src="/images/ajax-loader.gif">');
				}else{
					$conversation_html.prepend('<div class="message" id="message">  </div>');
				}
			},
			success:function(data){
				last_id++;
				var butto ='<a href="javascript:void(0);"class="btn btn-default loadoldmessages" id="loadoldmessages-'+friend_id+'-'+last_id+'"> Load Old.. </a>';
				$("#loadoldhtm").html(butto);
				$conversation_html =$("#conversation");
				//$conversation_html.html('');
				var friendimage = $('#friendsrc-'+frndid+' img').attr('src');
				var userimage = $('#userpic').val();
				$.each(data, function (key, val) {
					/* alert(key);
					alert(val); */
					if((key=='data') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var first_name =this.first_name;
							var last_name = this.last_name;
							var user_pic =this.user_pic;
							var type =this.type;
							var user_id =this.user_id;
							var friend_id =this.friend_id;
							var message =this.message;
							var image =this.image;
							var msg_time =this.msg_time;
							var chat_id =this.chat_id;
							var status =this.status;
							var unread =this.unread;
							//var group_id =this.group_id;
							
							//delete status
							var deleted_by_sender =this.deleted_by_sender;
							var deleted_by_reciever =this.deleted_by_reciever;
							
							//clear status
							var clear_by_sender =this.clear_by_sender;
							var clear_by_reciever =this.clear_by_reciever;
							if(userimage!=''){
								if(userimage.indexOf('http') > -1) { 
									var picsrc = userimage;
								}else{ 
									var picsrc = imagepath+userimage;
								}
							}else{
								var picsrc ='/images/user.png';
							} 
							//today 
							var today = new Date();
							var newtoday = today.toString('dd-MM-y');
							var todayparts = newtoday.split(" ");
							var TDay = todayparts[2]
							var TMonth = todayparts[1];
							var TYear = todayparts[3];
							var Ttime24 = todayparts[4];
							var Ttime12 = tConvert (Ttime24); 
							//SPLIT msg_time 
							var date = new Date(msg_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24); 
							if((TYear==Year)&&(TMonth==Month)&&(TDay==Day)){
								var msgdate =time12;
							}else{
								var msgdate = Day+' '+Month+' '+Year+' '+time12;
							}
							//var msgdate =time12;
							if(user_id==frndid){
								$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+friendimage+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br><small>'+msgdate+'</small></h4></div></div></div>');
							}else{
								$conversation_html.prepend('<div class="sender"><div class="media"><div class="pull-right"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br><small>'+msgdate+'</small></h4></div></div></div>');
							}
						});
					} 
					if((key=='data') && (val=='')){
						if($conversation_html.find('.message').length==1){
							$(".message").html('No Old Message!');
						}else{
							$conversation_html.prepend('<div class="message"> No Old Message!</div>');
						}
					}
				});	 
			}
		});
	}
	/*Get Group  Messages of single group */
	function getSingleGroupMessages(group_id,imagepath){
		var headerform = document.getElementById('headerform');
		var loggedin =headerform.user_id.value;
		var groupid=group_id;
		$.ajax({
			//url: '/chat/get_group_message',
			url: '/chat/get_group_new_message',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				group_id: group_id,
			},
			success:function(data){
				var last_id = 1;
				var butto ='<a href="javascript:void(0);"class="btn btn-default loadoldGroupmessages" id="loadoldGroupmessages-'+group_id+'-'+last_id+'"> Load Old.. </a>';
				$("#loadoldhtm").html(butto); 
				$conversation_html =$("#conversation");
				$conversation_html.html('');
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var msg_id =this.msg_id;
							var message =this.message;
							var msg_time =this.msg_time;
							var read_unread =this.read_unread; 
							var group_id =this.group_id; 
							var user_id =this.user_id; 
							var user_pic =this.user_pic; 
							var first_name =this.first_name; 
							var last_name =this.last_name; 
							var username=first_name+' '+last_name;
							//alert(message); 
							//today 
							var today = new Date();
							var newtoday = today.toString('dd-MM-y');
							var todayparts = newtoday.split(" ");
							var TDay = todayparts[2]
							var TMonth = todayparts[1];
							var TYear = todayparts[3];
							var Ttime24 = todayparts[4];
							var Ttime12 = tConvert (Ttime24); 
							//SPLIT msg_time 
							var date = new Date(msg_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24); 
							if((TYear==Year)&&(TMonth==Month)&&(TDay==Day)){
								var msgdate =time12;
							}else{
								var msgdate = Day+' '+Month+' '+Year+' '+time12;
							}
							if(user_pic!=''){
								if(user_pic.indexOf('http') > -1) { 
									var picsrc = this.user_pic;
								}else{ 
									var picsrc = imagepath+user_pic;
								}
							}else{
								var picsrc ='/images/user.png';
							} 
							
							//group details
							/* if(group_pic!=''){
								var group_pic_src = imagepath+group_pic;
							}else{
								
							}  */
							
							var group_pic_src ='/images/org.png';
							
							if(user_id==loggedin){
								$conversation_html.prepend('<div class="sender"><div class="media"><div class="pull-right"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<span class="pull-right"> <small>~ '+username+' </small></span><br><br><small>'+msgdate+'</small></h4></div></div></div>');
							}else{
								$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<span class="pull-right"> <small>~ '+username+' </small></span><br><br><small>'+msgdate+'</small></h4></div></div></div>');
							} 
							
						});
					}
					if((key=='data') && (val=='')){
						$conversation_html.prepend('<div class="message"> No message !</div>');
					}
				});
				//scroll to bottom
				var element = document.getElementById("conversation");
				element.scrollTop = element.scrollHeight+100;
			}
		});
	}
	//get single  messages 
    function getSingleUserMessages(friend_id,imagepath){
		var headerform = document.getElementById('headerform');
		var frndid=friend_id;
		$.ajax({
			url: '/chat/get_new_message',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
				friend_id: friend_id,
			},
			beforeSend: function() {
				//$conversation_html =$("#conversation");
				//$conversation_html.html('');
				//$conversation_html.html('<div class="error" id="message"> <img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data){
				var last_id = 1;
				var butto ='<a href="javascript:void(0);"class="btn btn-default loadoldmessages" id="loadoldmessages-'+friend_id+'-'+last_id+'"> Load Old.. </a>';
				$("#loadoldhtm").html(butto);
				$conversation_html =$("#conversation");
				$conversation_html.html('');
				var friendimage = $('#friendsrc-'+frndid+' img').attr('src');
				var userimage = $('#userpic').val();
				
				//alert(imagess);
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
					    $(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var first_name =this.first_name;
							var last_name = this.last_name;
							var user_pic =this.user_pic;
							var type =this.type;
							var user_id =this.user_id;
							var friend_id =this.friend_id;
							var message =this.message;
							var image =this.image;
							var msg_time =this.msg_time;
							var chat_id =this.chat_id;
							var status =this.status;
							var unread =this.unread;
							//var group_id =this.group_id;
							
							//delete status
							var deleted_by_sender =this.deleted_by_sender;
							var deleted_by_reciever =this.deleted_by_reciever;
							
							//clear status
							var clear_by_sender =this.clear_by_sender;
							var clear_by_reciever =this.clear_by_reciever;
							if(userimage!=''){
								if(userimage.indexOf('http') > -1) { 
									var picsrc = userimage;
								}else{ 
									var picsrc = imagepath+userimage;
								}
							}else{
								var picsrc ='/images/user.png';
							} 
							//today 
							var today = new Date();
							var newtoday = today.toString('dd-MM-y');
							var todayparts = newtoday.split(" ");
							var TDay = todayparts[2]
							var TMonth = todayparts[1];
							var TYear = todayparts[3];
							var Ttime24 = todayparts[4];
							var Ttime12 = tConvert (Ttime24); 
							//SPLIT msg_time 
							var date = new Date(msg_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24); 
							if((TYear==Year)&&(TMonth==Month)&&(TDay==Day)){
								var msgdate =time12;
							}else{
								var msgdate = Day+' '+Month+' '+Year+' '+time12;
							}
							//var msgdate =time12;
							if(user_id==frndid){
								$conversation_html.prepend('<div class="reciever"><div class="media"><div class="media-left"><img src="'+friendimage+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br><small>'+msgdate+'</small></h4></div></div></div>');
							}else{
								$conversation_html.prepend('<div class="sender"><div class="media"><div class="pull-right"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;height:70px"></div><div class="media-body pt-20"><h4 class="media-heading m-0">'+message+'<br><br><small>'+msgdate+'</small></h4></div></div></div>');
									
							}
						}); 
					}
					if((key=='data') && (val=='')){
						$conversation_html.prepend('<div class="message"> No message !</div>');
					}
				});
				var element = document.getElementById("conversation");
				element.scrollTop = element.scrollHeight+100;
			}
		});
		var element = document.getElementById("conversation");
        element.scrollTop = element.scrollHeight+100;
	}
	function get_user_message(imagepath){
		var headerform = document.getElementById('headerform');
		var friendsearch =$("#friendsearch").val();
		$.ajax({
			url: '/chat/get_user_message',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value,
			},
			beforeSend: function() {
				$chat_all_users_html =$("#chat_all_users");
				$chat_all_users_html.html('<div class="error" id="message"> <img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data){
				$chat_all_users_html =$("#chat_all_users");
				$chat_all_users_html.html('');
				var i=1;
				var selectid;
				//var count = data.length;
				//alert(count);
				
				/*for emoji */
					var emoji = new EmojiConvertor();
					emoji.img_set = 'apple';
					for (var i in emoji.img_sets){
						emoji.img_sets[i].path = '/build/emoji-data/img-'+i+'-64/';
						emoji.img_sets[i].sheet = '/build/emoji-data/sheet_'+i+'_64.png';
					} 
					var auto_mode = emoji.replace_mode;
					emoji.replace_mode = auto_mode;
					emoji.text_mode = false;
					//var messagett = emoji.replace_unified("dsfdsfdsfdsfsdf\ud83d\ude04\ud83d\ude04frgfgfgf");
					//alert(messagett);
					
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						var i=1;
						var count = val.length;
						//alert(count);
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var first_name =this.first_name;
							var last_name = this.last_name;
							var user_pic =this.user_pic;
							var type =this.type;
							var friend_id =this.friend_id;
							var message =this.message;
						    //message = emoji.replace_unified(message);
							//var message1 =this.message;
							//var message = emoji.replace_unified("+'this.message'+");
							var image =this.image;
							var msg_time =this.msg_time;
							var chat_id =this.chat_id;
							var status =this.status;
							var unread =this.unread;
							
							if(user_pic!=''){
								if(user_pic.indexOf('http') > -1) { 
									var picsrc = this.user_pic;
								}else{ 
									var picsrc = imagepath+user_pic;
								}
							}else{
								var picsrc ='/images/user.png';
							}
							
							//group details
							
							var group_id =this.group_id;
							var group_name =this.group_name;
							var group_pic =this.group_pic;
							if(group_pic!=''){
								var group_pic_src = imagepath+group_pic;
							}else{
								var group_pic_src ='/images/org.png';
							}
							
							
							var friend_name = first_name +' '+last_name;
							
							//today 
							var today = new Date();
							var newtoday = today.toString('dd-MM-y');
							var todayparts = newtoday.split(" ");
							var TDay = todayparts[2]
							var TMonth = todayparts[1];
							var TYear = todayparts[3];
							var Ttime24 = todayparts[4];
							var Ttime12 = tConvert (Ttime24); 
							//SPLIT msg_time 
							var date = new Date(msg_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							var time24 = parts[4];
							var time12 = tConvert (time24); 
							if((TYear==Year)&&(TMonth==Month)&&(TDay==Day)){
								var msgdate =time12;
							}else{
								var msgdate = Day+' '+Month+' '+Year;
							}
							// 
							 if(unread<1){
								 var unreadhtml ='';
							 }else{
								 var unreadhtml='<div class="msg-count"><p>'+unread+'</p></div>';
							 }
							var chatsel_id = $("#chatsel_id").val();
							// if Group 
						    if(group_id !=0){
								if(chatsel_id==''){
									if(i==count){
										var selectid =$("#chatsel_id").val(group_id);
									}
									var chatsel_id = $("#chatsel_id").val();
								}
								if(friendsearch!=''){
									if(group_name.indexOf(friendsearch) > -1) { 
										/* $chat_all_users_html.append('<div class="media msgs" id="active_chat_group_friend-'+group_id+'"><div class="media-left media-middle" id="friendsrc-'+group_id+'"><a href="/chat/group-info/'+group_id+'"><img src="'+group_pic_src+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singleGroupmessages" id="singleGroupmessages-'+group_id+'-'+group_name+'"><h4 class="media-heading mb-10"><b>'+group_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>'); */
										
										$chat_all_users_html.prepend('<div class="media msgs" id="active_chat_group_friend-'+group_id+'"><div class="media-left media-middle" id="friendsrc-'+group_id+'"><a href="/chat/group-info/'+group_id+'"><img src="'+group_pic_src+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singleGroupmessages" id="singleGroupmessages-'+group_id+'-'+group_name+'"><h4 class="media-heading mb-10"><b>'+group_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>');
									}
									
								}else{
									/* $chat_all_users_html.append('<div class="media msgs" id="active_chat_group_friend-'+group_id+'"><div class="media-left media-middle" id="friendsrc-'+group_id+'"><a href="/chat/group-info/'+group_id+'"><img src="'+group_pic_src+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singleGroupmessages" id="singleGroupmessages-'+group_id+'-'+group_name+'"><h4 class="media-heading mb-10"><b>'+group_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>'); */
									
									$chat_all_users_html.prepend('<div class="media msgs" id="active_chat_group_friend-'+group_id+'"><div class="media-left media-middle" id="friendsrc-'+group_id+'"><a href="/chat/group-info/'+group_id+'"><img src="'+group_pic_src+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singleGroupmessages" id="singleGroupmessages-'+group_id+'-'+group_name+'"><h4 class="media-heading mb-10"><b>'+group_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>');
								}
								message
								//select group
								
								if(chatsel_id==group_id){
									var group_name = group_name;
									$("#chat_group_id").val(group_id);
									$("#chatperson").html('');
									$("#chatperson").append(group_name);
									$('div[id ^= "active_chat_group_friend-"]').removeClass('activechat');
									$("#active_chat_group_friend-"+group_id).addClass('activechat');
									var dropdown='<li><a href="javascript:void(0)" id="clear_chat_group">Clear Chat</a></li><li><a href="javascript:void(0)" id="exit_chat_group">Exit Group </a></li> <li><a href="/chat/group-info/'+group_id+'">Group Info</a></li> ';
									$("#settingdropdown").html('');
									$("#settingdropdown").html(dropdown);
								    getSingleGroupMessages(group_id,imagepath); 
								}
								
							}else{
								if(chatsel_id==''){
									if(i==count){
										var selectid =$("#chatsel_id").val(friend_id);
									}
									chatsel_id = $("#chatsel_id").val();
								}
								
								//if user is n
								if(friendsearch!=''){
									if(first_name.indexOf(friendsearch) > -1) { 
										/* $chat_all_users_html.append('<div class="media msgs" id="active_chat_group_friend-'+friend_id+'"><div class="media-left media-middle" id="friendsrc-'+friend_id+'"><a href="/user/viewprofile?viewid='+friend_id+'"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singlefriendmessages" id="singlefriendmessages-'+friend_id+'-'+friend_name+'"><h4 class="media-heading mb-10"><b>'+first_name +' '+last_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>'); */
										
										$chat_all_users_html.prepend('<div class="media msgs" id="active_chat_group_friend-'+friend_id+'"><div class="media-left media-middle" id="friendsrc-'+friend_id+'"><a href="/user/viewprofile?viewid='+friend_id+'"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singlefriendmessages" id="singlefriendmessages-'+friend_id+'-'+friend_name+'"><h4 class="media-heading mb-10"><b>'+first_name +' '+last_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>');
									}
								}else{
									/* $chat_all_users_html.append('<div class="media msgs" id="active_chat_group_friend-'+friend_id+'"><div class="media-left media-middle" id="friendsrc-'+friend_id+'"><a href="/user/viewprofile?viewid='+friend_id+'"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singlefriendmessages" id="singlefriendmessages-'+friend_id+'-'+friend_name+'"><h4 class="media-heading mb-10"><b>'+first_name +' '+last_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>'); */
									$chat_all_users_html.prepend('<div class="media msgs" id="active_chat_group_friend-'+friend_id+'"><div class="media-left media-middle" id="friendsrc-'+friend_id+'"><a href="/user/viewprofile?viewid='+friend_id+'"><img src="'+picsrc+'" class="media-object img-circle" style="width:70px;"></a></div><div class="media-body pt-10 pb-10 singlefriendmessages" id="singlefriendmessages-'+friend_id+'-'+friend_name+'"><h4 class="media-heading mb-10"><b>'+first_name +' '+last_name+'</b></h4><p class="message-excerpt">'+message+'</p></div><div class="time"><p>'+msgdate+'</p></div>'+unreadhtml+'</div>');
								}
								//select chat 
								if(chatsel_id==friend_id){
									$("#chatperson_friend_id").val(friend_id);
									$("#chat_group_id").val('');
									$("#chatperson").html('');
									$("#chatperson").append(friend_name);
									var dropdown='<li><a href="javascript:void(0)" id="clear_chat_onetoone">Clear Chat</a></li>';
									$("#settingdropdown").html('');
									$("#settingdropdown").html(dropdown);
									$('div[id ^= "active_chat_group_friend-"]').removeClass('activechat');
									$("#active_chat_group_friend-"+friend_id).addClass('activechat');
									getSingleUserMessages(friend_id,imagepath);
								}
							}
							i++;
						});
					}
				});
			}
		});
	} 
	
	function handleError(error) {
	   if (error) {
		alert(error.message);
	  } 
	}
	function initializeSession(apiKey,sessionId,token) {
	  var session = OT.initSession(apiKey, sessionId);

	  // Subscribe to a newly created stream
	   session.on('streamCreated', function(event) {
			session.subscribe(event.stream, 'subscriber', {
				insertMode: 'append',
				width: '100%',
				height: '100%'
			});
	   });

	  // Create a publisher
		var publisher = OT.initPublisher('publisher', {
			insertMode: 'append',
			width: '100%',
			height: '100%'
		});
		
		
         //added for medi support 
	    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||  navigator.mozGetUserMedia;
		if (navigator.getUserMedia) {
		   navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 } },
			  function(stream) {
				 var video = document.querySelector('videos');
				 video.srcObject = stream;
				 video.onloadedmetadata = function(e) {
				   video.play();
				 };
			  },
			  function(err) {
				 console.log("The following error occurred: " + err.name);
			  }
		   );
		} else {
		   console.log("getUserMedia not supported");
		}
	   /*  var video = document.querySelector('videos');
		navigator.mediaDevices.getUserMedia({video:true}).then(function(mediaStream){
			window.stream = mediaStream;
			video.src = URL.createObjectURL(mediaStream);
			video.play();
		}); */
	  // Connect to the session
	  session.connect(token, function(error) {
		// If the connection is successful, initialize a publisher and publish to the session
		if (error) {
		  handleError(error);
		} else {
		  session.publish(publisher, handleError);
		}
	  });
	}
	// function  initiate  video 
	function InitVideo(apiKey,sessionId,token){
		alert(apiKey);
		alert(sessionId);
		alert(token);
		var session = OT.initSession(apiKey, sessionId);
		// Initialize a Publisher, and place it into the element with id="publisher"
		var publisher = OT.initPublisher('publisher');

		// Attach event handlers
		session.on({

		  // This function runs when session.connect() asynchronously completes
		  sessionConnected: function(event) {
			// Publish the publisher we initialzed earlier (this will trigger 'streamCreated' on other
			// clients)
			session.publish(publisher);
		  },

		  // This function runs when another client publishes a stream (eg. session.publish())
		  streamCreated: function(event) {
			// Create a container for a new Subscriber, assign it an id using the streamId, put it inside
			// the element with id="subscribers"
			var subContainer = document.createElement('div');
			subContainer.id = 'stream-' + event.stream.streamId;
			document.getElementById('subscribers').appendChild(subContainer);

			// Subscribe to the stream that caused this event, put it inside the container we just made
			session.subscribe(event.stream, subContainer);
		  }

		});
		// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
		session.connect(token);
	}
	//scroll
	function scrollSmoothToBottom (id) {
	   var div = document.getElementById(id);
	   $('#' + id).animate({
		  scrollTop: div.scrollHeight - div.clientHeight
	   }, 500);
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
	//preview  image 
	function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function(e) {
		  //$('#previewimage').empty().html('<img id="blah" src="'+ e.target.result+'"width="70" height="70" alt="your image" />')
			
		  $('#blah').attr('src', e.target.result);
		}

		reader.readAsDataURL(input.files[0]);
	  }
	}
	function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	} 
	//init on document ready
	$(document).ready(init);
})();
