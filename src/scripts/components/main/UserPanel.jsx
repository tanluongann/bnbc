'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var UserPanel = React.createClass({

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
        var classes = ['userpanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >
            <span className="name">{ this.props.user.name }</span>
            <img className="profile-picture" href="/static/img/{ this.props.user.picture }" />
            <span className="badges">{ this.props.user.name }</span>
            <span className="infos">
                <span className="traveltime">
                    <span className="label">Travel time: </span>
                    <span className="value">589 days</span>
                </span>
                <span className="traveldistance">
                    <span className="label">Travel distance: </span>
                    <span className="value">65456 km</span>
                </span>
            </span>
        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['UserPanel'] = UserPanel;
module.exports = UserPanel;
