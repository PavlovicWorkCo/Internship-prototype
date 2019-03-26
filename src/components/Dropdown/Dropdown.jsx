import './Dropdown.css';
import PropTypes from 'prop-types';
import React from 'react';
import ReactSVG from 'react-svg';
import OutsideClickHandler from 'react-outside-click-handler';
import dropdownArrowIcon from '../../assets/icons/dropdownArrow.svg';

class Dropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownSelected: props.defaultSelected,
      dropdownShowing: false,
    };
    this.dropdownButton = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { defaultSelected } = this.props;
    if (prevProps.defaultSelected !== defaultSelected) {
      this.setSelected(defaultSelected);
    }
  }

  onOutsideClick() {
    this.closeDropdown();
  }

  setSelected(value) {
    this.setState({
      dropdownSelected: value,
    });
  }

  setDropdownValue(option) {
    const { setInputValue } = this.props;
    this.setState(
      {
        dropdownSelected: option,
      },
      () => {
        this.toggleDropdown();
      },
    );
    if (setInputValue) {
      setInputValue(option);
    }
  }

  closeDropdown() {
    this.setState({
      dropdownShowing: false,
    });
  }

  toggleDropdown() {
    const { dropdownOptions } = this.props;
    if (!dropdownOptions) return;
    const { dropdownShowing } = this.state;
    this.setState({
      dropdownShowing: !dropdownShowing,
    });
  }

  renderDropdownOptions() {
    const {
      optionsButtonClass,
      dropdownOptions,
      colorPreviewClass,
      dropdownWithColor,
      dropdownOptionContentClass,
    } = this.props;

    return (
      dropdownOptions && (
        dropdownOptions.map(option => (
          <button
            type="button"
            className={optionsButtonClass}
            onClick={() => this.setDropdownValue(option)}
          >
            {dropdownWithColor ? (
              <React.Fragment>
                <div
                  className={colorPreviewClass}
                  style={{ backgroundColor: option.color_code }}
                />
                <p className={dropdownOptionContentClass}>
                  {option.color_name}
                </p>
              </React.Fragment>
            ) : (
              <p className={dropdownOptionContentClass}>{option}</p>
            ) }
          </button>
        ))
      )
    );
  }

  renderDropdownSelected() {
    const {
      selectedContentClass,
      selectedColorPreviewClass,
      dropdownWithColor,
    } = this.props;
    const { dropdownSelected } = this.state;
    return (
      dropdownWithColor ? (
        <React.Fragment>
          <div
            className={selectedColorPreviewClass}
            style={{ backgroundColor: dropdownSelected.color_code }}
          />
          <p className={selectedContentClass}>{dropdownSelected.color_name}</p>
        </React.Fragment>
      ) : (
        <p className={selectedContentClass}>{dropdownSelected}</p>
      )
    );
  }

  render() {
    const {
      dropdownContainerClass,
      dropdownButtonClass,
      dropdownOptionsContainerClass,
      dropdownLabeled,
      labelClass,
      dropdownOptions,
      placeholderText,
      dropdownArrowIconClass,
      dropdownArrowVisible,
      noOptionsClass,
      placeholderClass,
    } = this.props;
    const {
      dropdownSelected,
      dropdownShowing,
    } = this.state;

    const improvedDropdownContainerClass = (!dropdownOptions && noOptionsClass) ? `${dropdownContainerClass} ${noOptionsClass}` : dropdownContainerClass;
    return (
      <div className={improvedDropdownContainerClass}>
        {dropdownSelected && dropdownLabeled && <p className={labelClass}>{placeholderText}</p>}
        <OutsideClickHandler onOutsideClick={() => this.onOutsideClick()}>
          <button
            type="button"
            ref={this.dropdownButton}
            className={dropdownButtonClass}
            onClick={() => this.toggleDropdown(this.dropdownButton)}
          >
            {dropdownSelected ? this.renderDropdownSelected()
              : <p className={placeholderClass}>{placeholderText}</p> }
            {dropdownArrowVisible && dropdownOptions
              && (
                <ReactSVG
                  src={dropdownArrowIcon}
                  svgClassName={dropdownArrowIconClass}
                />
              )}
          </button>
          { dropdownShowing && (
          <div className={dropdownOptionsContainerClass}>
            {this.renderDropdownOptions()}
          </div>
          )}
        </OutsideClickHandler>
      </div>

    );
  }
}

Dropdown.defaultProps = {
  dropdownContainerClass: null,
  dropdownButtonClass: null,
  dropdownOptionsContainerClass: null,
  optionsButtonClass: null,
  dropdownLabeled: false,
  labelClass: 'Dropdown-label',
  dropdownOptions: null,
  defaultSelected: null,
  placeholderText: null,
  dropdownArrowIconClass: null,
  dropdownArrowVisible: false,
  noOptionsClass: null,
  colorPreviewClass: 'Bag-item-color-preview',
  dropdownWithColor: false,
  dropdownOptionContentClass: null,
  selectedColorPreviewClass: 'Bag-item-color-preview',
  selectedContentClass: null,
  placeholderClass: 'Dropdown-placeholder',
  setInputValue: null,
};

Dropdown.propTypes = {
  dropdownContainerClass: PropTypes.string,
  dropdownButtonClass: PropTypes.string,
  dropdownOptionsContainerClass: PropTypes.string,
  optionsButtonClass: PropTypes.string,
  dropdownLabeled: PropTypes.bool,
  labelClass: PropTypes.string,
  dropdownOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  placeholderText: PropTypes.string,
  dropdownArrowIconClass: PropTypes.string,
  dropdownArrowVisible: PropTypes.bool,
  noOptionsClass: PropTypes.string,
  colorPreviewClass: PropTypes.string,
  dropdownWithColor: PropTypes.bool,
  dropdownOptionContentClass: PropTypes.string,
  selectedColorPreviewClass: PropTypes.string,
  selectedContentClass: PropTypes.string,
  placeholderClass: PropTypes.string,
  setInputValue: PropTypes.func,
};


export default Dropdown;
