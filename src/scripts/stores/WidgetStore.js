'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var alt = require('../alt');
var update = require('react-addons-update')

var WidgetActions = require('../actions/WidgetActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

class WidgetStore {

    constructor() {
        // Initialising the store data
        this.widgets = [];
        this.errorMessage = null;
        // Binding the actions' events to store response
        this.bindListeners({
            handleUpdateWidgets: WidgetActions.updateWidgets,
            handleUpdateWidget: WidgetActions.updateWidget,
            handleAddWidget: WidgetActions.addWidget,
            handleFetchWidgetsFailed: WidgetActions.fetchWidgetsFailed
        });
    }

    handleUpdateWidget(widget) {
        // Getting the indexes to go update the widget in the store
        var wgId = widget.key.split('-')[0];
        var wgInd = _.findIndex(this.widgets, function(e){ return e.key == wgId; });
        var wInd = _.findIndex(this.widgets[wgInd]['widgets'], function(e){ return e.key == widget.key; });
        // Performing the update (with immutable helpers)
        this.widgets = update(this.widgets, { [wgInd]: {'widgets': { [wInd]: { $set: widget }}}});
        this.errorMessage = null;
    }

    handleUpdateWidgets(widgets) {
        // Performing the full update
        this.widgets = widgets;
        this.errorMessage = null;
    }

    handleFetchWidgetsFailed(error) {
        // Just setting the error, we keep previous widgets
        this.errorMessage = error;
    }

    handleAddWidget(widget) {
        var wgId = widget.key.split('-')[0];
        var wgInd = _.findIndex(this.widgets, function(e){ return e.key == wgId; });
        // Performing the insert (with immutable helpers)
        this.widgets = update(this.widgets, { [wgInd]: {'widgets': { $push: [widget] }}});
        this.errorMessage = null;
    }

}

module.exports = alt.createStore(WidgetStore, 'WidgetStore');