import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
import Landing from './components/Landing';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import MainContainer from './containers/MainContainer';
import Navbar from './components/Navbar';
import About from './components/About';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={Landing} />
        <Route path='/' component={Navbar} />
        <Route path='/main' component={MainContainer} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
        <Route path='/about' component={About} />
      </Router>

    </Provider>
  );
}

export default App;