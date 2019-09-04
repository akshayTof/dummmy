// replace these values with those generated in your TokBox Account
/* var apiKey = "46051402";
var sessionId = "e7fef484c4b21b873ecd77710320a19396df5b25";
var token ="T1==cGFydG5lcl9pZD00NjA1MTQwMiZzaWc9MzQ2NDgyODJlZGY0YTNiMzJjNjc2ZThhNDhmYzFmNmU1YWIzNmMzYTpzZXNzaW9uX2lkPTJfTVg0ME5qQTFNVFF3TW41LU1UVXhOelUxTlRBeU56UTRNSDV2VEd4TVJFUnBWREkwY1RONlluQnZZazVqY1dGSVZtRi1VSDQmY3JlYXRlX3RpbWU9MTUxNzU1NTA0OSZub25jZT0wLjcxMjkzNzEyMDgwODE2Nzgmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxNzU3NjY0OCZjb25uZWN0aW9uX2RhdGE9ZmRmJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9"; */

// Handling all of our errors here by alerting them.
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
//initializeSession();
initializeSession(apiKey,sessionId,token)

function initializeSession(apiKey,sessionId,token) {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

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
