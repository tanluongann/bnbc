'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
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

            var userBlock = null;
            if (this.state.appInfo.loggedUser) {
                userBlock = <InfoPanel loggedUser={ this.state.appInfo.loggedUser } />
            }
            else {
                userBlock = <div className="infopanel">Not logged!!</div>
            }
            
            return (
                <article className="page">
                    { userBlock }
                    <ContentPanel />
                    <SocialPanel />
                </article>
            );
        }
        else {
            return (<div>App not loaded</div>)
        }
    }

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
