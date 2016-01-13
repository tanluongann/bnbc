'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var BookingCard = React.createClass({

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
        
        var classes = ['card', 'alert', 'local'];
        if (!this.state.mounted) classes.push('mounting');
        
        return <article className={ classes.join(" ") } >
            <span className="title">{ this.props.alert.title }</span>
            <span className="date">{ this.props.alert.date }</span>
        </article>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['BookingCard'] = BookingCard;
module.exports = BookingCard;
