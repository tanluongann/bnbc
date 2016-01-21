'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var OverviewPanel = require('./OverviewPanel');

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
                    "address": "1088 Longyang Road, blabla",
                    "city": "Shanghai",
                    "country": "China",
                    "photo": 1,
                },
                "duration": 3,
            },
            {
                "date": "Next Thursday",
                "place": {
                    "name": "Parimonami",
                    "address": "37 rue du bourg, blabla",
                    "city": "Paris",
                    "country": "France",
                    "photo": 2,
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
        
        var classes = ['contentpanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >
            <OverviewPanel key="op1" app={ this.props.app } />
            <PrepareTripCard key="ptc1" booking={ bookings[0] } />
            <JoinCommunityCard key="jcc2" community={ communities[0] } />
            <JoinEventCard key="jec5" event={ events[0] } />
            <LocalAlertCard key="lac4" alert={ alerts[0] } />
            <JoinCommunityCard key="jcc3" community={ communities[1] } />
        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['ContentPanel'] = ContentPanel;
module.exports = ContentPanel;
