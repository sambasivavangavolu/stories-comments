import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Stories from './Stories'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';


class App extends Component {
  render() {
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hacker Rank: Display Top 10 Stories & Top 20 Comments of each Story</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/stories"/>
                )}/>
                 <Route exact path='/stories' component={Stories} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
