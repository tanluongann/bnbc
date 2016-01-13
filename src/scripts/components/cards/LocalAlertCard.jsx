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
        
        var style = {
            "background": "url(/static/img/alerts/"+this.props.alert.icon+")",
        }
        
        return <article className={ classes.join(" ") } >
            <span className="icon" style={ style } ></span>
            <span className="content">
                <span className="title">{ this.props.alert.title }</span>
                <span className="date">{ this.props.alert.date }</span>
            </span>
        </article>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['BookingCard'] = BookingCard;
module.exports = BookingCard;
