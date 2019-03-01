import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import { Switch, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import BagPage from './views/Bag/Bag';

/* eslint-disable react/jsx-filename-extension,
react/destructuring-assignment */
class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        {this.props.isFetching && this.props.pathname !== '/bag' && <Loader />}
        {this.props.isFetching === false && this.props.pathname !== '/bag' && <Redirect to="/bag" />}
        <Switch>
          <Route exact path="/bag" render={() => <BagPage isFetching={this.props.isFetching} />} />
        </Switch>
      </div>
    );
  }
}

App.defaultProps = {
  isFetching: null,
  pathname: null,
};

App.propTypes = {
  isFetching: PropTypes.bool,
  pathname: PropTypes.string,
};

export default App;
