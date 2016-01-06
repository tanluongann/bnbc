'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var alt = require('../alt');
var update = require('react-addons-update')
var _ = require('lodash');

var AppInfoSource = require('../sources/AppInfoSource');

//-----------------------------------------
// Declarations
//-----------------------------------------

class AppInfoActions {

	// -------------------------
	// Handlers
	// -------------------------

	updateAppInfo(appInfo) {
		return (dispatch) => {
			// Sending the remote call to the store
	    	dispatch(appInfo);
	  	}
  	}

	updatePartialAppInfo(appInfo) {
		return (dispatch) => {
			// Sending the remote call to the store
	    	dispatch(appInfo);
	  	}
  	}

	appInfoFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
  	}

	// -------------------------
	// Triggers
	// -------------------------

	showDashboardModal(contentType, model) {
		return (dispatch) => {
			var pack = { "content": contentType, "model": model}
			dispatch(pack);
		}
    }

	changePage(page) {
		return (dispatch) => {
			var pack = { "page": page }
			dispatch(pack);
		}
    }

	fetchAppInfo(callerId, parameters) {
		return (dispatch) => {
			AppInfoSource.fetch()
			.then((appInfo) => {
				this.updateAppInfo(appInfo);
			})
			.catch((errorMessage) => {
				this.appInfoFailed(errorMessage);
			});
		}
  	}

}

console.log('AppInfoActions loaded...');
module.exports = alt.createActions(AppInfoActions);
