import React from 'react';
import classNames from 'classnames'; //eslint-disable-line
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Button from '../Button/Button';

class BillSummaryForm extends React.PureComponent {
  render() {
    const {
      formContainerClassName, formId, onSubmit, inputPlaceholderText, inputClassName,
      inputContainerClassName, onInputChange, buttonText, buttonClass, onInputFocus, onInputBlur,
    } = this.props;
    return (
      <div className={formContainerClassName}>
        <form id={formId} onSubmit={onSubmit}>
          <Input
            placeholderText={inputPlaceholderText}
            inputClassName={inputClassName}
            containerClassName={inputContainerClassName}
            onChange={onInputChange}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
        </form>
        <Button
          onClick={onSubmit}
          buttonText={buttonText}
          className={buttonClass}
          form={formId}
        />
      </div>
    );
  }
}

BillSummaryForm.defaultProps = {
  formContainerClassName: null,
  formId: null,
  onSubmit: null,
  inputPlaceholderText: null,
  inputClassName: null,
  inputContainerClassName: null,
  onInputChange: null,
  buttonText: null,
  buttonClass: null,
  onInputFocus: null,
  onInputBlur: null,
};

BillSummaryForm.propTypes = {
  formContainerClassName: PropTypes.string,
  formId: PropTypes.string,
  onSubmit: PropTypes.func,
  inputPlaceholderText: PropTypes.string,
  inputClassName: PropTypes.string,
  inputContainerClassName: PropTypes.string,
  onInputChange: PropTypes.func,
  buttonText: PropTypes.string,
  buttonClass: PropTypes.string,
  onInputFocus: PropTypes.func,
  onInputBlur: PropTypes.func,
};

export default BillSummaryForm;
