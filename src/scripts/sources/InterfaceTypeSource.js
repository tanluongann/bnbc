'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var $ = require('jquery');

var InterfaceTypeActions = require('../actions/InterfaceTypeActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

var InterfaceTypeSource = {

    fetch: function () {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/interface_types",
                type: "GET",
                dataType: "json",
                success: function(data) {
                    resolve(data['list']);
                },
                error: function(e) {
                    reject(e);
                }

            });
        });
    },

};

module.exports = InterfaceTypeSource;