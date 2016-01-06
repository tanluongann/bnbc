'use strict';
//-----------------------------------------
// Dependencies
//-----------------------------------------

var alt = require('../alt');
var update = require('react-addons-update')
var _ = require('lodash');

var RemoteCallSource = require('../sources/RemoteCallSource');

//-----------------------------------------
// Declarations
//-----------------------------------------

class RemoteCallActions {

	// -------------------------
	// Handlers
	// -------------------------

	updateRemoteCalls() {
		return (dispatch) => {
			// Updating remote calls
	    	dispatch();
		}
  	}

	updateRemoteCall(remoteCall) {
		return (dispatch) => {
			// Sending the remote call to the store
    		dispatch(remoteCall);
		}
  	}

	remoteCallFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
	}

	// -------------------------
	// Triggers
	// -------------------------

	makeRemoteCall(callerId, parameters) {
		return (dispatch) => {
			var nrc = {
				"id": _.uniqueId('rc_'),
	            "status": 'pending',
				"caller": callerId,
				"parameters": parameters,
				"response": {}
			};
	    	dispatch(nrc);
			// this.actions.updateRemoteCall(nrc);
			RemoteCallSource.make(nrc)
				.then((remoteCall) => {
					this.updateRemoteCall(remoteCall);
				})
				.catch((errorMessage) => {
					this.remoteCallFailed(errorMessage);
				});
		}
  	}

}

console.log('RemoteCallActions loaded...');
module.exports = alt.createActions(RemoteCallActions);
