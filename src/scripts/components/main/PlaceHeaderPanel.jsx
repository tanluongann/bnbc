'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var PlaceHeaderPanel = require('./PlaceHeaderPanel');
var BookingCard = require('../cards/BookingCard');

var PlaceHeaderPanel = React.createClass({

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

        var classes = ['placeheaderpanel'];
        var style = {
            "backgroundImage": "url(/static/img/places/"+this.props.place.picture+")",
        }
        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } style={ style } >
            <span className="buttons">
                <a href="#" className="homeButton" onClick={ this.homeButtonClick }><i className="fa fw fa-arrow-left"></i></a>
            </span>
        </div>
    },

    homeButtonClick: function() {
        this.props.app.goToPage('home', {});
    },

    changeType: function(e) {
        this.setState({ type: e });
    },

});

React.allComponents['PlaceHeaderPanel'] = PlaceHeaderPanel;
module.exports = PlaceHeaderPanel;
