'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var PrepareTripCard = React.createClass({

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
        var classes = ['card', 'prepare-trip'];
        if (!this.state.mounted) classes.push('mounting');
        
        var style = {
            "background": "url(/static/img/prepare.jpg)",
        }
        
        return <article className={ classes.join(" ") } >
            <span className="icon" style={ style } ></span>
            <span className="content">
                <span className="title">Prepare trip to <em>{ this.props.booking.place.name }</em></span>
                <span className="date">{ this.props.booking.date }</span>
            </span>
        </article>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['PrepareTripCard'] = PrepareTripCard;
module.exports = PrepareTripCard;
