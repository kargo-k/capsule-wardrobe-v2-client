import React from 'react';
import './scss/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainContainer from './containers/MainContainer';
import Navbar from './components/Navbar';
import About from './components/About';
import CollectionContainer from './containers/CollectionContainer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/'>
            <Route path='/' component={Navbar} />
            <Route path='/main' component={MainContainer} />
            <Route path='/login' component={LoginForm} />
            <Route path='/signup' component={SignupForm} />
            <Route path='/about' component={About} />
            <Route path='/explore' component={CollectionContainer} />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;