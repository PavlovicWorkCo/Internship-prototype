import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../../App';
import { fetchBag } from '../../redux/actions';

/* eslint-disable react/destructuring-assignment */

class AppContainer extends React.PureComponent {
  componentDidMount() {
    this.props.fetchBag();
  }

  render() {
    return (
      <App
        isFetching={this.props.isFetching}
        fetchBag={this.props.fetchBag}
        pathname={this.props.location.pathname}
      />
    );
  }
}

AppContainer.defaultProps = {
  fetchBag: null,
  isFetching: false,
  location: null,
};

AppContainer.propTypes = {
  fetchBag: PropTypes.func,
  isFetching: PropTypes.bool,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};


const mapStateToProps = state => (
  {
    isFetching: state.bagItems.isFetching,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchBag: () => { dispatch(fetchBag()); },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);