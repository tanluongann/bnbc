'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');
var $ = require('jquery');

var InterfaceInstanceActions = require('../actions/InterfaceInstanceActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

var InterfaceInstanceSource = {

    fetch: function() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "/interface_instances",
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

    save: function(el) {

        // Make the difference between create and update
        var url = "/interface_instances";
        if (el['key'] > 0) url = "/interface_instances" + el['key'];

        return new Promise(function (resolve, reject) {
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(el),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data) {
                    resolve(data);
                },
                error: function(e) {
                    reject(e);
                }
            });
        });
    }

};

module.exports = InterfaceInstanceSource;