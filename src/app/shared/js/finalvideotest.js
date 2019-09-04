    // Initialize an OpenTok Session object
	if (OT.checkSystemRequirements() == 1) {
	  var session = OT.initSession(apiKey, sessionId);
	} else {
	   alert("The client does not support WebRTC")
	}
	//var session = OT.initSession(apiKey, sessionId);

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
		  },
		  sessionDisconnected:function(event){
			  // The event is defined by the SessionDisconnectEvent class
			  if (event.reason == "networkDisconnected") {
				alert("Your network connection terminated.")
			  }
		  }

	});

// Connect to the Session using the 'apiKey' of the application and a 'token' for permission
//session.connect(token);
session.connect(token, function (error) {
  if (error) {
    console.log("Failed to connect.");
  } else {
    console.log('You have connected to the session.');
  }
});
