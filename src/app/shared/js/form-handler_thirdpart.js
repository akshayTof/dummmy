(function () {
	function init(){
		var imagepath = $("#uploadspath").val();
		var profilepage = location.pathname;
		if((profilepage=='/user/favbrands') ||(profilepage=='/user/favevents')||(profilepage=='/user/mysizes') ||(profilepage=='/user/favfans') ||(profilepage=='/user/favteams')){
			Getuserdetails(profilepage,imagepath);
		}
		/*IN brand page */
		if(profilepage=='/user/favbrands'){
			var searchstring= $("#brandsearch").val();
			setTimeout(function(){ 
			   Getfavouritebands(imagepath,searchstring);
			}, 2000);
			
		}
		
		//brand search on keyup
		$("#brandsearch").keyup(function(){
			var searchstring= $("#brandsearch").val();
			Getfavouritebands(imagepath,searchstring);
		});
		//brand search on click 
		 $("#brandsearchbutton").click(function(){
			var searchstring= $("#brandsearch").val();
			Getfavouritebands(imagepath,searchstring);
		});
		
		/*IN fav evemt page */
		if(profilepage=='/user/favevents'){
			var searchstring_event= $("#faveventsearch").val();
			Getfavevents(imagepath,searchstring_event);
		}
		
		//event search on keyup 
		$("#faveventsearch").keyup(function(){
			var searchstring_event= $("#faveventsearch").val();
			Getfavevents(imagepath,searchstring_event);
		});
		
		// fav event button 
		$("#fav_event_earchbutton").click(function(){
			var searchstring_event= $("#faveventsearch").val();
			Getfavevents(imagepath,searchstring_event);
		});
		 
		//fav team  remove
		$(document).on("click", ".fanteamremove" , function() {
			var id =$(this).attr('id');
			var fan_team_id = id.split('-');
			var team_id = fan_team_id[1];
			//alert(team_id);
		    Removefavteam(team_id);
        });
		
		//fav add team 
		$(document).on("click", ".fanteamadd" , function() {
			var id =$(this).attr('id');
			var fan_team_id = id.split('-');
			var team_id = fan_team_id[1];
		    addfavteam(team_id);
        });
		//search activity in fava fans and fav teams 
		$("#searchfavteambutton").click(function(){ 
            var  activity_id = $("#teamactivity_id").val();		
			Getteambyactivity(activity_id,imagepath); 
		});
		$("#searchfavteam").keyup(function(){ 
            var activity_id = $("#teamactivity_id").val();		
			Getteambyactivity(activity_id,imagepath); 
		});
		//get fav team from activity
		$(document).on("click", ".favteamactivityrow" , function() {
			var id =$(this).attr('id');
			var act_id = id.split('-');
			var activity_id = act_id[1];
			$("#teamactivity_id").val(activity_id);
			Getteambyactivity(activity_id,imagepath);
        });
		
		//add fav fans
		$(document).on("click", ".fanuseradd" , function() {
			var id =$(this).attr('id');
			var fan_user_id = id.split('-');
			var fan_id = fan_user_id[1];
		    addfan(fan_id);
        });
		//remove fan from  fav list
		$(document).on("click", ".fanuserremove" , function() {
			var id =$(this).attr('id');
			var fan_user_id = id.split('-');
			var fan_id = fan_user_id[1];
		    removefan(fan_id);
        });
		//search fav fans 
		//search activity in fava fans and fav teams 
		$("#searchfavfanbutton").click(function(){ 
            var  activity_id = $("#favactivity_id").val();		
			Getfavfans(activity_id,imagepath); 
		});
		$("#searchfavfan").keyup(function(){ 
            var activity_id = $("#favactivity_id").val();		
			Getfavfans(activity_id,imagepath); 
		});
		// get fav fans from activity
		$(document).on("click", ".favactivityrow" , function() {
			var id =$(this).attr('id');
			var act_id = id.split('-');
			var activity_id = act_id[1];
			$("#favactivity_id").val(activity_id);
			Getfavfans(activity_id,imagepath);
        });
		//search  favactivity 
		  $("#brandsearch").keyup(function(){
			var searchstring= $("#brandsearch").val();
			Getfavouritebands(imagepath,searchstring);
		});
		//add fav brands
		$(document).on("click", ".addfavbrand" , function() {
			var id =$(this).attr('id');
			var brand_id = id.split('-');
			var fav_brand_id = brand_id[1];
			addfavbrand(fav_brand_id);
        });
		$(document).on("click", ".removefavbrand" , function() {
			var id =$(this).attr('id');
			var brand_id = id.split('-');
			var fav_brand_id = brand_id[1];
			removefavbrand(fav_brand_id);
        });
		$(document).on("click", ".addfavevent" , function() {
			var id =$(this).attr('id');
			var event_id = id.split('-');
			var fav_event_id = event_id[1];
			addfavevent(fav_event_id);
        });
		$(document).on("click", ".removefavevent" , function() {
			var id =$(this).attr('id');
			var event_id = id.split('-');
			var fav_event_id = event_id[1];
			removefavevent(fav_event_id);
        });
		
		//search activity
	}
	/*#  Update Fav Team # */
	function addfavteam(team_id){
		//alert(team_id);
		var favteamform = document.getElementById('favteamform');
		var favourite_team= favteamform.favourite_team_id.value;
		var favourite_team_id = favourite_team.split(',');
		var favteamid=[];
		$.each(favourite_team_id, function (index, value) {
			favteamid.push(value);
		});
		favteamid.push(team_id); 
		$("#favourite_team_id").val(favteamid);
		var favourite_teamg = favteamform.favourite_team_id.value;
		//lert(favourite_fansg);
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favteamform.user_id.value,
				favourite_team_id: favourite_teamg
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#fanteamremove-"+team_id).toggleClass("removerow");
						$("#notavailrow-"+team_id).toggleClass("removerow");
					}
				});
			}
		});
	} 
	function Removefavteam(team_id){
		//alert(team_id);
		var favteamform = document.getElementById('favteamform');
		var favourite_team= favteamform.favourite_team_id.value;
		//alert(favourite_team);
		var favourite_team_id = favourite_team.split(',');
		var favteamid=[];
		$.each(favourite_team_id, function (index, value) {
			if(team_id==value){
				
			}else{
				favteamid.push(value);
			}
		});
		if(favteamid==''){
			$("#favourite_team_id").val(0);
		}else{
			$("#favourite_team_id").val(favteamid);
		}
		//favteamid.push(team_id); 
		//$("#favourite_team_id").val(favteamid);
		var favourite_teamg = favteamform.favourite_team_id.value;
		//alert(favourite_teamg);
		//lert(favourite_fansg);
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favteamform.user_id.value,
				favourite_team_id: favourite_teamg
			},
			success:function(data){
				//alert("success");
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#fanteamremove-"+team_id).toggleClass("removerow");
						$("#notavailrow-"+team_id).toggleClass("removerow");
					}
				});
			}
		});
	}
	/*#### Get Team By Activity ###*/
	function Getteambyactivity(activity_id,imagepath){
		var favteamform = document.getElementById('favteamform');
		var searchstring= $("#searchfavteam").val();
		searchstring =searchstring.toLowerCase();
		searchstring = $.trim(searchstring);
		var search_status=0;
		$.ajax({
			url: '/user/get_teams_by_activity',
			type: 'GET',
			data: {
				user_id: favteamform.user_id.value,
				activity_id: activity_id
			}, 
			beforeSend:function(){
				$("#favteamsdiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data){ 
			    var $favactivity_html = $('#favactivity');
				//$favactivity_html.html('');
				var $selectedmember_html = $('#selectedmember');
				//$selectedmember_html.html('');
				
				var $favteamsdiv_html = $('#favteamsdiv');
				var $allteamsdiv_html = $('#allteamsdiv');
				$favteamsdiv_html.html('');
				$allteamsdiv_html.html(''); 
				
				//hide the activity
				$favactivity_html.addClass('removerow');
				$selectedmember_html.addClass('removerow');
				
				//hide  activity searchrow
				$("#activitysearchrow").addClass('removerow');
				
				//display fav fans search row
				$("#favteams_searchrow").removeClass('removerow');
				
                //drawline
				$("#linebetweenteams").removeClass('removerow');
				
				//alert("dfdfdfd");
				//var selectedfan =[];
				$.each(data, function (key, val) {
					//alert(key);
					//alert(JSON.stringify(val));
					if((key=='all_team') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var team_id = this.team_id;
							var team_name =this.team_name;
							var activity_name =this.activity_name;
							var league_name =this.league_name;
							var team_image =this.team_image;
							var selected= this.selected;
							
							/*added for   new*/
							if(selected== 0){
								var classremove ='removerow';
								var classadd='';
							}else{
								var classremove ='';
								var classadd='removerow';
								//eventids.push(fav_event_id);
								//selectedfan.push(team_id);
							}
							if(team_image!=''){
								var fav_team_image_url =imagepath+team_image; 
							}
							
							if(searchstring!=''){
								var team_name_str =team_name.toLowerCase();
								if(team_name_str.indexOf(searchstring)!= -1){
									search_status=1;
									$favteamsdiv_html.append('<button class="accordion days fanteamremove '+classremove+'" id="fanteamremove-'+team_id+'"> <img src="'+fav_team_image_url+'" width="100" height="auto"> '+team_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+team_id+'">Done</a></span></button>');
								
									$allteamsdiv_html.append('<li id="notavailrow-'+team_id+'" class="'+classadd+'"><img src="'+fav_team_image_url+'" width="100" height="auto"> '+team_name+' <span class="pull-right fanteamadd" id="fanteamadd-'+team_id+'"><i class="fa fa-plus-circle green"></i> </span></li>');
						
								}
							}else{ 
								$favteamsdiv_html.append('<button class="accordion days fanteamremove '+classremove+'" id="fanteamremove-'+team_id+'"> <img src="'+fav_team_image_url+'" width="100" height="auto"> '+team_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+team_id+'">Done</a></span></button>');
								
								$allteamsdiv_html.append('<li id="notavailrow-'+team_id+'" class="'+classadd+'"><img src="'+fav_team_image_url+'" width="100" height="auto"> '+team_name+' <span class="pull-right fanteamadd" id="fanteamadd-'+team_id+'"><i class="fa fa-plus-circle green"></i> </span></li>');
							}
							/* if(selected==0){
								$favactivity_html.append('<div class="media mb-20" id="fanteamrow-'+team_id+'"><div class="media-left media-middle pr-30 pl-30"><span class="fanteamadd" id="plusicon-'+team_id+'"><div class="action action-left"><i class="fa fa-plus-circle green"></i></div></span><span class="fanteamremove removerow" id="minusicon-'+team_id+'"><div class="action action-left"><i class="fa fa-minus-circle red"></i></div></span><img src="/uploads/'+team_image+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body media-middle"><h3 class="media-heading">'+team_name+'</h3></div></div>');
								//$favactivity_html.append('<span><i class="fa fa-minus-circle green"></i><span class="media-heading">'+fan_name+'</span>');
							}else{
								//selectedfan.push(fan_id);
								$selectedmember_html.append('<div class="media mb-20" id="fanteamrow-'+team_id+'"><div class="media-left media-middle pr-30 pl-30"><span class="fanteamadd removerow" id="plusicon-'+team_id+'"><div class="action action-left"><i class="fa fa-plus-circle green"></i></div></span><span class="fanteamremove" id="minusicon-'+team_id+'"><div class="action action-left"><i class="fa fa-minus-circle red"></i></div></span><img src="/uploads/'+team_image+'" class="media-object img-circle" style="width:100px;"></div><div class="media-body media-middle"><h3 class="media-heading">'+team_name+'</h3></div></div>');
								
								//$favactivity_html.append('<span><i class="fa fa-plus-circle green"></i><span class="media-heading">'+fan_name+'</span>');
							} */
						});
					    
					} else if((key=='all_team') && (val=='')) {
						$allteamsdiv_html.append('<div class="message">No fav team found !</div>');
					}
				});
				//display empty message  
				 if((search_status==0) &&(searchstring!='')){
					 $favactivity_html.append('<div class="message"> No fav team  Found ! </div>')
				 }
			}
		});
	}
	/*#  Update Fan # */
	function addfan(fan_id){
		var favfanform = document.getElementById('favfanform');
		var favourite_fan = favfanform.favourite_fans.value;
		var favourite_fan_id = favourite_fan.split(',');
		var favfanid=[];
		$.each(favourite_fan_id, function (index, value) {
			favfanid.push(value);
		});
		favfanid.push(fan_id);
		$("#favourite_fans").val(favfanid);
		var favourite_fansg = favfanform.favourite_fans.value;
		//lert(favourite_fansg);
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favfanform.user_id.value,
				favourite_fans: favourite_fansg
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						//$("fanuser-"+fan_id).toggleClass("removerow");
						//$("fanuser-"+fan_id).toggleClass("removerow");
						//$("#minusicon-"+fan_id).toggleClass("removerow");
						//$("#plusicon-"+fan_id).toggleClass("removerow");
						$("#fanuserremove-"+fan_id).toggleClass("removerow");
						$("#notavailrow-"+fan_id).toggleClass("removerow");
					}
				});
			}
		});
	}
	/*##### Remove fan  #### */
	function removefan(fan_id){
		var favfanform = document.getElementById('favfanform');
		var favourite_fan = favfanform.favourite_fans.value;
		var favourite_fan_id = favourite_fan.split(',');
		var favfanid=[];
		$.each(favourite_fan_id, function (index, value) {
			if(fan_id==value){
				
			}else{
				favfanid.push(value);
			}
			
		});
		if(favfanid==''){
			$("#favourite_fans").val(0);
		}else{
			$("#favourite_fans").val(favfanid);
		}
		//$("#favourite_fans").val(favfanid);
		var favourite_fansg = favfanform.favourite_fans.value;
		//lert(favourite_fansg);
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favfanform.user_id.value,
				favourite_fans: favourite_fansg
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						//$("#minusicon-"+fan_id).toggleClass("removerow");
						//$("#plusicon-"+fan_id).toggleClass("removerow");
						$("#fanuserremove-"+fan_id).toggleClass("removerow");
						$("#notavailrow-"+fan_id).toggleClass("removerow");
					}
				});
			}
		});
	}
	/*############### Get Fav  Fans  ####################*/
	function Getfavfans(activity_id,imagepath){
		var favfanform = document.getElementById('favfanform');
		var searchstring= $("#searchfavfan").val();
		searchstring =searchstring.toLowerCase();
		searchstring = $.trim(searchstring);
		var search_status =0;
		$.ajax({
			url: '/user/get_fans_by_activity',
			type: 'GET',
			data: {
				user_id: favfanform.user_id.value,
				activity_id: activity_id
			},
			beforeSend:function(){
				$("#favfansdiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data){
				var $favactivity_html = $('#favactivity');
				//$favactivity_html.html('');
				var $selectedmember_html = $('#selectedmember');
				//$selectedmember_html.html('');
				
				var $favfansdiv_html = $('#favfansdiv');
				var $allfansdiv_html = $('#allfansdiv');
				$favfansdiv_html.html('');
				$allfansdiv_html.html(''); 
				
				//hide the activity
				$favactivity_html.addClass('removerow');
				$selectedmember_html.addClass('removerow');
				
				//hide  activity searchrow
				$("#activitysearchrow").addClass('removerow');
				
				//display fav fans search row
				$("#favfans_searchrow").removeClass('removerow');
				
				//draw line 
				$("#linebetweenfans").removeClass('removerow');
				
				
				var selectedfan =[];
				$.each(data, function (key, val) {
					if((key=='all_fan') && (val!='')){
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var fan_id= this.fan_id;
							var fan_name= this.fan_name;
							var fan_status= this.fan_status;
							var fan_image= this.fan_image;
							var selected= this.selected;
							
							/*added for   new*/
							if(selected== 0){
								var classremove ='removerow';
								var classadd='';
							}else{
								var classremove ='';
								var classadd='removerow';
								//eventids.push(fav_event_id);
								selectedfan.push(fan_id);
							}
							if(fan_image!=''){
								var fav_fan_image_url =imagepath+fan_image; 
							}
							if(searchstring!=''){
									var fan_name_str =fan_name.toLowerCase();
									if(fan_name_str.indexOf(searchstring)!= -1){
										search_status=1;
										$favfansdiv_html.append('<button class="accordion days fanuserremove '+classremove+'" id="fanuserremove-'+fan_id+'"> <img src="'+fav_fan_image_url+'" width="100" height="auto"> '+fan_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+fan_id+'">Done</a></span></button>');
								
										$allfansdiv_html.append('<li id="notavailrow-'+fan_id+'" class="'+classadd+'"><img src="'+fav_fan_image_url+'" width="100" height="auto"> '+fan_name+' <span class="pull-right fanuseradd" id="fanuseradd-'+fan_id+'"><i class="fa fa-plus-circle green"></i> </span></li>');  
							
									}
							}else{
								$favfansdiv_html.append('<button class="accordion days fanuserremove '+classremove+'" id="fanuserremove-'+fan_id+'"> <img src="'+fav_fan_image_url+'" width="100" height="auto"> '+fan_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+fan_id+'">Done</a></span></button>');
								
								$allfansdiv_html.append('<li id="notavailrow-'+fan_id+'" class="'+classadd+'"><img src="'+fav_fan_image_url+'" width="100" height="auto"> '+fan_name+' <span class="pull-right fanuseradd" id="fanuseradd-'+fan_id+'"><i class="fa fa-plus-circle green"></i> </span></li>');
							}
							  
							
							/* if(selected==0){
								$favactivity_html.append('<div class="media mb-20" id="fanuserrow-'+fan_id+'"><div class="media-left media-middle pr-30 pl-30"><span class="fanuseradd" id="plusicon-'+fan_id+'"><div class="action action-left"><i class="fa fa-plus-circle green"></i></div></span><span class="fanuserremove removerow" id="minusicon-'+fan_id+'"><div class="action action-left"><i class="fa fa-minus-circle red"></i></div></span><img src="/images/user.png" class="media-object img-circle" style="width:100px;"></div><div class="media-body media-middle"><h3 class="media-heading">'+fan_name+'</h3></div></div>');
							}else{
								selectedfan.push(fan_id);
								$selectedmember_html.append('<div class="media mb-20" id="fanuserrow-'+fan_id+'"><div class="media-left media-middle pr-30 pl-30"><span class="fanuseradd removerow" id="plusicon-'+fan_id+'"> <div class="action action-left"><i class="fa fa-plus-circle green"></i></div></span><span class="fanuserremove" id="minusicon-'+fan_id+'"><div class="action action-left"><i class="fa fa-minus-circle red"></i></div></span><img src="/images/user.png" class="media-object img-circle" style="width:100px;"></div><div class="media-body media-middle"><h3 class="media-heading">'+fan_name+'</h3></div></div>');
								
							} */
							
						});
					}else if((key=='all_fan') && (val=='')){
						$allfansdiv_html.append('<div class="message">No fav fan found !</div>');
					}
				});
			}
		}); 
		
	} 
	 /*######## Remove FAv Brand  ########*/
	function removefavbrand(fav_brand_id){
		var favbrandform = document.getElementById('favbrandform');
		var favourite_brand = favbrandform.favourite_brand_id.value;
		var favourite_brand_id = favourite_brand.split(',');
		var brandsids=[];
		$.each(favourite_brand_id, function (index, value) {
			if(fav_brand_id==value){
				
			}else{
				brandsids.push(value);
			}
		});
		if(brandsids==''){
			$("#favourite_brand_id").val(0);
		}else{
			$("#favourite_brand_id").val(brandsids);
		}

		//$("#favourite_brand_id").val(brandsids);
		var favourite_brandsag = favbrandform.favourite_brand_id.value;
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favbrandform.user_id.value,
				favourite_brand_id: favourite_brandsag
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#notavailrow-"+fav_brand_id).toggleClass("removerow");
						$("#button-"+fav_brand_id).toggleClass("removerow");
					}
				});
			}
		});
	}
    /*######## Add FAv Brand  ########*/
	function addfavbrand(fav_brand_id){
		var favbrandform = document.getElementById('favbrandform');
		var favourite_brand = favbrandform.favourite_brand_id.value;
		var favourite_brand_id = favourite_brand.split(',');
		var brandsids=[];
		$.each(favourite_brand_id, function (index, value) {
			brandsids.push(value);
		});
		brandsids.push(fav_brand_id);
		$("#favourite_brand_id").val(brandsids);
		var favourite_brandsag = favbrandform.favourite_brand_id.value;
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: favbrandform.user_id.value,
				favourite_brand_id: favourite_brandsag
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#notavailrow-"+fav_brand_id).toggleClass("removerow");
						$("#button-"+fav_brand_id).toggleClass("removerow");
					}
				});
			}
		});
	}
	/*############# Remove Fav events *##############*/
	function removefavevent(fav_event_id){
		var faveventsform = document.getElementById('faveventsform');
		var favourite_events = faveventsform.favourite_events.value;
		var favourite_events_id = favourite_events.split(',');
		var eventids=[];
		$.each(favourite_events_id, function (index, value) {
			if(fav_event_id==value){
			}else{
				eventids.push(value);
			}
		});
		if(eventids==''){
			$("#favourite_events").val(0);
		}else{
			$("#favourite_events").val(eventids);
		}
		
		var favourite_eventsag = faveventsform.favourite_events.value;
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: faveventsform.user_id.value,
				favourite_events: favourite_eventsag
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#notavailrow-"+fav_event_id).toggleClass("removerow");
						$("#button-"+fav_event_id).toggleClass("removerow");
					}
				});
			}
		});
	}
	/*###########  add fav events #########*/
	function addfavevent(fav_event_id){
		var faveventsform = document.getElementById('faveventsform');
		var favourite_events = faveventsform.favourite_events.value;
		var favourite_events_id = favourite_events.split(',');
		var eventids=[];
		$.each(favourite_events_id, function (index, value) {
			eventids.push(value);
		});
		eventids.push(fav_event_id);
		$("#favourite_events").val(eventids);
		var favourite_eventsag = faveventsform.favourite_events.value;
		$.ajax({
			url: '/user/update_user_fav',
			type: 'POST',
			data: {
				user_id: faveventsform.user_id.value,
				favourite_events: favourite_eventsag
			},
			success:function(data){
				$.each(data, function (key, val) {
					if((key=='success') && (val==1)){
						$("#notavailrow-"+fav_event_id).toggleClass("removerow");
						$("#button-"+fav_event_id).toggleClass("removerow");
					}
				});
			}
		});
		
	} 
     /*############### events  #############*/
	function Getfavevents(imagepath,searchstring_event){ 
	     searchstring_event =searchstring_event.toLowerCase();
		 searchstring_event = $.trim(searchstring_event);
		 var search_status =0;
		var faveventsform = document.getElementById('faveventsform');
		$.ajax({
			url: '/user/get_events',
			type: 'GET',
			data: {
				user_id: faveventsform.user_id.value
			},
			beforeSend:function(){
				$("#eventsdiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data){
				var $eventsdiv_html = $('#eventsdiv');
				//var $favevents_html = $('#favevents');
				var $allevents_html = $('#allevents');
				//$favevents_html.html('');
				$allevents_html.html('');
				$eventsdiv_html.html('');
				var eventids=[]
				$.each(data, function (key, val) {
					if((key=='all_event') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var fav_event_id =this.fav_event_id;
							var fav_event_name =this.fav_event_name;
							var fav_event_type =this.fav_event_type;
							var fav_event_logo =this.fav_event_logo;
							var fav_event_status =this.fav_event_status;
							var selected =this.selected;
							if(fav_event_logo!=''){
								var fav_event_logo_url =imagepath+fav_event_logo; 
							}
							if(selected== 0){
								var classremove ='removerow';
								var classadd='';
							}else{
								var classremove ='';
								var classadd='removerow';
								eventids.push(fav_event_id);
							}	
							if(searchstring_event!=''){
								 var fav_event_namestr =fav_event_name.toLowerCase();
								 if(fav_event_namestr.indexOf(searchstring_event)!= -1){
									search_status=1;
									/* if(selected== 0){
										var classremove ='removerow';
										var classadd='';
									}else{
										var classremove ='';
										var classadd='removerow';
										eventids.push(fav_event_id);
									} */
									$eventsdiv_html.append('<button class="accordion days removefavevent '+classremove+'" id="button-'+fav_event_id+'"> <img src="'+fav_event_logo_url+'" width="60" height="auto">'+fav_event_name+'<span class="commit"><a href="#" class="red updateevents" id="updateevents-'+fav_event_id+'">Done</a></span></button>');
							
									$allevents_html.append('<li id="notavailrow-'+fav_event_id+'" class="'+classadd+'"><img src="'+fav_event_logo_url+'" width="60" height="auto">'+fav_event_name+' <span class="pull-right addfavevent" id="addfavevent-'+fav_event_id+'"> <i class="fa fa-plus-circle green"></i> </span></li>');

								 }else{ }
							}else{
                                /* if(selected== 0){
									var classremove ='removerow';
									var classadd='';
								}else{
									var classremove ='';
									var classadd='removerow';
									eventids.push(fav_event_id);
								}	 */							
								$eventsdiv_html.append('<button class="accordion days removefavevent '+classremove+'" id="button-'+fav_event_id+'"> <img src="'+fav_event_logo_url+'" width="60" height="auto">'+fav_event_name+'<span class="commit"><a href="#" class="red updateevents" id="updateevents-'+fav_event_id+'">Done</a></span></button>');
							
								$allevents_html.append('<li id="notavailrow-'+fav_event_id+'" class="'+classadd+'"><img src="'+fav_event_logo_url+'" width="60" height="auto">'+fav_event_name+' <span class="pull-right addfavevent" id="addfavevent-'+fav_event_id+'"> <i class="fa fa-plus-circle green"></i> </span></li>');
							}
						});
					} 
				});
				if((search_status==0) && (searchstring_event!='')){
						$eventsdiv_html.append('<div class="message"> No Event Matches Your Search ! </div>');
				}
                $("#favourite_events").val(eventids);				
			}
		});
	}
	/*get favourite brands  custom */
	 function  Getfavouritebands(imagepath,searchstring){
		 searchstring =searchstring.toLowerCase();
		 searchstring = $.trim(searchstring);
		var search_status =0;
	    var favourite_brand_id =$("#favourite_brand_id").val();
		var favids = favourite_brand_id.split(',');
		var brandids=[];
		var headerform = document.getElementById('headerform');
		$.each(favids, function (index, value) {
			brandids.push(value);
		});
		$.ajax({
			url: '/user/get_brands_teams',
			type: 'GET',
			data: {
				user_id: headerform.user_id.value
			},
			beforeSend:function(){
				$("#branddiv").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data){
				var $brandsdiv_html = $('#branddiv');
				var $allbrands_html = $('#allbrands');
				$brandsdiv_html.html('');
				$allbrands_html.html('');
				$.each(data, function (key, val) {
					
					if((key=='all_brand') && (val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var brand_id =this.brand_id;
							var brand_name =this.brand_name;
							var brand_type =this.brand_type;
							var brand_logo =this.brand_logo;
							var brand_status =this.brand_status;  
							var brand_idstr = brand_id.toString();
							
							if(brand_logo!=''){
								var brand_logo_url =imagepath+brand_logo;
							}
							
							if(brandids.indexOf(brand_idstr)== -1){
								var classremove ='removerow';
								var classadd='';
							}else{
								var classremove =''; 
								var classadd='removerow';
								//eventids.push(fav_event_id);
							} 
							if(searchstring!=''){
								var brandnamestr =brand_name.toLowerCase();
								if(brandnamestr.indexOf(searchstring)!= -1){
									search_status=1;
									$brandsdiv_html.append('<button class="accordion days removefavbrand '+classremove+'" id="button-'+brand_id+'"> <img src="'+brand_logo_url+'" width="50" height="auto"> '+brand_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+brand_id+'">Done</a></span></button>');
								
									$allbrands_html.append('<li id="notavailrow-'+brand_id+'" class="'+classadd+'"><img src="'+brand_logo_url+'" width="50" height="auto"> '+brand_name+' <span class="pull-right addfavbrand" id="addfavbrand-'+brand_id+'"> <i class="fa fa-plus-circle green"></i> </span></li>');
								} 
							}else{
								$brandsdiv_html.append('<button class="accordion days removefavbrand '+classremove+'" id="button-'+brand_id+'"> <img src="'+brand_logo_url+'" width="50" height="auto"> '+brand_name+'<span class="commit"><a href="#" class="red updatebrand" id="updatebrand-'+brand_id+'">Done</a></span></button>');
								
								$allbrands_html.append('<li id="notavailrow-'+brand_id+'" class="'+classadd+'"><img src="'+brand_logo_url+'" width="50" height="auto"> '+brand_name+' <span class="pull-right addfavbrand" id="addfavbrand-'+brand_id+'"><i class="fa fa-plus-circle green"></i> </span></li>'); 
							}
							
						});
						//if no record match 
						if((search_status==0) && (searchstring!='')){
						   $brandsdiv_html.html('<div class="message"> No Brand Matches Your Search ! </div>');
						}
					}
				});
			}
		});
	 }
	/*####### user brand team ans size  ########*/
	function Getuserdetails(profilepage,imagepath){
		//alert(profilepage);
		var feedform = document.getElementById('feedform');
		$.ajax({
			url: '/user/get_user_detail',
			type: 'GET',
			data: {
				user_id: feedform.user_id.value,
				friend_id: feedform.friend_id.value,
				page: feedform.page.value,
				limit: 100,
			},
			success:function(data) {
				
				$.each(data, function (key, val) {
					if((key=='user') && (val!='')){
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
						    var first_name = this.first_name;
							var last_name = this.last_name; 
							var email = this.email;  
							var gender = this.gender; 
							var user_pic = this.user_pic; 
							//var dob = this.dob; 
							//var age = this.age; 
							var user_pic = this.user_pic; 
							
							if(user_pic.indexOf('http') > -1) { 
								var picsrc = this.user_pic;
							}else{ 
								var picsrc = imagepath+user_pic;
							} 
							
							
							if(profilepage=='/user/favbrands'){
								var favourite_brand_id = this.favourite_brand_id;
								$("#favourite_brand_id").val(favourite_brand_id);
								/* var favids = favourite_brand_id.split(',');
								var brandids=[];
								$.each(favids, function (index, value) {
									//alert(index +'  : ' +value);
									brandids.push(value);
								}); */
							}					
							
							if(profilepage=='/user/favfans'){
								var favourite_fans = this.favourite_fans;
								$("#favourite_fans").val(favourite_fans);
							} 
							if(profilepage=='/user/favteams'){
								var favourite_team_id = this.favourite_team_id;
								$("#favourite_team_id").val(favourite_team_id);
							}
							
							/*########## My sizes #######*/
							if(profilepage=='/user/mysizes'){
								
								$("#profilepicfav").html('<img src="'+picsrc+'"  style="height:100px;width:100px;" class="center-block img-circle img-responsive mb-20"><div class="profile-meta text-center"><p class="text-uppercase">'+first_name+' '+last_name+'</p></div>');
								
								$("#shoesize").html('');
								$("#pentzize").html('');
								$("#shirtsize").html('');
								$("#hatsize").html('');
								$("#tracksuit").html('');
								var shoe_size =this.shoe_size;
								var pant_size =this.pant_size;
								var shirt_size =this.shirt_size;
								var hat_size =this.hat_size;
								var tracksuit_size =this.tracksuit_size;
								
								//shoes size 
								var shoesarr =["6", "7", "8", "9", "10", "11","12","13"];
								$.each(shoesarr, function (index, value) {
									if(shoe_size==value){
										$("#shoesize").append('<label><input type="radio" name="shoe_size"  checked="checked" value="'+value+'"><span>'+value+'</span></label>')
									}else{
										$("#shoesize").append('<label><input type="radio" name="shoe_size"  value="'+value+'"><span>'+value+'</span></label>');
									}
								});
								
								//pent size
								var pentzize =["28", "30", "32", "34", "36", "38","40","42"];
								$.each(pentzize, function (index, value) {
									if(pant_size==value){
										$("#pentzize").append('<label><input type="radio" name="pant_size"  checked="checked" value="'+value+'"><span>'+value+'</span></label>')
									}else{
										$("#pentzize").append('<label><input type="radio" name="pant_size"  value="'+value+'"><span>'+value+'</span></label>');
									}
								});
								
								//shirt  size 
								var shirtsize =["S","M", "L", "XL", "XXL", "XXXL"];
								$.each(shirtsize, function (index, value) {
									if(shirt_size==value){
										$("#shirtsize").append('<label><input type="radio" name="shirt_size"  checked="checked" value="'+value+'"><span>'+value+'</span></label>')
									}else{
										$("#shirtsize").append('<label><input type="radio" name="shirt_size"  value="'+value+'"><span>'+value+'</span></label>');
									}
								});
								
								//hat  size
								var hatsize =["S","M", "L", "XL", "XXL", "XXXL"];
								$.each(hatsize, function (index, value) {
									if(hat_size==value){
										$("#hatsize").append('<label><input type="radio" name="hat_size"  checked="checked" value="'+value+'"><span>'+value+'</span></label>')
									}else{
										$("#hatsize").append('<label><input type="radio" name="hat_size"  value="'+value+'"><span>'+value+'</span></label>');
									}
								});
								
								//tracksuit size
								var tracksuit =["S","M", "L", "XL", "XXL", "XXXL"];
								$.each(tracksuit, function (index, value) {
									if(tracksuit_size==value){
										$("#tracksuit").append('<label><input type="radio" name="tracksuit_size"  checked="checked" value="'+value+'"><span>'+value+'</span></label>')
									}else{
										$("#tracksuit").append('<label><input type="radio" name="tracksuit_size"  value="'+value+'"><span>'+value+'</span></label>');
									}
								});
								
							}
							 
						});
					}
				});
			}
		}); 
	}
	/*################selected amd deselect brand #############*/
	/* function unselectedbrand(){
		alert("going to submit");
	} */
	/*#######  update user details  ########*/
	$(document).ready(init);
})();
