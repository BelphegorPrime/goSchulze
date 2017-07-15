import React, {Component} from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import SiteApp from './components/siteApp';
import store from './store';
import './../css/main.css';

const history = syncHistoryWithStore(createBrowserHistory(), store);

class Root extends Component {
    render() {
        return <div>
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={SiteApp} />
                </Router>
            </Provider>
        </div>
    }
}

ReactDom.render(<Root />, document.getElementById('app'));
