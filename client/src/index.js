import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route,Switch} from 'react-router-dom'
import {Router} from 'react-router'
import createHistory from 'history/createBrowserHistory'
import{Provider} from 'react-redux'
import store from './redux/store'
import AddArticle from './components/addArticle'
import Profile from './components/profile'
import SignIn from './components/signIn'
import ViewArticle from './components/viewArticle'
import GetData from './components/getData'
import Edit from './components/edit'
const history=createHistory()

ReactDOM.render(
<Provider store={store}>
    <Router history={history}>
        <div>
            <Route path='/' component={App} />
            <Route path='/getData' component={GetData} />
            <Route path='/edit' component={Edit} />
            <Route path='/addArticle' component={AddArticle} />
            <Route path='/profile' component={Profile} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/viewArticle' component={ViewArticle} />
            </div>
    </Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
