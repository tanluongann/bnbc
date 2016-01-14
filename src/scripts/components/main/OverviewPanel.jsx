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

            <div className="pages">

                <div className="page location">
                    <span className="label">
                        <i className="fa fw fa-map-marker"></i>&nbsp;
                        Currently in <span className="city">Shanghai</span></span>
                    <span className="time">18:30</span>
                    <span className="weather">
                        <span className="temperature">
                            <span className="value">21</span>
                            <span className="unit">&deg;C</span>
                        </span>
                        <i className="wi wi-day-sunny"></i>
                    </span>
                    <span className="exchange">
                        <i className="fa fw fa-line-chart"></i>&nbsp;
                        <span className="rate provtodest">
                            <span className="value">1</span>
                            <span className="currency">€</span> 
                            =
                            <span className="value">7.15</span>
                            <span className="currency">¥</span>
                        </span>
                        &nbsp;&bull;&nbsp;
                        <span className="rate desttoprov">
                            <span className="value">1</span>
                            <span className="currency">¥</span>
                            = 
                            <span className="value">0.14</span>
                            <span className="currency">€</span> 
                        </span>
                    </span>
                </div>

                <div className="page user">
                    <span className="name">Jeremy Tan</span>
                </div>
    
            </div>

        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['OverviewPanel'] = OverviewPanel;
module.exports = OverviewPanel;
