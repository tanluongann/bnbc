'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var MenuPanel = React.createClass({

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
        var classes = ['menupanel'];
        if (!this.state.mounted) classes.push('mounting');
        return <ul className={ classes.join(" ") } >
            <li>Plop</li>
            <li>Plop</li>
            <li>Plop</li>
            <li>Plop</li>
        </ul>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['MenuPanel'] = MenuPanel;
module.exports = MenuPanel;
