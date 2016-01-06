'use strict';

//-----------------------------------------
// Dependencies
//-----------------------------------------

var _ = require('lodash');

var WidgetActions = require('../actions/WidgetActions');

//-----------------------------------------
// Declarations
//-----------------------------------------

var allWidgets = [

    { key: "g1", name: "Performance Testing", widgets: [
        { key: "g1-w1", name: "Lamp 1 Widget", type: "ToggleWidgetContent",
            icon: 'fa-lightbulb-o',
            devices: {
                "main": {
                    status: "on",
                    name: "Bedroom Lamp 1",
                }
        }},
        { key: "g1-w3", name: "Door 1 Widget", type: "ToggleWidgetContent",
            icon: 'fa-lightbulb-o',
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
        { key: "g1-w6", name: "Torrent downloader", type: "DownloadsWidgetContent",
            icon: 'fa-download',
            devices: {
                "main": {
                    completed: ['Dr Who S09E04', 'Daredevil S02E01', 'Fear the Walking Dead S02E01'],
                    added: ['Daredevil S02E01', 'Fear the Walking Dead S02E01'],
                    downloadSpeed: 2456,
                    uploadSpeed: 45,
                    status: "downloading",
                    name: "Torrents",
                }
            }
        },
    ]},

    { key: "g5", name: "Regression Testing", widgets: [
        { key: "g5-w1", name: "Door 1 Widget", type: "PresenceWidgetContent",
            devices: {
                "main": {
                    status: "idle",
                    armed: 0,
                    name: "Front door",
                }
        }},
        { key: "g5-w3", name: "Door 1 Widget", type: "ToggleWidgetContent",
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
    ]},


    { key: "g2", name: "Automated Testing (QTP)", widgets: [
        { key: "g2-w1", name: "Door 1 Widget", type: "PresenceWidgetContent",
            devices: {
                "main": {
                    status: "idle",
                    armed: 0,
                    name: "Front door",
                }
        }},
        { key: "g2-w3", name: "Door 1 Widget", type: "ToggleWidgetContent",
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
        { key: "g2-w2", name: "Door 1 Widget", type: "PresenceWidgetContent",
            devices: {
                "main": {
                    status: "tripped",
                    armed: 1,
                    name: "Office door",
                }
        }},
        { key: "g2-w5", name: "Door 1 Widget", type: "LockWidgetContent",
            devices: {
                "main": {
                    status: "locked",
                    name: "Office door",
                }
        }},
        { key: "g2-w6", name: "Phone Tiao", type: "PhoneWidgetContent",
            devices: {
                "main": {
                    missedCalls: [{from: "Jeremy", at: 145323343}],
                    messages: [],
                    battery: 45,
                    sound: 'silent',
                    ringing: false,
                    shaking: true,
                    name: "Phone Tiao",
                }
            }
        },
        { key: "g2-w7", name: "Door 1 Widget", type: "LockWidgetContent",
            devices: {
                "main": {
                    status: "unlocked",
                    name: "Main door",
                }
        }},
    ]},

    { key: "g3", name: "Manual Testing", widgets: [
        { key: "g3-w3", name: "Door 1 Widget", type: "ToggleWidgetContent",
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
        { key: "g3-w4", name: "Door 1 Widget", type: "ToggleWidgetContent",
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
        { key: "g3-w5", name: "Door 1 Widget", type: "WeatherWidgetContent",
            devices: {
                "main": {
                    name: "Weather",
                    city: "Rully",
                    currentTemp: 17,
                    maxTemp: 19,
                    minTemp: 12,
                    weather: 'lightning',
                    weatherText: 'Lightning',
                    flag: 'clear',
                }
        }},
    ]},

    { key: "g6", name: "Exploration Testing", widgets: [
        { key: "g6-w1", name: "Door 1 Widget", type: "PresenceWidgetContent",
            devices: {
                "main": {
                    status: "idle",
                    armed: 0,
                    name: "Front door",
                }
        }},
        { key: "g6-w3", name: "Door 1 Widget", type: "ToggleWidgetContent",
            devices: {
                "main": {
                    status: "off",
                    name: "Bedroom Lamp 2",
                }
        }},
        { key: "g6-w4", name: "Door 1 Widget", type: "FacebookWidgetContent",
            devices: {
                "main": {
                    messages: ["off"],
                    notifications: ["Bedroom Lamp 2", "sss", "erer"],
                    name: "Facebook Tiao",
                }
        }},
    ]},




    { key: "g4", name: "Security Testing", widgets: [
        { key: "g4-w1", name: "Quote", type: "QuoteWidgetContent",
            devices: {
                "main": {
                    name: "Today's quote",
                    quote: "Le temps d'un cafe, c'est du temps casse.",
                    author: 'Jeremy',
                }
        }},
        { key: "g4-w2", name: "Internet", type: "ConnectionWidgetContent",
            devices: {
                "main": {
                    name: "Internet",
                    status: "poor",
                }
        }},
        { key: "g4-w3", name: "Jeremy's Emails", type: "EmailsWidgetContent",
            devices: {
                "main": {
                    name: "Jeremy's Emails",
                    unread: ["Jeremy's Emails", "Plop", "Pic"],
                    today: ["Jeremy's Emails", "Plop", "Pic", "Pic", "Pic", "Pic"],
                    status: "active",
                }
        }},
    ]},

]

var WidgetSource = {

    fetch: function () {
        // returning a Promise because that is what fetch does.
        return new Promise(function (resolve, reject) {
            // simulate an asynchronous action where data is fetched on
            // a remote server somewhere.
            setTimeout(function () {
                // resolve with some mock data
                resolve(allWidgets);
            }, 250);
        });
    },

};

module.exports = WidgetSource;