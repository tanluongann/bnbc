'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var alt = require('../alt');
var update = require('react-addons-update')

var InterfaceInstanceActions = require('../actions/InterfaceInstanceActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

class InterfaceInstanceStore {

    constructor() {
        // Initialising the store data
        this.interfaceInstances = [];
        this.errorMessage = null;
        // Binding the actions' events to store response
        this.bindListeners({
            handleUpdateInterfaceInstances: InterfaceInstanceActions.updateInterfaceInstances,
            handleUpdateInterfaceInstance: InterfaceInstanceActions.updateInterfaceInstance,
            handleFetchInterfaceInstancesFailed: InterfaceInstanceActions.fetchInterfaceInstancesFailed,
            handleAddInterfaceInstance: InterfaceInstanceActions.addInterfaceInstance,
            handleAddInterfaceInstancesFailed: InterfaceInstanceActions.addInterfaceInstancesFailed,
        });
    }

    handleUpdateInterfaceInstance(interfaceInstance) {
        // Getting the indexes to go update the interfaceInstance in the store
        var ind = _.findIndex(this.interfaceInstances, function(e){ return e.key == interfaceInstance.key; });

        // this.setState({
        //     data: update(this.state.data, {$splice: [[index, 1]]})
        // })
        // Performing the update (with immutable helpers)
        this.interfaceInstances = update(this.interfaceInstances, { [ind]: { $merge: interfaceInstance }});
        this.errorMessage = null;
    }

    handleUpdateInterfaceInstances(interfaceInstances) {
        // Performing the full update
        this.interfaceInstances = interfaceInstances;
        this.errorMessage = null;
    }

    handleFetchInterfaceInstancesFailed(error) {
        // Just setting the error, we keep previous interfaceInstances
        this.errorMessage = error;
    }

    handleAddInterfaceInstance(interfaceInstance) {
        // Performing the insert (with immutable helpers)
        this.interfaceInstances = update(this.interfaceInstances, { $push: [interfaceInstance] });
        this.errorMessage = null;
    }

    handleAddInterfaceInstancesFailed(error) {
        // Just setting the error, we keep previous interfaceInstances
        this.errorMessage = error;
    }

}

module.exports = alt.createStore(InterfaceInstanceStore, 'InterfaceInstanceStore');