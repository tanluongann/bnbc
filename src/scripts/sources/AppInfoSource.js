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
                page: 'iil0',
                loggedUser: {
                    "name": "Jeremy",
                    "email": "jeremy@gmail.com",
                    "picture": "tiao3.jpg",
                }
            // });
            }
            resolve(appInfo);

        });
    }

};

module.exports = AppInfoSource;