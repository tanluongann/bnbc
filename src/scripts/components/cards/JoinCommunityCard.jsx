'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var JoinCommunityCard = React.createClass({

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
        var classes = ['card', 'join', 'community'];
        if (!this.state.mounted) classes.push('mounting');
        
        var style = {
            "background": "url(/static/img/communities/"+this.props.community.icon+")",
        }
        
        return <a href="#" className={ classes.join(" ") } >
            <span className="icon" style={ style } ></span>
            <span className="content">
                <span className="intro">Join community</span>
                <span className="title">{ this.props.community.name }</span>
                <span className="details">23 members</span>
            </span>
        </a>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['JoinCommunityCard'] = JoinCommunityCard;
module.exports = JoinCommunityCard;
