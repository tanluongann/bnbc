'use strict';
//-----------------------------------------
// Dependencies
//-----------------------------------------

var alt = require('../alt');
var update = require('react-addons-update')
var _ = require('lodash');

var InterfaceTypeSource = require('../sources/InterfaceTypeSource');

//-----------------------------------------
// Declarations
//-----------------------------------------

class InterfaceTypeActions {

	// -------------------------
	// Handlers
	// -------------------------

	updateInterfaceTypes(interfaceTypes) {
		return (dispatch) => {
			// Notifiy all observers that the interfaceTypes changed
	    	dispatch(interfaceTypes);
		}
  	}

	fetchInterfaceTypesFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
	}

	updateInterfaceType(interfaceType) {
		return (dispatch) => {
			// Notifiy all the observers that a interface_type has been added
			dispatch(interfaceType);
		}
	}

	// addInterfaceType(interface_type) {
	// 	return (dispatch) => {
	// 		// Notifiy all the observers that a interface_type has been added
	// 		dispatch(interface_type);
	// 	}
	// }

	// -------------------------
	// Triggers
	// -------------------------

	fetchInterfaceTypes() {
		return (dispatch) => {
			// we dispatch an event here so we can have "loading" state.
			dispatch();
			InterfaceTypeSource.fetch()
				.then((interfaceTypes) => {
					// we can access other actions within our action through `this.actions`
					this.updateInterfaceTypes(interfaceTypes);
				})
				.catch((errorMessage) => {
					this.fetchInterfaceTypesFailed(errorMessage);
				});
		}
	}

	fakeUpdateInterfaceTypes() {
		return (dispatch) => {
			// Notifiy all the observers that nothing changed
			dispatch({});
		}
	}

}

console.log('InterfaceTypeActions loaded...');
module.exports = alt.createActions(InterfaceTypeActions);
