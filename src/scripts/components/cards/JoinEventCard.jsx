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
        
        var style = {
            "background": "url(/static/img/events/"+this.props.event.icon+")",
        }
        
        return <a href="#" className={ classes.join(" ") } >
            <span className="icon" style={ style } ></span>
            <span className="content">
                <span className="intro">Join event</span>
                <span className="title">{ this.props.event.name }</span>
                <span className="date">{ this.props.event.date }</span>
            </span>
        </a>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['JoinEventCard'] = JoinEventCard;
module.exports = JoinEventCard;
