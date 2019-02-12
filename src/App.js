import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies
import { Switch, Route } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import BagPageContainer from './views/bagPage';
import { fetchBag } from './redux/actions';


/* eslint-disable react/prefer-stateless-function, react/jsx-filename-extension,
react/destructuring-assignment, react/prop-types */
class App extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBag();
  }

  render() {
    return (
      <div className="App">
        {this.props.isFetching ? <Loader />
          : (
            <Redirect to="/bag" />
          )
        }
        <Switch>
          <Route exact path="/bag" component={BagPageContainer} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => { // eslint-disable-line arrow-body-style
  return {
    isFetching: state.bagItems.isFetching,
  };
};
const mapDispatchToProps = (dispatch) => { // eslint-disable-line arrow-body-style
  return {

    fetchBag: () => {
      dispatch(fetchBag());
    },
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);


export default AppContainer;
