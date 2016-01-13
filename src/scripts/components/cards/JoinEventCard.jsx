'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var JoinEventCard = React.createClass({

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
        
        return <article className={ classes.join(" ") } >
            <span className="title">Join the event <em>{ this.props.event.name }</em></span>
            <span className="date">{ this.props.event.date }</span>
        </article>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['JoinEventCard'] = JoinEventCard;
module.exports = JoinEventCard;
