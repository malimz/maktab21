import React, { Component } from 'react';
import { HomePage, AboutPage, LoginPage, NotFoundPage, ProfilePage, SignUp } from './pages';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRouter from './Router/PrivateRouter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/panel">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUp} />
            <PrivateRouter path="/dashboard" component={ProfilePage} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;

