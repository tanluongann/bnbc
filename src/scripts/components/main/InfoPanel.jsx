'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

// Components
var UserPanel = require('./UserPanel');
var MenuPanel = require('./MenuPanel');

var InfoPanel = React.createClass({

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
        var classes = ['infopanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >
            <UserPanel user={ this.props.loggedUser } />
            <MenuPanel user={ this.props.loggedUser } />
        </div>
    },

    changeType: function(e) {
        this.setState({ type: e });
    },

});

React.allComponents['InfoPanel'] = InfoPanel;
module.exports = InfoPanel;
