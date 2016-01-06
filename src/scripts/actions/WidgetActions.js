'use strict';
//-----------------------------------------
// Dependencies
//-----------------------------------------

var alt = require('../alt');
var update = require('react-addons-update')
var _ = require('lodash');

var WidgetSource = require('../sources/WidgetSource');

//-----------------------------------------
// Declarations
//-----------------------------------------

class WidgetActions {

	// -------------------------
	// Handlers
	// -------------------------

	updateWidgets(widgets) {
		return (dispatch) => {
			// Notifiy all observers that the widgets changed
	    	dispatch(widgets);
		}
  	}

	fetchWidgetsFailed(errorMessage) {
		return (dispatch) => {
			// Notifiy all observers that we got an error
			dispatch(errorMessage);
		}
	}

	updateWidget(widget) {
		return (dispatch) => {
			// Notifiy all the observers that a widget has been added
			dispatch(widget);
		}
	}

	addWidget(widget) {
		return (dispatch) => {
			// Notifiy all the observers that a widget has been added
			dispatch(widget);
		}
	}

	// -------------------------
	// Triggers
	// -------------------------

	fetchWidgets() {
		return (dispatch) => {
			// we dispatch an event here so we can have "loading" state.
			dispatch();
			WidgetSource.fetch()
				.then((widgets) => {
					// we can access other actions within our action through `this.actions`
					this.updateWidgets(widgets);
				})
				.catch((errorMessage) => {
					this.fetchWidgetsFailed(errorMessage);
				});
		}
	}

	fakeUpdateWidgets() {
		return (dispatch) => {
			// Notifiy all the observers that nothing changed
			dispatch({});
		}
	}

}

console.log('WidgetActions loaded...');
module.exports = alt.createActions(WidgetActions);
