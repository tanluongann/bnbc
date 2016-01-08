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
            { this.props.user.name }
        </div>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['UserPanel'] = UserPanel;
module.exports = UserPanel;
