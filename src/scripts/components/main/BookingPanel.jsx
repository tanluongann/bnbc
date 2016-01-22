'use strict';

var React = require('react');
var _ = require('lodash');
var d = require('datejs');

var TaxiBookingCard = require('../cards/TaxiBookingCard');
var CommunityExplorationCard = require('../cards/CommunityExplorationCard');

var PlaceHeaderPanel = require('./PlaceHeaderPanel');

var BookingPanel = React.createClass({

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
        var classes = ['bookingpanel'];

        if (!this.state.mounted) classes.push('mounting');
        return <div className={ classes.join(" ") } >

            <PlaceHeaderPanel place={ this.props.booking.place } app={ this.props.app } />
            <h2>{ this.props.booking.place.name }</h2>

            <div className="dates">
                <div className="from">
                    <span className="day">30</span>
                    <span className="month">Jan</span>
                </div>
                <div className="to">
                    <span className="day">03</span>
                    <span className="month">Feb</span>
                </div>
            </div>

            <div className="fields">

                <div className="field">
                    <i className="fa fw fa-map-marker"></i>
                    <span className="content">
                        <span>{ this.props.booking.place.address.english }</span><br/>
                        <span>{ this.props.booking.place.address.local }</span>
                    </span>
                </div>

            </div>

            <TaxiBookingCard key="tbc5" />
            <CommunityExplorationCard key="cec5" />


        </div>
    },

    changeType: function(e) {
        this.setState({ type: e });
    },

});

React.allComponents['BookingPanel'] = BookingPanel;
module.exports = BookingPanel;
