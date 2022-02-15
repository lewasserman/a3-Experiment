const addParticipant = function(e) {
  const json = { participantId: e.participantId },
        body = JSON.stringify( json )

    fetch( '/add-participant', {
        method:'POST',
        body 
    })
    .then( function( response ) {
        return response.json()
    })
    .then( function( json ) {
        console.log(json)
    })

    return false
}

window.onload = function() {
  addParticipant({
    participantId: "examplePid"
  });
  // addTrial(
  //   {
  //     trialId: "exampleTid",
  //     truePerct: 50,
  //     repPerct: 60,
  //     type: "bar",
  //     participantId: "examplePid"
  //   }
  // );
  // getAllTrials();
  // getTrial("examplePid");
}