'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var OverviewPanel = require('./OverviewPanel');
var BookingPanel = require('./BookingPanel');

var PrepareTripCard = require('../cards/PrepareTripCard');
var JoinCommunityCard = require('../cards/JoinCommunityCard');
var LocalAlertCard = require('../cards/LocalAlertCard');
var JoinEventCard = require('../cards/JoinEventCard');

var ContentPanel = React.createClass({

    getInitialState: function() {
        return {
            "mounted": false,
        };
    },

    onChange: function(state) {
        this.setState(state);
    },

    componentDidMount: function() {
        this.setState({ mounted: true });
    },

    render: function() {

        var bookings = [
            {
                "date": "Tomorrow",
                "place": {
                    "name": "Longyang guangchang",
                    "address": {
                        "english": "Shanghai city, Pudong new area, 1880 Longyang road, Bdg 44, Apt 230",
                        "local": "上海市 浦东新区, 龙阳路1880弄 44号 230室",
                    },
                    "city": "Shanghai",
                    "country": "China",
                    "picture": "1.jpg",
                },
                "duration": 3,
            },
            {
                "date": "Next Thursday",
                "place": {
                    "name": "Parimonami",
                    "address": {
                        "english": "Paris city, District 13, 32 park street",
                        "local": "Paris, 13eme arrondissement, 32 rue du parc",
                    },
                    "city": "Paris",
                    "country": "France",
                    "picture": "2.jpg",
                },
                "duration": 7,
            },
        ];

        var communities = [
            {
                "name": "The Maglev lovers",
                "icon": "community-0.jpg",
            },
            {
                "name": "Shanghai gastronomy",
                "icon": "community-1.jpg",
            },
        ];

        var alerts = [
            {
                "title": "Hurricane alert in Shanghai",
                "date": "Tomorrow 08:00 am",
                "icon": "alert-0.jpg",
            },
        ];

        var events = [
            {
                "name": "Hiking in Anji forest",
                "date": "Friday Jan 12th",
                "icon": "event-0.jpg",
            },
        ];

        var page = {"name": "home", "model": {}};
        if (this.props.app.state.appInfo.page) page = this.props.app.state.appInfo.page;
        var classes = ['contentpanel'];
        if (!this.state.mounted) classes.push('mounting');

        var el = <div className={ classes.join(" ") } >No page { page.name }</div>;
        if (page.name == 'home') {
            el = <div className={ classes.join(" ") } >
                <OverviewPanel key="op1" app={ this.props.app } />
                <PrepareTripCard key="ptc1" app={ this.props.app } booking={ bookings[0] } />
                <JoinCommunityCard key="jcc2" community={ communities[0] } />
                <JoinEventCard key="jec5" event={ events[0] } />
                <LocalAlertCard key="lac4" alert={ alerts[0] } />
                <JoinCommunityCard key="jcc3" community={ communities[1] } />
            </div>
        }
        else if (page.name == 'booking') {
            el = <div className={ classes.join(" ") } >
                <BookingPanel key="bkp1" app={ this.props.app } booking={ page.model } />
            </div>
        }

        return el;
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['ContentPanel'] = ContentPanel;
module.exports = ContentPanel;
