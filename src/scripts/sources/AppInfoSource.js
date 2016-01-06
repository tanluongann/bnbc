'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');

var AppInfoActions = require('../actions/AppInfoActions');
var WidgetActions = require('../actions/WidgetActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

var AppInfoSource = {

    fetch: function () {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {

            // var appInfo = AppInfoActions.updateAppInfo({
            var appInfo = {
                dashboard: {
                    modal: {
                        status: "closed",
                        content: "",
                        model: null,
                    },
                    page: 'iil0',
                },
            // });
            }
            resolve(appInfo);

        });
    }

};

module.exports = AppInfoSource;