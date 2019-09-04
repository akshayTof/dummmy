(function () {
	function init(){
		var imagepath = $("#uploadspath").val();
		var profilepage = location.pathname;
		GetLocationByIp();
		if(profilepage=='/event/view-events/'){
			setTimeout(function(){ 
			    GetActiveEvents(profilepage,imagepath);
				get_nearby_events(profilepage,imagepath);
			}, 2000);
		}
		// nearby events page
		if(profilepage=='/event/nearby-events/'){
			setTimeout(function(){ 
				get_nearby_events(profilepage,imagepath);
			}, 2000);
		}
		// history  events page
		if(profilepage=='/event/history-events/'){
			 GetHistoricEvents();
		}
        if(profilepage.indexOf("/event/view-events/org/") != -1){
			var profilepage='/event/view-events/org/';
			setTimeout(function(){ 
				GetActiveEvents(profilepage,imagepath);
			}, 2000);
		}		
		if(profilepage.indexOf("/event/single_event/") != -1){
			var profilepage='/event/single_event/';
			GetSingleEvent(profilepage,imagepath);
		}
		if(profilepage.indexOf("/event/single_event_user/") != -1){
			var profilepage='/event/single_event_user/';
			GetSingleEvent(profilepage,imagepath);
		}
		if(profilepage.indexOf("/event/edit_event/") != -1){
			var profilepage='/event/edit_event/';
			setTimeout(function(){ 
			    GetSingleEvent(profilepage,imagepath)
			}, 2000);
			//setTimeout(GetSingleEvent(profilepage,imagepath), 2000);
			//GetSingleEvent(profilepage,imagepath);
		}
		
		if(profilepage.indexOf("/event/bussiness-profile/") != -1) {
			Getorganization();
		}
		if(profilepage.indexOf("/event/view-events/org/") != -1) {
			Getorganization();
		}
		if(profilepage=='/user/signup-business'){
			get_organization_type();
		} 
		
		if((profilepage=='/user/get_user_profile') ||(profilepage=='/event/view-events/')){
		    var headerform = document.getElementById('headerform');
		    var usertype = headerform.user_type.value;
		    if(usertype=='organization'){
			  Getorganization();
		    }
		}
		if((profilepage=='/event/create_event/') || (profilepage=='/linkup_new/add_new_request') ||(profilepage=='/feed/feeds')){
		   setTimeout(function(){ 
				getcoordinates();
			}, 3000);
		}  
		/*switch change*/
		
		$("#event_paid_switch").on('change', function() {
			var value = $(this).is(":checked");
			if(value==true){
				$("#event_paid").val('paid');
			}else{
				$("#event_paid").val('free');
			}
		});
		
		$("#all_day_event_switch").on('change', function() {
			var value = $(this).is(":checked");
			//alert(value);
			if(value==true){
				$("#all_day_status").val('1');
			}else{
				$("#all_day_status").val('0');
			}	
		});
		
		/*switch change end  */
		$('#historyeventstab').click(GetHistoricEvents);
		$('#organizationstab').click(get_organization_follower);
		
		//$("#event_location").focusout(getcoordinates);
		//$("#event_location").focusout(getcoordinates);
		
		$("#event_location").keyup(getcoordinates);
		$("#linkupnew_location").keyup(getcoordinates);
		//$("#accordion").click(getcoordinates);
		
		/*delete event */
		$(document).on("click", ".deleteevent" , function() {
			var id =$(this).attr('id');
			var eventids = id.split('-');
			var event_id = eventids[1];
			if (!confirm('Are you sure ?')) return false;	
			Deleteevent(event_id);
		});
		
		//interestedin
		$(document).on("click", ".interestedin" , function() {
			var id =$(this).attr('id');
			var eventids = id.split('-');
			var event_id = eventids[1];
			Interestedin(event_id);
		});
		// going 
		$(document).on("click", ".goingevent" , function() {
			var id =$(this).attr('id');
			var eventids = id.split('-');
			var event_id = eventids[1];
			Goingevent(event_id);
		});
		
		//nearbyeventsform
		$("#selectlocation").on('change', function() {
			var val1 = $(this).val();
			if(val1=='nearby'){
				get_nearby_events(profilepage,imagepath);
				$("#mapholder").addClass('removerow');
			}else if(val1=='city'){
				getcoordinates();
				get_nearby_events(profilepage,imagepath);
				$("#mapholder").removeClass('removerow');
			}
		});
		$("#distance").on('change', function() {
			//$("#distance").val($(this).val());
			get_nearby_events(profilepage,imagepath);
		});
		$("#event_category").on('change', function() {
			//$("#distance").val($(this).val());
			get_nearby_events(profilepage,imagepath);
		});
		$("#eventsearchbox" ).keyup(function() {
			get_search_events(profilepage,imagepath);
		});
		
		//get activity location 
		$("#activity_locationselectbox").on('change', function() {
			var selectedlocation = $(this).val();
			$("#linkupnew_location").val(selectedlocation);
			getcoordinates();
			
		});
		/*Validation   */
		$("#create_eventForm,#edit_eventForm" ).submit(function( event ) {
			if($("#user_id").val()=='' || $("#event_name").val()=='' || $("#event_location").val()=='' || $("#event_start_time").val()=='' || $("#event_end_time").val()=='' || $("#activity_id").val()=='' || $("#event_category").val()=='') {
				
				$(".postsubmit").html('<div class="error"> Mandatory parameter missing ! </div>');
				$("#user_id").addClass('errorClass');
				$("#event_name").addClass('errorClass');
				$("#event_location").addClass('errorClass');
				$("#event_start_time").addClass('errorClass');
				$("#event_end_time").addClass('errorClass');
				$("#activity_id").addClass('errorClass');
				$("#event_category").addClass('errorClass');
				$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
				event.preventDefault();
			}else{
				$(".postsubmit").html('');
				$("#user_id").removeClass('errorClass');
				$("#event_name").removeClass('errorClass');
				$("#event_location").removeClass('errorClass');
				$("#event_start_time").removeClass('errorClass');
				$("#event_end_time").removeClass('errorClass');
				$("#activity_id").removeClass('errorClass');
				$("#event_category").removeClass('errorClass');
				if($("#host_email").val()!=''){
					var email = $("#host_email").val();
					var emailll = validateEmail(email);
					if(emailll==true){
						$(".postsubmit").html('');
						$("#host_email").removeClass('errorClass');
					}else{
						$(".postsubmit").html('<div class="error"> PLease Enter Valid Email ! </div>');
						$("#host_email").addClass('errorClass');
						$('html,body').animate({ scrollTop: $("#top").offset().top}, 1000);
						event.preventDefault();
					}
				}
			}
		});
		jQuery("#host_phone").keydown(function (e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if (jQuery.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
				 // Allow: Ctrl+A, Command+A
				(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
				 // Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
					 // let it happen, don't do anything
					 return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				//alert("Please Enter Numeric Only");
				//$("#host_phone").addClass('errorClass');
				$(".spanerror").html(' Numeric Only!');
				e.preventDefault();
			}else{
				$(".spanerror").html(' ');
				//$("#host_phone").removeClass('errorClass');
			}
		});
		/*Validation */
	}
	/*get search events */
	function get_search_events(profilepage,imagepath){
		var nearbyform = document.getElementById('nearbyeventsform');
		var headerform = document.getElementById('headerform');
		var eventsform = document.getElementById('eventsform');
		var loggedinuser =headerform.user_id.value;
		var orguser = eventsform.user_id.value;
		var user_type = headerform.user_type.value;
		
		var user_id = eventsform.user_id.value;
		var timezone = eventsform.timezone.value;
		var distance = nearbyform.distance.value;
		var event_city = nearbyform.event_city.value;
		var event_category = nearbyform.event_category.value;
		var latitude = nearbyform.latitude.value;
		var longitude = nearbyform.longitude.value;
		
		var searchStr =$("#eventsearchbox").val();
		/* //alert("user_id: " +user_id + " searchStr: " +searchStr + "timezone: " +timezone +" latitude: " + latitude  + " longitude: " +longitude); */
		$.ajax({
			url:'/event/get_search_event',
			type: 'GET',
			data: {
				user_id: eventsform.user_id.value,
				timezone: eventsform.timezone.value,
				latitude: nearbyform.latitude.value,
				longitude: nearbyform.longitude.value,
				distance: nearbyform.distance.value,
				event_category: nearbyform.event_category.value,
				searchStr:searchStr
			},
			beforeSend:function(){
				$(".filteredevents").html('<div class="error"><img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data) {
				$(".postsubmit").html('');
				$events_html=$("#filteredevents");
				$events_html.html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var success = this.success;
					var msg= this.msg;
					var data2= this.data;
					if(success==1){
						if(data2!=''){
							//alert(JSON.stringify(data2));
							$(jQuery.parseJSON(JSON.stringify(data2))).each(function() {
								var user_id =this.user_id;
								var event_id =this.event_id;
								var event_name =this.event_name;
								var event_pic =this.event_pic;
								var event_location =this.event_location;
								var event_description =this.event_description;
								
								if(event_pic !=''){
									var picurl = imagepath+event_pic;
								}else{
									var picurl = '/images/user.png';
								}
								var accept_event=this.accept_event;
								var isIntrested=this.isIntrested;
								//alert(accept_event);
								//alert(isIntrested);
								if(accept_event==1){
									var Accdisable ='disabled';
									var accbtn ='btn-gray';
								}else{
									var accbtn ='btn-green';
								}
								if(isIntrested==1){
									var Intdisable ='disabled';
									var isinbtn ='btn-gray';
								}else{
									var isinbtn ='btn-blue';    
								}
								
								var postmessage ='<div class="postmessage" id="postmessage-'+event_id+'"></div>';
								if(loggedinuser==user_id){
									var single_evnet_url ='/event/single_event/'+event_id;
									var actiondiv ='<div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown"aria-expanded="true">ACTION</button><ul class="dropdown-menu"><li><a href="/event/edit_event/'+event_id+'">Edit</a></li><li><a href="javascript:void(0)" class="deleteevent" id="deleteevent-'+event_id+'">Delete</a></li></ul></div>';
									var interestand_going='';
								}else{
									var single_evnet_url ='/event/single_event_user/'+event_id;
									var interestand_going ='<div class=""><button class="btn '+isinbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 interestedin" id="interestedin-'+event_id+'" '+Intdisable+'>Interested</button><button class="btn '+accbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 goingevent" id="goingevent-'+event_id+'" '+Accdisable+'>Going</button></div>';
									var actiondiv='';
								}
								if(profilepage=='/event/view-events/org/'){
									$events_html.append('<div class="media event"><div class="media-left media-top"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body pb-20 pl-20"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+'</h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+' '+postmessage+'</div>');
									
								}else{
									$events_html.append('<div class="media event" ><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+' </h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+' '+postmessage+'</div>');
								}
							});
						}else{
							$events_html.html('<div class="message"> No Event Found!</div>');
						}
					}else{
						get_nearby_events(profilepage,imagepath);
						//$events_html.html('<div class="message"> '+msg+'</div>');
					}
				}); 
			}
		}); 
	}
	/*Get nearby events */
	function get_nearby_events(profilepage,imagepath){
		var currentloc= $("#current_location_viewlink").val();
		var nearbyform = document.getElementById('nearbyeventsform');
		var headerform = document.getElementById('headerform');
		var eventsform = document.getElementById('eventsform');
		var loggedinuser =headerform.user_id.value;
		var orguser = eventsform.user_id.value;
		var user_type = headerform.user_type.value;
		
		var user_id = eventsform.user_id.value;
		var timezone = eventsform.timezone.value;
		var distance = nearbyform.distance.value;
		var distance = nearbyform.distance.value;
		var latitude = nearbyform.latitude.value;
		var longitude = nearbyform.longitude.value;
		var event_city = nearbyform.event_city.value;
		var event_category = nearbyform.event_category.value;
		//alert(latitude);
		//alert(longitude);
		//alert(event_city);
		$.ajax({
			url:'/event/get_nearby_event',
			type: 'GET', 
			data: {
				user_id: eventsform.user_id.value,
				timezone: eventsform.timezone.value,
				user_lat: nearbyform.latitude.value,
				user_long: nearbyform.longitude.value,
				distance: nearbyform.distance.value,
				limit:1000,
				event_city: nearbyform.event_city.value,
				event_category: event_category, 
			},
			beforeSend:function(){
				$(".filteredevents").html('<div class="error"><img src="/images/ajax-loader.gif"> </div>');
			},
			success:function(data) {
				$(".postsubmit").html('');
				$events_html=$("#filteredevents");
				$events_html.html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var success = this.success;
					var msg= this.msg;
					var data2= this.data;
					if(success==1){
						if(data2!=''){
							//alert(JSON.stringify(data2));
							$(jQuery.parseJSON(JSON.stringify(data2))).each(function() {
								var user_id = this.user_id;
								var event_id =this.event_id;
								var event_name =this.event_name;
								var event_pic =this.event_pic;
								var event_location =this.event_location;
								var event_description =this.event_description;
								
								
								if(event_pic !=''){
									var picurl = imagepath+event_pic;
								}else{
									var picurl = '/images/user.png';
								}
								var accept_event=this.accept_event;
								var isIntrested=this.isIntrested;
								if(accept_event==1){
									var Accdisable ='disabled';
									var accbtn ='btn-gray';
								}else{
									var accbtn ='btn-green';
								}
								if(isIntrested==1){
									var Intdisable ='disabled';
									var isinbtn ='btn-gray';
								}else{
									var isinbtn ='btn-blue';
								}
								var postmessage ='<div class="postmessage" id="postmessage-'+event_id+'"></div>';
								if(loggedinuser==user_id){
									var single_evnet_url ='/event/single_event/'+event_id;
									
									var actiondiv ='<div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown"aria-expanded="true">ACTION</button><ul class="dropdown-menu"><li><a href="https://www.google.co.in/maps/dir/'+currentloc+'/'+event_location+'" target="_blank">Navigate</a></li><li><a href="/event/edit_event/'+event_id+'">Edit</a></li><li><a href="javascript:void(0)" class="deleteevent" id="deleteevent-'+event_id+'">Delete</a></li></ul></div>';
									
									var interestand_going='';
								}else{
									var single_evnet_url ='/event/single_event_user/'+event_id;
									var interestand_going ='<div class=""><button class="btn '+accbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 interestedin" id="interestedin-'+event_id+'" '+Intdisable+'>Interested</button><button class="btn '+isinbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 goingevent" id="goingevent-'+event_id+'" '+Accdisable+'>Going</button></div>';
									
									var actiondiv ='<div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown"aria-expanded="true">ACTION</button><ul class="dropdown-menu"><li><a href="https://www.google.co.in/maps/dir/'+currentloc+'/'+event_location+'" target="_blank">Navigate</a></li></ul></div>';
								}
								//var actiondiv='';
								if(profilepage=='/event/view-events/org/'){
									$events_html.append('<div class="media event"><div class="media-left media-top"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body pb-20 pl-20"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+'</h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+' '+postmessage+'</div>');
									
								}else{
									$events_html.append('<div class="media event" ><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+' </h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+' '+postmessage+'</div>');
								}
							});
						}else{
							$events_html.html('<div class="message"> No Event Found!</div>');
						}
					}else{
						$events_html.html('<div class="message"> '+msg+'</div>');
					}
				}); 
			}
		});
	}
	/*Going  in  */
	function Goingevent(event_id){
		var headerform = document.getElementById('headerform');
		var user_id = headerform.user_id.value;
		
		$.ajax({
			url: '/event/accept_event',
			type: 'POST',
			data: {
				event_id: event_id,
				user_id: user_id
			},
			beforeSend:function(){
				$("#postmessage-"+event_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				$("#postmessage-"+event_id).html('');
				//alert(JSON.stringify(data));
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg =this.msg;
					var success =this.success;
					if(success==1){
						//alert(msg);
						$("#goingevent-"+event_id).attr("disabled", true);
						$("#postmessage-"+event_id).html('<div class="message">'+msg+'</div>');
					}else{
						$("#postmessage-"+event_id).html('<div class="error">'+msg+'</div>');
					}
				});
			}
		}); 
	}
	/*Interested in  */
	function Interestedin(event_id){
		var headerform = document.getElementById('headerform');
		var user_id = headerform.user_id.value;
		$.ajax({
			url: '/event/add_event_interest',
			type: 'POST',
			data: {
				event_id: event_id,
				user_id: user_id
			},
			beforeSend:function(){
				$("#postmessage-"+event_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				//alert(JSON.stringify(data));
				$("#postmessage-"+event_id).html('');
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg =this.msg;
					var success =this.success;
					if(success==1){
						$("#interestedin-"+event_id).attr("disabled", true);
						$("#postmessage-"+event_id).html('<div class="message">'+msg+'</div>');
					}else{
						$("#postmessage-"+event_id).html('<div class="message">'+msg+'</div>');
					}
				});
			}
		}); 
	}
	/*delete events */
	function Deleteevent(event_id){
		$.ajax({
			url: '/event/delete_event',
			type: 'POST',
			data: {
				event_id: event_id,
			},
			beforeSend:function(){
				$("#postmessage-"+event_id).html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				
				$(jQuery.parseJSON(JSON.stringify(data))).each(function() {
					var msg =this.msg;
					var success =this.success;
					if(success==1){
						$("#postmessage-"+event_id).html('<div class="message">'+msg+'</div>');
						//alert(msg);
					}else{
						$("#postmessage-"+event_id).html('<div class="message">'+msg+'</div>');
						//alert(msg);
					}
				});
			}
		});
	}
	/*GET LOCATION BY ip */
	function GetLocationByIp(){
		geoip2.city(function(location){
		
			//console.log(location);
			var latitude = location.location.latitude;
			var longitude = location.location.longitude;
			var time_zone = location.location.time_zone;
			
			//add lat and long on   nearby activity
		    $("#user_lat").val(latitude);
			$("#user_long").val(longitude);
			
			var locString = location.city.names.en +", "+location.country.names.en;
			var state1 = location.most_specific_subdivision.names.en;
			
		    //alert(locString);
			//alert(JSON.stringify(location.subdivisions.names));
			//alert(JSON.stringify(location.most_specific_subdivision.names.en));
			
			// Activity new request
			//$("#linkupnew_location").val(location.city.names.en);
			$("#linkupnew_location").val(locString);
			$("#state").val(state1);
			$("#city").val(location.city.names.en);
			$("#country").val(location.country.names.en);
			$("#linkup_lat").val(latitude);
			$("#linkup_long").val(longitude);
			$("#linkup_timezone").val(time_zone);
			
			$("#timezone_for_achievement").val(time_zone);
			
			//get location in view activity 
			$("#current_location_viewlink").val(locString);
			
			//event location
			$("#event_location").val(location.city.names.en);
			$("#event_timezone").val(time_zone);
			
			//add location on  feed page
			
			$("#check_in_hidden").val(location.city.names.en);
			$("#check_in_lat").val(latitude);
			$("#check_in_long").val(longitude);
			
			//add locatin latitude time zone  on nearby events 
			//timezone
			$("#timezone").val(time_zone);
			$("#latitude").val(latitude);
			$("#longitude").val(longitude);
			$("#event_city").val(location.city.names.en)
			
			
		});
	}	
	/*GET LOCATION BY ip eND  */	
	
	/*############## get coord  ##############*/ 
	function getcoordinates(){
		var profilepage = location.pathname;

		var imagepath = $("#uploadspath").val();
		if(profilepage=='/linkup_new/add_new_request'){
			var address = $("#linkupnew_location").val();
		}else if(profilepage=='/feed/feeds'){
			var address = $("#check_in_hidden").val();
		}else if(profilepage=='/event/view-events/'){
			var address = $("#event_city").val();
		}else if(profilepage=='/event/nearby-events/'){
			var address = $("#event_city").val();
		}else{
			var address = $("#event_location").val();
		}
		
		//alert(address);
		$.ajax({
			url: '/event/getcoordinates',
			type: 'GET',
			data: {
				address: address,
			},
			success:function(data) {
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						//console.log(val);
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var latitude = this.latitude;
							var longitude = this.longitude; 
							var latlon = latitude+','+longitude;
							var city = this.city;
							var zipcode = this.zipcode;
							var country = this.country;
							var streetName = this.streetName;
							
						    var administrattiveLevels = this.administrativeLevels;
						    var formattedAddress = this.formattedAddress;
							var newformat =formattedAddress.split(',');
							var placename =newformat[0]+ newformat[1];
							if(profilepage=='/linkup_new/add_new_request'){
								$("#linkup_lat").val(latitude);
								$("#linkup_long").val(longitude);
								$("#city").val(city);
								$("#zip_code").val(zipcode);
								$("#country").val(country);
								$("#place_name").val(placename);
								
								//$("#state").val(state);
								$(jQuery.parseJSON(JSON.stringify(administrattiveLevels))).each(function() {
									var level2Long = this.level2long;
									var level1Long = this.level1long;
									$("#state").val(level1Long);
								});
								
							}else if(profilepage=='/feed/feeds'){
								$("#check_in_hidden").val(city);
							}else{
								$("#event_lat").val(latitude);
								$("#event_long").val(longitude);
								$("#event_country").val(country);
								$("#event_city").val(city);
								//$("#event_location").val(formattedAddress);
							}
							
							initialize();
							//var loadMap = function() 
							//{
								function initialize() {
									var myLatLng = {lat: latitude, lng: longitude};
									var myOptions = {
										center: new google.maps.LatLng(latitude,longitude),
										zoom: 16,
										mapTypeId: google.maps.MapTypeId.ROADMAP,
										mapTypeControl:false,
										navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
									};
									var map = new google.maps.Map(document.getElementById("map"),myOptions);
									//var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
									var marker = new google.maps.Marker({
									  position: myLatLng,
									  map: map,
									  title: address
									});
									//if((profilepage=='/feed/feeds') || (profilepage=='/event/view-events/')){
									if(profilepage.indexOf("/event/single_event_user/")==-1){
										if((profilepage.indexOf("/event/edit_event/")==-1)){
											google.maps.event.addListener(map, "click", function (e) {
												var clickLat = e.latLng.lat();
												var clickLon = e.latLng.lng();
												var latLng = e.latLng;
												if(profilepage=='/event/view-events/'){
													$("#latitude").val(clickLat);
													$("#longitude").val(clickLon);
													//alert(clickLon)
												}
												if(profilepage=='/feed/feeds'){
													$("#check_in_lat").val(clickLat);
													$("#check_in_long").val(clickLon);
												}
												if(profilepage=='/linkup_new/add_new_request'){
													$("#linkup_lat").val(clickLat);
													$("#linkup_long").val(clickLon);
												}
												if(profilepage=='/event/create_event/'){
													$("#event_lat").val(clickLat);
													$("#event_long").val(clickLon);
													//$("#event_country").val(country);
													//$("#event_city").val(city);
													//$("#event_location").val(formattedAddress);
												}
												//setMapOnAll(null);
												var marker = new google.maps.Marker({
													position: new google.maps.LatLng(clickLat,clickLon),
													map: map,
													zoom: 12
												}); 
												$.ajax({
													url: '/event/getlocation',
													type: 'GET',
													data: {
														latitude: clickLat,
														longititude: clickLon
													},
													beforeSend:function(){
														//alert("before");
														$("#loadinglinkup").html('');
														$("#loadinglinkup").append('<img src="/images/ajax-loader.gif">');
														$(".postsubmit").html('<div class="error"><img src="/images/ajax-loader.gif"> </div>');
													},
													success:function(data) {
														$(".postsubmit").html('');
														$.each(data, function (key, val) {
															 if((key=='data')&&(val!='')){
																$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
																	//alert(JSON.stringify(val));
																	var formattedAddress = this.formattedAddress;
																	var administrattiveLevels = this.administrativeLevels;
																	//alert("administrattiveLevels "+administrattiveLevels);
																	if(profilepage=='/feed/feeds'){
																		$("#check_in").val(formattedAddress);
																		$("#check_in_hidden").val(formattedAddress);
																		//$.fancybox.close();
																		$("#checkinmap").css('display','none');
																		window.location.hash = '';
																		return false;
																	}
																	if(profilepage=='/linkup_new/add_new_request'){ 
																		var newformat =formattedAddress.split(',');
																		var placename =newformat[0]+ newformat[1]+ newformat[2];
																		$("#place_name").val(placename);
																		$("#linkupnew_location").val(formattedAddress);
																		$(jQuery.parseJSON(JSON.stringify(administrattiveLevels))).each(function() {
																			var city = this.level2long;
																			var state = this.level1long;
																			$("#state").val(state);
																			
																		});
																		getcoordinates();
																		return false;
																	}
																	
																	$(jQuery.parseJSON(JSON.stringify(administrattiveLevels))).each(function() {
																		var level2Long = this.level2long;
																		var level1Long = this.level1long;
																		if(profilepage=='/event/view-events/'){
																			$("#event_city").val(level2Long);
																			getcoordinates();
																			get_nearby_events(profilepage,imagepath);
																			//getcoordinates();
																			//return false;
																		}
																		if(profilepage=='/event/create_event/'){
																			//$("#event_country").val(country);
																			$("#event_city").val(level2Long);
																			$("#event_location").val(formattedAddress);
																			getcoordinates();
																			return false;
																		}
																	});
																	
																});
																
															} 
														}); 
													}
												});
												
											});
										}
									}
								}
							//};
							//window.onload= loadMap;
						});
						
					}
				});
			} 
		}); 
	}

	
		
		
	/*get location  and Map */
	/*######## Get organization ######*/
	function Getorganization(){
	   var imagepath = $("#uploadspath").val();
       var feedform = document.getElementById('feedform');
		$.ajax({
			url: '/event/get_organization_profile',
			type: 'GET', 
			data: {
				user_id: feedform.user_id.value,
				friend_id: feedform.friend_id.value
			},
			success:function(data) {
				var $profile_pic_html = $('#profile_pic');
				$profile_pic_html.html('');
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						//alert(key);
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var first_name = this.first_name;
							var last_name = this.last_name; 
							var email = this.email;
							var user_pic = this.user_pic;
							//alert(user_pic);
							if(user_pic !=''){
								var picurl = imagepath+user_pic;
							}else{
								var picurl = '/images/user.png';
							}
							$profile_pic_html.append('<img src="'+picurl+'" class="center-block img-circle img-responsive mb-20"><div class="profile-meta text-center"><p class="text-uppercase">'+first_name+' '+last_name+'</p></div>');
						}); 
					}else if((key=='data')&&(val=='')){
						$profile_pic_html.append('<img src="/images/profile-pic.png" class="center-block img-circle img-responsive mb-20"><div class="profile-meta text-center"><p class="text-uppercase"> Org Not Present </p></div>');
					} 
				}); 
            }
        });	 	 
	}
	
	/*#########################     Get Single Event   ############################ */
	function GetSingleEvent(profilepage,imagepath){
		//alert("dfdfds"+profilepage);
		var singleevent = document.getElementById('singleevent');
		var headerform = document.getElementById('headerform');
		var loggedin_user_id = headerform.user_id.value;
		$.ajax({
			url: '/event/get_single_event/',
			type: 'GET',
			data: {
				event_id: singleevent.event_id.value,
				user_id: headerform.user_id.value,
			},
			beforeSend:function(){
				$(".posteventmsg").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
				$("#single_event_detail").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				var $single_event_image_html = $('#single_event_image');
				var $single_event_detail_html = $('#single_event_detail');
				var $ticketavail_html = $('#ticketavail');
				var $host_details_html = $('#host_details');
				
				//var $single_event_location_html = $('#single_event_location');
				
				$single_event_image_html.html('');
				$single_event_detail_html.html('');
				$ticketavail_html.html('');
				$host_details_html.html('');
				//$single_event_location_html.html('');
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
                        var interested;
						var interested_count;						
						var friend_id_count;						
						var friend_ids;	
						var user_id;
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
						    var event_id =this.event_id;
						    var event_name =this.event_name;
						    var event_pic =this.event_pic;
						    var event_location =this.event_location;
						    var event_description =this.event_description;
							var event_start_time =this.event_start_time;
						    var event_end_time =this.event_end_time;
						    var event_time =this.event_time;
							var event_timezone=this.event_timezone;
						    var event_type =this.event_type;
						    var event_location =this.event_location;
						    var event_seating_capacity =this.event_seating_capacity;
						    var remaining_seats =this.remaining_seats;
							var going =parseInt(event_seating_capacity-remaining_seats);
							var event_category =this.event_category;
						    var activity_id =this.activity_id;
						    var activity_name =this.activity_name;
						    var event_paid =this.event_paid;
							var event_lat =this.event_lat;
						    var event_long =this.event_long;
						    var ticket_price =this.ticket_price;
							
							
							//alert("event_time : "+event_time+ " event_start_time: " +event_start_time);
							
							//user and host details
						    user_id =this.user_id;
							var first_name =this.first_name;
							var user_pic =this.user_pic;
							var host_name =this.host_name;
						    var host_email =this.host_email;
						    var host_phone =this.host_phone;
							if(user_pic==''){
								var picsrc = '/images/user.png';
							}else{
								if(user_pic.indexOf('http') > -1) { 
									var picsrc = user_pic; 
								} else {
									var picsrc = imagepath+user_pic;
								} 
							}
							
							//friendids are attendies 
							var friend_id =this.friend_id;
							if(friend_id==''){
								friend_id_count =0;
							}else{
								 friend_ids = friend_id.split(',');
								 friend_id_count =friend_ids.length;
							}
							
							var interested_user =this.interested_user;
							if(interested_user==''){
								interested_count =0;
							}else{
								 interested = interested_user.split(',');
								 interested_count =interested.length;
							}
							
							if(event_pic !=''){
								var picurl = imagepath+event_pic;
							}else{
								var picurl = '/images/skydiving.jpg';
							}
							//alert(event_start_time);
							//SPLIT DATE AND TIME 
							var date = new Date(event_start_time);
							var newDate = date.toString('dd-MM-y');
						
							//alert(newDate);
							if(newDate=='Invalid Date'){
								var time12 =event_start_time;
								var mdy ='';
							}else{
								var parts = newDate.split(" ");
								var Day = parts[2]
								var Month = parts[1];
								var Year = parts[3];
								var time24 = parts[4];
								var time12 = tConvert(time24);
								var mdy =+Day+'<br>'+Month+','+Year;
							}
							var accept_event=this.accept_event;
							var isIntrested=this.isIntrested;
							if(accept_event==1){
								var Accdisable ='disabled';
								var accbtn ='btn-gray';
							}else{
								var accbtn ='btn-green';
							}
							if(isIntrested==1){
								var Intdisable =' disabled';
								var isinbtn ='btn-gray';
							}else{
								var isinbtn ='btn-blue';
								var Intdisable ='';
							}
							
							
							$single_event_image_html.append('<img src="'+picurl+'" class="img-responsive center-block">');
							
							var postmessage ='<div class="postmessage" id="postmessage-'+event_id+'"></div>';
							if(profilepage=='/event/single_event_user/'){
								$single_event_detail_html.append('<div class="media-left media-top text-center pr-20"><h3 class="red">'+mdy+'</h3><h4 class="mt-10">'+time12+'</h4></div><div class="media-body"><h3 class="media-heading">'+event_name+' - Swift Spar</h3><p>Hosted by '+host_name+'</p><ul class="list-inline mt-10"><li>'+going+' Going</li><li> <i class="fa fa-circle text-muted"></i></li><li>'+ interested_count +' Interested</li></ul><ul class="list-inline mt-10"><li><button class="btn '+isinbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 interestedin" id="interestedin-'+event_id+'"'+Intdisable+'>Interested</button></li><li><button class="btn '+accbtn+' btn-rounded effect text-uppercase mt-20 pl-40 pr-40 goingevent" id="goingevent-'+event_id+'" '+Accdisable+'>Going</button></li></ul></div>'+postmessage);
								$("#event_location").val(event_location);
								getcoordinates();
							}else if(profilepage=='/event/edit_event/'){ 
							    $(".posteventmsg").html('');
								$('#blah').attr('src', picurl);
								$('#event_location').val(event_location);
								$('#event_lat').val(event_lat);
								$('#event_long').val(event_long);
								$('#event_country').val(event_country);
								$('#event_timezone').val(event_timezone);
								
								$('#event_name').val(event_name);
								$('#host_name').val(host_name);
								$('#host_phone').val(host_phone);
								$('#host_email').val(host_email);
								
								$('#ticket_price').val(ticket_price);
								$('#event_seating_capacity').val(event_seating_capacity);
								
								$('#event_paid').val(event_paid);
								
								if(event_paid=='paid'){
									$('#event_paid_switch').attr("checked", "checked");
								}
								$('#eventactivity').val(activity_id);
								$('#event_category').val(event_category);
								$('#event_start_time').val(event_start_time);
								$('#event_end_time').val(event_end_time);
								$('#event_description').val(event_description);
							}else{
								$single_event_detail_html.append('<div class="media-left media-top text-center pr-20"><h3 class="red">'+mdy+'</h3><h4 class="mt-10">'+time12+'</h4></div><div class="media-body"><h3 class="media-heading">'+event_name+'</h3><p>Hosted by '+host_name+'</p><ul class="list-inline mt-10"><li>'+going+' Going</li><li> <i class="fa fa-circle text-muted"></i></li><li>'+ interested_count +' Interested</li></ul></div>');
								//commented  14 feb
								
								$("#event_location").val(event_location);
								getcoordinates();
							}
							// no of attendies 
							
							$('#attendees').text(going);
							if(event_seating_capacity==0){
								$(".seatsavaildiv").css("display","none");
							}else{
								$ticketavail_html.append(remaining_seats+' out 0f '+event_seating_capacity);
							}
							//HOst Tab 
							$('#Hostname').text(host_name);
							$('#Hostemail').text(host_email);
							$('#Hostphone').text(host_phone);
							
							//user_pic
							$("#host_name_pic").html('<div class="media player"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+'</h3></div></div>'); 
							
							//description
							$("#eventdescription").text(event_description);
							
							
						});
					    
						//get event attendies 
						//$.unique(friend_ids);
						if(loggedin_user_id==user_id){
							get_event_attendes(imagepath);
					    }
					    //commented  
						/* if(friend_id_count > 0){
							$.each(friend_ids, function (index, value) {
								//value is interested user_id
								GetUserById(imagepath,value);
							});
						} */
					}
				});
			}
		});
	}
	/*function for get  attendies */
	function get_event_attendes(imagepath){
		var singleevent = document.getElementById('singleevent');
		var headerform = document.getElementById('headerform');
		$.ajax({
			url: '/event/get_event_attendes/',
			type: 'GET',
			data: {
				event_id: singleevent.event_id.value,
				user_id: headerform.user_id.value,
			},
			beforeSend:function(){
				$(".attendies_user").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				var $attendies_html = $('#attendies_user');
				$attendies_html.html('');
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var user_id =this.user_id;
							var first_name =this.first_name;
							var last_name =this.last_name;
							var user_pic =this.user_pic;
							var friend =this.friend;
							if(user_pic==''){
									var picsrc = '/images/user.png';
								}else{
									if(user_pic.indexOf('http') > -1) { 
									    var picsrc = user_pic; 
									} else {
										var picsrc = imagepath+user_pic;
									} 
								}
								$attendies_html.append('<div class="media player"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+last_name+'</h3></div></div>'); 
						});
					}
				});
			}
		});
	}
	/*#########################     Get Active Events   ############################*/
	function GetActiveEvents(profilepage,imagepath){
		var currentloc= $("#current_location_viewlink").val();
		var eventsform = document.getElementById('eventsform');
		var headerform = document.getElementById('headerform');
		var loggedinuser =headerform.user_id.value;
		var orguser = eventsform.user_id.value;
		$.ajax({
			url: '/event/get_active_event/',
			type: 'GET',
			data: {
				user_id: eventsform.user_id.value,
				timezone: eventsform.timezone.value,
				limit: 100,
				friend_id:loggedinuser,
			},
			success:function(data) {
				var $events_html = $('#eventlist');
				$events_html.html('');
				//alert(data);
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						//alert(JSON.stringify(val));
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
						    var user_id =this.user_id;
						    var event_id =this.event_id;
						    var event_name =this.event_name;
						    var event_pic =this.event_pic;
						    var event_location =this.event_location;
						    var event_description =this.event_description;
							
							var tot_intrest =this.tot_intrest;
							var interested_user =this.interested_user;
							var interested = interested_user.split(',');
							var interested_count =interested.length;
							var accept_event=this.accept_event;
							var isIntrested=this.isIntrested;
							//alert(isIntrested);
							if(accept_event==1){
								var Accdisable ='disabled';
							}
							if(isIntrested==1){
								var Intdisable ='disabled';
							}
							if(event_pic !=''){
								var picurl = imagepath+event_pic;
							}else{
								var picurl = '/images/user.png';
							}
							var postmessage ='<div class="postmessage" id="postmessage-'+event_id+'"></div>';
							if(loggedinuser==user_id){
								var single_evnet_url ='/event/single_event/'+event_id;
								var actiondiv ='<div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown"aria-expanded="true">ACTION</button><ul class="dropdown-menu"><li><a href="https://www.google.co.in/maps/dir/'+currentloc+'/'+event_location+'" target="_blank">Navigate</a></li><li><a href="/event/edit_event/'+event_id+'">Edit</a></li><li><a href="javascript:void(0)" class="deleteevent" id="deleteevent-'+event_id+'">Delete</a></li></ul></div>';
								var interestand_going='';
							}else{
								//alert("sdfdfdfdfdf");
								var single_evnet_url ='/event/single_event_user/'+event_id;
								//var interestand_going ='<div class=""><button class="btn btn-blue btn-rounded effect text-uppercase mt-20 pl-40 pr-40 interestedin" id="interestedin-'+event_id+'">Interested</button><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 goingevent" id="goingevent-'+event_id+'">Going</button></div>';
								
								var interestand_going ='<div class=""><button class="btn btn-blue btn-rounded effect text-uppercase mt-20 pl-40 pr-40 interestedin" id="interestedin-'+event_id+'" '+Intdisable+'>Interested</button><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 goingevent" id="goingevent-'+event_id+'" '+Accdisable+'>Going</button></div>';
								var actiondiv='';
							}
							if(profilepage=='/event/view-events/org/'){
								$events_html.append('<div class="media event"><div class="media-left media-top"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100" ></div><div class="media-body pb-20 pl-20"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+'</h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+' '+postmessage+'</div>');
								
							}else{
							
								$events_html.append('<div class="media event" ><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><a href="'+single_evnet_url+'"><h3 class="media-heading">'+event_name+' </h3></a><p>'+event_location+'</p>'+interestand_going+'</div>'+actiondiv+''+postmessage+'</div>');
							}			
						});  
					} else if((key=='data')&& (val=='')){
						$events_html.append('<div class="message">No  event Found !</div>');
							
					}
				}); 
			}
		});
	}
		/*#########################     Get Active Events   ############################*/
	function GetHistoricEvents(){
		var imagepath = $("#uploadspath").val();
		var eventsform = document.getElementById('eventsform');
		var headerform = document.getElementById('headerform');
		var loggedinuser = headerform.user_id.value;
		var orguser = eventsform.user_id.value;
		var user_type = headerform.user_type.value;
		if((user_type=='personal') &&(orguser==loggedinuser)){
			var urls = '/event/get_user_historic_event/';
		}else{
			var urls = '/event/get_historic_event/';
		}
		var currentloc= $("#current_location_viewlink").val();
        $.ajax({
			url: urls,
			type: 'GET',
			 data: {
				user_id: eventsform.user_id.value,
				timezone: eventsform.timezone.value
			}, 
			success:function(data) {
                //alert("success");			
			    var $historic_events_html = $('#history');
				$historic_events_html.html('');
				$.each(data, function (key, val) {
					if((key=='data')&&(val!='')){
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
						    var event_id =this.event_id;
						    var user_id =this.user_id;
						    var event_name =this.event_name;
						    var event_pic =this.event_pic;
						    var event_location =this.event_location;
						    var event_description =this.event_description;
						    var event_start_time =this.event_start_time;
							
							//SPLIT DATE AND TIME 
							var date = new Date(event_start_time);
							var newDate = date.toString('dd-MM-y');
							var parts = newDate.split(" ");
							var Day = parts[2]
							var Month = parts[1];
							var Year = parts[3];
							
							// time split 
							var time12 = tConvert (parts[4]);
							
							if(event_pic !=''){
								var picurl = imagepath+event_pic;
							}else{
								var picurl = '/images/user.png';
							}
							if(loggedinuser==user_id){
								var single_evnet_url ='/event/single_event/'+event_id;
								var actiondiv='<div class="action"><button class="btn btn-green btn-rounded effect text-uppercase mt-20 pl-40 pr-40 dropdown-toggle dropdown-menu-right" data-toggle="dropdown">ACTION</button><ul class="dropdown-menu"><li><a href="/event/edit_event/'+event_id+'">Reuse</a></li><li><a href="https://www.google.co.in/maps/dir/'+currentloc+'/'+event_location+'" target="_blank"id="navigatevent-"'+event_id+'>Navigate</a></li></ul></div>';
							}else{
								var single_evnet_url ='/event/single_event_user/'+event_id;
								var actiondiv='';
							}
							
							$historic_events_html.append('<div class="media event" ><div class="media-left media-middle"><img src="'+picurl+'" class="media-object img-circle" width="100px" height="100px"></div><div class="media-body media-middle"><a href="'+single_evnet_url+'"> <h3 class="media-heading">'+event_name+'</h3></a><p>'+event_location+'</p><p>'+Day+' '+ Month+' '+Year +' '+time12 +'</p></div>'+actiondiv+'</div>');
						});  
					} else if((key=='data')&& (val=='')){
						$historic_events_html.append('<div class="message"> No event Found ! </div>');
					}
				});  
			}
		}); 
	}
	
	/*################  Get get_organization_follower of the user  ###################*/
	
	function get_organization_follower(){
		//alert("fddfdfd");
	    //here we are getting the organization  of the  user whose profile is viewing.
		// it may be loggedin user itself or another user.
		var activityform = document.getElementById('activityform');
		$.ajax({
			url: '/event/get_organization_follower',
			type: 'GET',
			data: {
				user_id: activityform.user_id.value,
				limit: 100
			},
			success:function(data) {
				var $organizations_html = $('.organization-list');
				$organizations_html.html('');
				var userloggedin = headerform.user_id.value;
				var viewuser = activityform.user_id.value;
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
								var picsrc = '/uploads/'+user_pic;
							}
							
							$organizations_html.append('<div class="friend-list relative" id="friend-'+org_follow_id+'"><div class="media mb-20"><div class="media-left media-middle pr-30"><a href="/event/bussiness-profile/'+org_follow_id+'"><img src="'+picsrc + '" class="media-object img-circle" style="width:100px;"></a></div><div class="media-body media-middle"><h3 class="media-heading"> <a href="/event/bussiness-profile/'+org_follow_id+'">'   + first_name + ' '+last_name+ '</a></h3></div></div></div>'); 
							
						});  
					
					}
					if((key=='data') && (val=='')){
						$organizations_html.append('<div class="message">No org found ! </div>');
					}
				});	 
			}
		}); 
	}
	
	/* Get Organization  Type   for the  business profile */
	//    organization/get_organization_type
	function get_organization_type(){
		$.ajax({
			url: '/organization/get_organization_type',
			type: 'GET',
			data: {},
			success:function(data) {
				$("#organization_type").html('');
				$.each(data, function (key, val) {
					if((key=='data') && (val!='')){
						
						$(jQuery.parseJSON(JSON.stringify(val))).each(function() {
							var type_id =this.type_id; 
							var type_name =this.type_name; 
							 $("#organization_type").append('<option value="'+type_name+'">'+type_name+'</option>');
						});
					}
				}); 
			}
		});
	}
	/*Get userby id para-> image path and  userId */
	 function GetUserById(imagepath,user_id){
		// http://35.163.199.28:4000/user/get_user_profile?page=feed&user_id=187&friend_id=187
		$.ajax({
			url: '/user/get_user_profile',
			type: 'GET',
			data: {
				user_id: user_id,
				friend_id:user_id,
			},
			beforeSend:function(){
				//$("#posts").html('<div class="message"><img src="/images/ajax-loader.gif"></div>');
			},
			success:function(data) {
				 var $attendies_html = $('#attendies_user');
				 //$attendies_html.html('');
				$.each(data, function (key, val) {
					if((key=='user') && (val!='')){
						
						  $(jQuery.parseJSON(JSON.stringify(val))).each(function() { 
								var user_id = this.user_id;
								var first_name = this.first_name;
								var last_name = this.last_name; 
								var email = this.email;  
								var gender = this.gender; 
								var user_pic = this.user_pic;
								//alert(user_pic);
								if(user_pic==''){
									var picsrc = '/images/user.png';
								}else{
									if(user_pic.indexOf('http') > -1) { 
									    var picsrc = user_pic; 
									} else {
										var picsrc = imagepath+user_pic;
									} 
								}
								$attendies_html.append('<div class="media player"><div class="media-left media-middle"><img src="'+picsrc+'" class="media-object img-circle" width="100" height="100"></div><div class="media-body media-middle"><h3 class="media-heading">'+first_name+' '+last_name+'</h3></div></div>'); 
						 }); 
					} 
				}); 
			}
		});
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
