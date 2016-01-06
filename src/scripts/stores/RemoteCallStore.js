'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var alt = require('../alt');
var update = require('react-addons-update')

var RemoteCallActions = require('../actions/RemoteCallActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

class RemoteCallStore {

    constructor() {
        // Initialising the store data
        this.remoteCalls = {};

        // Binding the actions' events to store response
        this.bindListeners({
            handleUpdateRemoteCalls: RemoteCallActions.updateRemoteCalls,
            handleUpdateRemoteCall: RemoteCallActions.updateRemoteCall,
            handleRemoteCallFailed: RemoteCallActions.remoteCallFailed,
            handleMakeRemoteCall: RemoteCallActions.makeRemoteCall
        });
    }

    handleUpdateRemoteCalls(remoteCalls) {
        // Updating all the store's remote calls
        this.remoteCalls = remoteCalls;
        this.errorMessage = null;
    }

    handleUpdateRemoteCall(remoteCall) {
        // Updating the remote call
        var id = remoteCall.id;
        this.remoteCalls = update(this.remoteCalls, {[id]: { $set: remoteCall}} );
        this.errorMessage = null;
    }

    handleMakeRemoteCall(remoteCall) {
        // Updating the remote call
        var id = remoteCall.id;
        this.remoteCalls = update(this.remoteCalls, {[id]: { $set: remoteCall}} );
        this.errorMessage = null;
    }

    handleRemoteCallFailed(error) {
        // We only set the error
        this.errorMessage = error;
    }



}

module.exports = alt.createStore(RemoteCallStore, 'RemoteCallStore');