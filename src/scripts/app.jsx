'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Swiper = require('react-swipeable');

var _ = require('lodash');

React.allComponents = {}
// Components
var InfoPanel = require('./components/main/InfoPanel');
var ContentPanel = require('./components/main/ContentPanel');
var SocialPanel = require('./components/main/SocialPanel');
// Actions
var AppInfoActions = require('./actions/AppInfoActions');
// Stores
var AppInfoStore = require('./stores/AppInfoStore');

// Definition
var App = React.createClass({

    getInitialState: function() {
        var state = AppInfoStore.getState();
        state.mounted = false;
        return state;
    },

    componentDidMount: function() {
        AppInfoStore.listen(this.onChange);
        this.setState({ mounted: true });
    },

    componentWillUnmount: function() {
        AppInfoStore.unlisten(this.onChange);
    },

    onChange: function(state) {
        this.setState(state);
    },

    render: function() {
        if (this.state.appInfo.page) {
            var pages = {
                "mnb0": 'inactive',
            }
            if (this.state.appInfo.page in pages) pages[this.state.appInfo.page] = 'active'

            var cls = ['page'];
            if (this.state.slided == "leftslided") cls.push("leftslided");
            if (this.state.slided == "rightslided") cls.push("rightslided");

            return (
                <article className={ cls.join(' ') }>
                    <InfoPanel loggedUser={ this.state.appInfo.loggedUser } />
                    <Swiper onSwipedRight={ this.handleRightSwipe } onSwipedLeft={ this.handleLeftSwipe }>
                        <ContentPanel app={ this } />
                    </Swiper>
                    <SocialPanel />
                </article>
            );
        }
        else {
            return (<div>App not loaded</div>)
        }
    },

    handleRightSwipe: function(toggle) {
        if (toggle) {
            if (this.state.slided == "leftslided") this.setState({"slided": ""});
            else this.setState({"slided": "leftslided"});
        }
        else {
            // if (this.state.slided == "rightslided") this.setState({"slided": ""});
            // else this.setState({"slided": "leftslided"});
            this.setState({"slided": "leftslided"});
        }
    },

    handleLeftSwipe: function(toggle) {
        // if (toggle) {
        //     if (this.state.slided == "rightslided") this.setState({"slided": ""});
        //     else this.setState({"slided": "rightslided"});
        // }
        // else {
            // if (this.state.slided == "leftslided") this.setState({"slided": ""});
            // else this.setState({"slided": "rightslided"});
            this.setState({"slided": ""});
        // }
    },

    goToPage: function(page, model) {
        var appInfo = _.extend({}, this.state.appInfo);
        appInfo.page.name = page;
        appInfo.page.model = model;
        this.setState({"appInfo": appInfo });
    },

});

React.allComponents['App'] = App;
module.exports = App;

AppInfoActions.fetchAppInfo();

AppInfoActions.logUserIn({
    "name": "Jeremy",
    "email": "tan@tan.com",
});

// WidgetActions.fetchWidgets();
// InterfaceTypeActions.fetchInterfaceTypes();
// InterfaceInstanceActions.fetchInterfaceInstances();
// ScenarioTypeActions.fetchScenarioTypes();

ReactDOM.render(<App key="app" />, document.getElementById('app-content'));
