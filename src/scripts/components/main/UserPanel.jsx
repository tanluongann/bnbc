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
        var pictUrl = "/static/img/users/" + this.props.user.picture;
        return <div className={ classes.join(" ") } >
            <span className="name">{ this.props.user.name }</span>
            <img className="profile-picture" src={ pictUrl } />
            <span className="badges">{ this.props.user.name }</span>
            <span className="infos">
                <span className="block traveltime">
                    <i className="fa fw fa-calendar-plus-o" ></i>
                    <span className="value">1,589</span> <span className="unit">days</span>
                </span>
                <span className="block traveldistance">
                    <i className="fa fw fa-map" ></i>
                    <span className="value">65,456</span> <span className="unit">km</span>
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
