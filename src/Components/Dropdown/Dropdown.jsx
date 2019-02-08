import './Dropdown.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactSVG from 'react-svg';
import dropdownArrowIcon from '../../assets/icons/dropdownArrow.svg';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSelected: props.defaultSelected,
      dropdownShowing: false,
    };
  }

  setDropdownValue(option) {
    this.setState(
      {
        dropdownSelected: option,
      },
      () => {
        this.toggleDropdown();
      },
    );
  }

  toggleDropdown() {
    const { dropdownShowing } = this.state;
    this.setState({
      dropdownShowing: !dropdownShowing,
    });
  }


  render() {
    const {
      dropdownButtonClass,
      dropdownOptionsContainerClass,
      optionsButtonClass,
      dropdownLabeled,
      labelClass,
      dropdownOptions,
      placeholderText,
    } = this.props;
    const {
      dropdownSelected,
      dropdownShowing,
    } = this.state;

    const dropdownOptionsButtons = dropdownOptions.map(option => (
      <button
        type="button"
        className={optionsButtonClass}
        onClick={() => this.setDropdownValue(option)}
      >
        <p>{option}</p>
      </button>
    ));
    return (
      <div className="Dropdown-container">
        {dropdownSelected && dropdownLabeled && <p className={labelClass}>{placeholderText}</p>}
        <button type="button" className={dropdownButtonClass} onClick={() => this.toggleDropdown()}>
          {dropdownSelected ? <p>{dropdownSelected}</p> : <p className="Dropdown-placeholder">{placeholderText}</p> }
          <ReactSVG src={dropdownArrowIcon} svgClassName="Dropdown-arrow-icon" />
        </button>
        {dropdownShowing && (
        <div className={dropdownOptionsContainerClass}>
          {dropdownOptionsButtons}
        </div>
        )}
      </div>
    );
  }
}

Dropdown.defaultProps = {
  dropdownButtonClass: null,
  dropdownOptionsContainerClass: null,
  optionsButtonClass: null,
  dropdownLabeled: false,
  labelClass: 'Dropdown-label',
  dropdownOptions: null,
  defaultSelected: null,
  placeholderText: null,
};

Dropdown.propTypes = {
  dropdownButtonClass: PropTypes.string,
  dropdownOptionsContainerClass: PropTypes.string,
  optionsButtonClass: PropTypes.string,
  dropdownLabeled: PropTypes.bool,
  labelClass: PropTypes.string,
  dropdownOptions: PropTypes.arrayOf(PropTypes.string),
  defaultSelected: PropTypes.string,
  placeholderText: PropTypes.string,
};


export default Dropdown;
