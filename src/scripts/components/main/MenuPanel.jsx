'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var MenuPanel = React.createClass({

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
        var classes = ['menupanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <ul className={ classes.join(" ") } >
            <li><i className="fa fw fa-home"></i>Book a place</li>
            <li><i className="fa fw fa-user"></i>My profile</li>
            <li><i className="fa fw fa-bookmark"></i>My Bookings</li>
            <li><i className="fa fw fa-calendar"></i>My Events</li>
            <li><i className="fa fw fa-history"></i>History</li>
            <li><i className="fa fw fa-users"></i>Communities <span className="badgenew">4</span></li>
        </ul>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['MenuPanel'] = MenuPanel;
module.exports = MenuPanel;
