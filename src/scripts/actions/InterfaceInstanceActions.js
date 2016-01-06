'use strict';
//-----------------------------------------
// Dependencies
//-----------------------------------------

var alt = require('../alt');
var update = require('react-addons-update')
var _ = require('lodash');

var InterfaceInstanceSource = require('../sources/InterfaceInstanceSource');

//-----------------------------------------
// Declarations
//-----------------------------------------

class InterfaceInstanceActions {

	// -------------------------
	// Handlers
	// -------------------------

	updateInterfaceInstances(interfaceInstances) {
		return (dispatch) => {
			// Notifiy all observers that the interfaceInstances changed
	    	dispatch(interfaceInstances);
		}
  	}

	fetchInterfaceInstancesFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
	}

	updateInterfaceInstance(interfaceInstance) {
		return (dispatch) => {
			// TODO: Update instance with saving = true
			dispatch(interfaceInstance);
			InterfaceInstanceSource.save(interfaceInstance)
				.then((interfaceInstance) => {
					// TODO: Update instance with saved = true
					dispatch(interfaceInstance);
				})
				.catch((errorMessage) => {
					this.addInterfaceInstancesFailed(errorMessage);
				});
		}
	}

	addInterfaceInstance(interfaceInstance) {
		return (dispatch) => {
			InterfaceInstanceSource.save(interfaceInstance)
				.then((interfaceInstance) => {
					dispatch(interfaceInstance);
				})
				.catch((errorMessage) => {
					this.addInterfaceInstancesFailed(errorMessage);
				});

		}
	}

	addInterfaceInstancesFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
	}


	// -------------------------
	// Triggers
	// -------------------------

	fetchInterfaceInstances() {
		return (dispatch) => {
			// we dispatch an event here so we can have "loading" state.
			dispatch();
			InterfaceInstanceSource.fetch()
				.then((interfaceInstances) => {
					// we can access other actions within our action through `this.actions`
					this.updateInterfaceInstances(interfaceInstances);
				})
				.catch((errorMessage) => {
					this.fetchInterfaceInstancesFailed(errorMessage);
				});
		}
	}

	fakeUpdateInterfaceInstances() {
		return (dispatch) => {
			// Notifiy all the observers that nothing changed
			dispatch({});
		}
	}

}

console.log('InterfaceInstanceActions loaded...');
module.exports = alt.createActions(InterfaceInstanceActions);
