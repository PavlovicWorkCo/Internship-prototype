import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import Page1 from './views/page1';
import Page2 from './views/page2';

/* eslint-disable react/prefer-stateless-function, react/jsx-filename-extension */
class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <Link to="/page1"> Go to page1 </Link>
        <Link to="/page2"> Go to page2 </Link>
        <Switch>
          <Route exact path="/page1" component={Page1} />
          <Route exact path="/page2" component={Page2} />
        </Switch>
      </div>
    );
  }
}

export default App;
