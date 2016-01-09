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
        
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        var bd = new Date(this.props.booking.date * 1000);
        var classes = ['card', 'booking'];
        if (!this.state.mounted) classes.push('mounting');
        
        var ist = {
            "background": "url('/static/img/places/" + this.props.booking.place.photo + ".png')",
        }
        
        return <article className={ classes.join(" ") } >
            <header>
                <span className="img" style={ ist } />
            </header>
            <section>
                <span className="date">
                    <span className="day">{ bd.getDate() }</span>
                    <span className="month">{ months[bd.getMonth() - 1] }</span>
                </span>
                <span className="location">{ this.props.booking.place.name }</span>
                <span className="duration">{ this.props.booking.duration } days</span>
            </section>
            <footer>
                <button>View</button>
                <button>Prepare</button>
                <button>Host</button>
            </footer>
        </article>
    },

    changeType(e) {
        this.setState({ type: e });
    },

});

React.allComponents['BookingCard'] = BookingCard;
module.exports = BookingCard;
