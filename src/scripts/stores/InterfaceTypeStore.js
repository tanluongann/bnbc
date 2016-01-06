'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var alt = require('../alt');
var update = require('react-addons-update')

var InterfaceTypeActions = require('../actions/InterfaceTypeActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

class InterfaceTypeStore {

    constructor() {
        // Initialising the store data
        this.interfaceTypes = [];
        this.errorMessage = null;
        // Binding the actions' events to store response
        this.bindListeners({
            handleUpdateInterfaceTypes: InterfaceTypeActions.updateInterfaceTypes,
            handleUpdateInterfaceType: InterfaceTypeActions.updateInterfaceType,
            handleFetchInterfaceTypesFailed: InterfaceTypeActions.fetchInterfaceTypesFailed
        });
    }

    handleUpdateInterfaceType(interfaceType) {
        // Getting the indexes to go update the interfaceType in the store
        var wgId = interfaceType.key.split('-')[0];
        var wgInd = _.findIndex(this.interfaceTypes, function(e){ return e.key == wgId; });
        var wInd = _.findIndex(this.interfaceTypes[wgInd]['interfaceTypes'], function(e){ return e.key == interfaceType.key; });
        // Performing the update (with immutable helpers)
        this.interfaceTypes = update(this.interfaceTypes, { [wgInd]: {'interfaceTypes': { [wInd]: { $set: interfaceType }}}});
        this.errorMessage = null;
    }

    handleUpdateInterfaceTypes(interfaceTypes) {
        // Performing the full update
        this.interfaceTypes = interfaceTypes;
        this.errorMessage = null;
    }

    handleFetchInterfaceTypesFailed(error) {
        // Just setting the error, we keep previous interfaceTypes
        this.errorMessage = error;
    }

    static getById(id) {
        return _.find(this.state.interfaceTypes, function(el) {
            var match = el.id == id;
            return match;
        });
    }

    static getAll() {
        return this.state.interfaceTypes;
    }

    // handleAddInterfaceType(interfaceType) {
    //     var wgId = interfaceType.key.split('-')[0];
    //     var wgInd = _.findIndex(this.interfaceTypes, function(e){ return e.key == wgId; });
    //     // Performing the insert (with immutable helpers)
    //     this.interfaceTypes = update(this.interfaceTypes, { [wgInd]: {'interfaceTypes': { $push: [interfaceType] }}});
    //     this.errorMessage = null;
    // }

}

module.exports = alt.createStore(InterfaceTypeStore, 'InterfaceTypeStore');