'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');

var RemoteCallActions = require('../actions/RemoteCallActions');
var WidgetActions = require('../actions/WidgetActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

var RemoteCallSource = {

    make: function (remoteCall) {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {
            // simulate an asynchronous action where data is fetched on a remote server somewhere.
            setTimeout(function () {
                remoteCall.status = 'done';
                remoteCall.message = 'Balalala';
                resolve(remoteCall);
                WidgetActions.updateWidget(
                    { key: "g1-w3", name: "Lamp 1 Widget", type: "ToggleWidgetContent",
                            icon: 'fa-lightbulb-o',
                            devices: {
                            "main": {
                                "status": "on",
                                "name": "Bedroom Lamp 2",
                            }
                    }}
                )
            }, 2000);
        });
    }
};

module.exports = RemoteCallSource;