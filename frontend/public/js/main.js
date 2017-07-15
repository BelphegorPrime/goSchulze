import React, {Component} from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'


import SiteApp from './components/siteApp'
import VoteApp from './components/voteApp'
import store from './store';
import './../css/main.css';

const history = syncHistoryWithStore(createBrowserHistory(), store);

class Root extends Component {
    render() {
        return <div>
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={SiteApp} />
                            <Route path="/:uuid" component={VoteApp} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        </div>
    }
}

ReactDom.render(<Root />, document.getElementById('app'));
