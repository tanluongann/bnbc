'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var BookingCard = require('../cards/BookingCard');

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
                "date": 151232134,
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
                "date": 151232134,
                "place": {
                    "name": "Parimonami",
                    "address": "37 rue du bourg, blabla",
                    "city": "Paris",
                    "country": "France",
                    "photo": 2,
                },
                "duration": 7,
            }
        ];
        
        var classes = ['contentpanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >
            <BookingCard key="b1" booking={ bookings[0] } />
            <BookingCard key="b2" booking={ bookings[1] } />
        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['ContentPanel'] = ContentPanel;
module.exports = ContentPanel;
