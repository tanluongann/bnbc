'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var alt = require('../alt');
var update = require('react-addons-update')

var AppInfoActions = require('../actions/AppInfoActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

class AppInfoStore {

    constructor() {
        // Initialising the store data
        this.appInfo = {};

        // Binding the actions' events to store response
        this.bindListeners({
            handleUpdateAppInfo: AppInfoActions.updateAppInfo,
            handleUpdatePartialAppInfo: AppInfoActions.updatePartialAppInfo,
            handleAppInfoFailed: AppInfoActions.appInfoFailed,
            handleChangePage: AppInfoActions.changePage,
            handleLogUserIn: AppInfoActions.logUserIn,
        });
    }

    handleChangePage(pack) {
        var partialAppInfo = { }
        var tmp = _.merge(partialAppInfo, this.appInfo);
        tmp['page'] = pack.page;
        this.appInfo = tmp;
    }

    handleLogUserIn(pack) {
        var partialAppInfo = { }
        var tmp = _.merge(partialAppInfo, this.appInfo);
        tmp['loggedUser'] = pack.user;
        this.appInfo = tmp;
        console.log(this.appInfo);
    }

    handleUpdateAppInfo(appInfo) {
        // Updating all the store's remote calls
        this.appInfo = appInfo;
        this.errorMessage = null;
    }

    handleUpdatePartialAppInfo(partialAppInfo) {
        // Updating all the store's remote calls
        this.appInfo = _.merge(partialAppInfo, this.appInfo);
        this.errorMessage = null;
    }

    handleAppInfoFailed(error) {
        // We only set the error
        this.errorMessage = error;
    }



}

module.exports = alt.createStore(AppInfoStore, 'AppInfoStore');