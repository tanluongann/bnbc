'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var TaxiBookingCard = React.createClass({

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
        var classes = ['card', 'join', 'event'];
        if (!this.state.mounted) classes.push('mounting');

        var style = {
            "background": "url(/static/img/taxi.jpg)",
        }

        return <a href="#" className={ classes.join(" ") } >
            <span className="icon" style={ style } ></span>
            <span className="content">
                <span className="intro">Book car</span>
                <span className="title">Get a car to pick you at your arrival</span>
            </span>
        </a>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['TaxiBookingCard'] = TaxiBookingCard;
module.exports = TaxiBookingCard;
