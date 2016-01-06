'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
React.allComponents = {}
// Components
var MenuPanel = require('./components/main/MenuPanel');
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
        state.appInfo.mounted = false;
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
            return (
                <div>
                    <article className="page">
                        <MenuPanel />
                        <ContentPanel />
                        <SocialPanel />
                    </article>
                </div>
            );
        }
        else {
            return (<div>App not loaded</div>)
        }
    }

});

React.allComponents['App'] = App;
module.exports = App;

// AppInfoActions.fetchAppInfo();
// WidgetActions.fetchWidgets();
// InterfaceTypeActions.fetchInterfaceTypes();
// InterfaceInstanceActions.fetchInterfaceInstances();
// ScenarioTypeActions.fetchScenarioTypes();

ReactDOM.render(<App key="app" />, document.getElementById('app-content'));

