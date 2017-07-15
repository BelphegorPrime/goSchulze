import { compose, createStore, applyMiddleware, combineReducers} from 'redux';
import { persistState } from 'redux-devtools';
import { createLogger } from 'redux-logger';
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux'
import site from './reducers/site'

const siteApp = combineReducers({site, routing: routerReducer});
const logger = createLogger();
const middleware = routerMiddleware(browserHistory);
const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, logger, middleware),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreWithMiddleware(siteApp);
export default store;