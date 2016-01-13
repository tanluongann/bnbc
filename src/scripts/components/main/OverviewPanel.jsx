'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var OverviewPanel = require('./OverviewPanel');
var BookingCard = require('../cards/BookingCard');

var OverviewPanel = React.createClass({

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
        
        var userInfo = {
            "current":  {
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
            "next": {
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
        };
        
        var classes = ['overviewpanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >
            <div className="location current">
                <span className="city">Paris</span>
                <span className="time">18:30</span>
                <span className="weather">Rainy</span>
            </div>
        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['OverviewPanel'] = OverviewPanel;
module.exports = OverviewPanel;
