import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import App from '../../App';
import { fetchBag, setCheckoutView } from '../../redux/actions';

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
        checkoutViewActive={this.props.checkoutViewActive}
        setCheckoutView={this.props.setCheckoutView}
      />
    );
  }
}

AppContainer.defaultProps = {
  fetchBag: null,
  isFetching: false,
  location: null,
  checkoutViewActive: null,
  setCheckoutView: null,
};

AppContainer.propTypes = {
  fetchBag: PropTypes.func,
  isFetching: PropTypes.bool,
  location: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  checkoutViewActive: PropTypes.bool,
  setCheckoutView: PropTypes.func,
};


const mapStateToProps = state => (
  {
    isFetching: state.bagItems.isFetching,
    checkoutViewActive: state.checkoutView,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchBag: () => { dispatch(fetchBag()); },
    setCheckoutView: (value) => { dispatch(setCheckoutView(value)); },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
