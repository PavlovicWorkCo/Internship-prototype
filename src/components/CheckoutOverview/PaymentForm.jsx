import React from 'react';
import PropTypes from 'prop-types';
import AnimateHeight from 'react-animate-height';
import { animateScroll as scroll } from 'react-scroll';
import FormLabel from './FormLabel';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Validator from '../../helper/Validator';
import './PaymentForm.css';

class PaymentForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        cardHolderName: props.shippingFormSubmitted
          ? `${props.shippingFormSubmitted.firstName} ${props.shippingFormSubmitted.lastName}` : null,
      },
      informationIsIncomplete: false,
      cardNumberInputMask: '9999 9999 9999 9999',
      // cardNumber: '23232323',
    };
    this.formRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { shippingFormSubmitted } = this.props;
    if (prevProps.shippingFormSubmitted !== shippingFormSubmitted && shippingFormSubmitted) {
      this.setDefaultCardHolderName(`${shippingFormSubmitted.firstName} ${shippingFormSubmitted.lastName}`);
    }
  }

  onInputChange(e, inputName) {
    const { formValues, informationIsIncomplete } = this.state;
    if (inputName === 'cardNumber') {
      const cardNoWithoutSpaces = e.target.value.replace(/\s/g, '');
      this.setState({
        formValues: { ...formValues, [`${inputName}`]: e.target.value },
        cardNumber: e.target.value,
        cardType: Validator.checkCreditCardType(cardNoWithoutSpaces),
        cardNumberInputMask: (/^3[47]/.test(e.target.value)) ? '9999 999999 99999' : '9999 9999 9999 9999',
      });
    }
    if (inputName === 'cardExpirationDate') {
      this.setState({
        creditCardExpirationDate: e.target.value,
        expirationWarning: null,
      });
    }
    if (informationIsIncomplete) {
      this.setState({
        formValues: { ...formValues, [`${inputName}`]: e.target.value },
        informationIsIncomplete: false,
      });
    } else {
      this.setState({
        formValues: { ...formValues, [`${inputName}`]: e.target.value },
      });
    }
  }

  onFormSubmit(e) {
    const { submitPaymentMethod, setEditingFormRef } = this.props;
    const { formValues } = this.state;
    // submitPaymentMethod({
    //   cardNumber: '123123', cardExpirationDate: '11/23',
    // cardHolderName: 'nik pav', cardCVVNumber: '123',
    // });
    // setEditingFormRef(null);
    e.preventDefault();
    if (!(formValues.cardHolderName && formValues.cardNumber
      && formValues.cardExpirationDate && formValues.cardCVVNumber)) {
      this.setState({
        informationIsIncomplete: true,
      });
      return;
    }
    if (!Validator.validateCreditCard(formValues.cardNumber.replace(/\s/g, ''))) {
      this.setState({
        creditCardNoIsInvalid: true,
      });
      return;
    }
    this.setState({
      creditCardNoIsInvalid: false,
    });
    if (!Validator.validateCreditCardExpirationDateFormat(formValues.cardExpirationDate)) {
      this.setState({
        expirationWarning: 'Invalid expiration date',
      });
      return;
    }
    if (Validator.hasCreditCardExpired(formValues.cardExpirationDate)) {
      this.setState({
        expirationWarning: 'Your credit card has expired',
      });
      return;
    }
    submitPaymentMethod(formValues);
    setEditingFormRef(null);
  }

  onEditPaymentClick() {
    const { setEditingFormRef, heightAnimationTime } = this.props;
    setEditingFormRef(this.formRef);
    scroll.scrollTo(185, {
      duration: heightAnimationTime,
      containerId: 'checkout-container',
    });
    // top padding of checkoutcontainer is 55px + EmailForm height is 130;
  }

  setDefaultCardHolderName(nameFromShippingForm) {
    const { formValues } = this.state;
    const newFormValues = formValues;
    newFormValues.cardHolderName = nameFromShippingForm;
    this.setState({
      formValues: newFormValues,
    });
  }

  render() {
    const {
      isExpanded, paymentMethodSubmitted, editingFormRef,
      shippingFormSubmitted, heightAnimationTime,
    } = this.props;
    const {
      informationIsIncomplete, cardNumber, cardType, creditCardNoIsInvalid,
      creditCardExpirationDate, cardNumberInputMask, expirationWarning,
    } = this.state;
    const formHeight = isExpanded || editingFormRef === this.formRef.current ? 'auto' : 0;
    const invisibleClass = !cardType ? 'Invisible' : '';
    const overviewHeight = editingFormRef !== this.formRef.current ? 'auto' : 0;
    const editButtonHidden = editingFormRef === this.formRef.current || isExpanded || !paymentMethodSubmitted ? 'Hidden' : '';
    return (
      <div className="Checkout-payment-form-container" ref={this.formRef}>
        <FormLabel formNumber="3" formLabel="Payment method" />
        <Button
          className={`Transparent-button Checkout-form-edit-button ${editButtonHidden}`}
          buttonText="Edit"
          onClick={() => this.onEditPaymentClick()}
        />
        <div className="Checkout-payment-form-content-wrapper">
          {paymentMethodSubmitted && !isExpanded && (
            <AnimateHeight height={overviewHeight} duration={heightAnimationTime} animateOpacity>
              <div className="Checkout-payment-overview">
                {cardType === 'American express' ? <p>{`${cardType} •••• •••••• ••••• ${cardNumber.slice(-4)}`}</p> : <p>{`${cardType} •••• •••• •••• ${cardNumber.slice(-4)}`}</p>}
              </div>
            </AnimateHeight>
          )}
          <AnimateHeight duration={heightAnimationTime} height={formHeight} animateOpacity>
            <form className="Checkout-payment-form">
              <p className="Card-type-tip">Tip: Some credit cards start with the numbers: 22-27, 36-55, 6011...</p>
              <Input
                containerClassName="Checkout-big-text-input"
                placeholderText="Card holder name"
                inputClassName="Default-input Checkout-input-size"
                inputLabeled
                onChange={e => this.onInputChange(e, 'cardHolderName')}
                defaultValue={shippingFormSubmitted ? `${shippingFormSubmitted.firstName} ${shippingFormSubmitted.lastName}` : null}
              />
              <Input
                containerClassName="Checkout-big-text-input"
                placeholderText="Card number"
                inputClassName="Default-input Checkout-input-size"
                inputLabeled
                onChange={e => this.onInputChange(e, 'cardNumber')}
                defaultValue={cardNumber}
                inputMask={cardNumberInputMask}
              />
              <p className={`Card-type-info ${invisibleClass}`}>{`Card type: ${cardType}`}</p>
              <Input
                containerClassName="Checkout-small-text-input"
                placeholderText="MM / YY"
                inputClassName="Default-input Checkout-input-size"
                inputLabeled
                inputLabelText="Expiration date"
                onChange={e => this.onInputChange(e, 'cardExpirationDate')}
                defaultValue={creditCardExpirationDate}
                inputMask="99/99"
              />
              <Input
                containerClassName="Checkout-small-text-input"
                placeholderText="CVV"
                inputClassName="Default-input Checkout-input-size"
                inputLabeled
                onChange={e => this.onInputChange(e, 'cardCVVNumber')}
                inputMask="9999"
              />
              <Button className="Checkout-button Continue-to-payment-button" buttonText="Review and finish" onClick={e => this.onFormSubmit(e)} />
              {informationIsIncomplete && <p className="Payment-info-warning">Please enter all required credit card information.</p>}
              {creditCardNoIsInvalid && !informationIsIncomplete && <p className="Payment-info-warning"> Please enter a valid credit number</p>}
              {expirationWarning && <p className="Payment-info-warning">{expirationWarning}</p>}
            </form>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}

PaymentForm.defaultProps = {
  isExpanded: false,
  paymentMethodSubmitted: null,
  submitPaymentMethod: null,
  editingFormRef: null,
  shippingFormSubmitted: null,
  setEditingFormRef: null,
  heightAnimationTime: null,
};

PaymentForm.propTypes = {
  isExpanded: PropTypes.bool,
  paymentMethodSubmitted: PropTypes.object,
  submitPaymentMethod: PropTypes.func,
  editingFormRef: PropTypes.object,
  shippingFormSubmitted: PropTypes.object,
  setEditingFormRef: PropTypes.func,
  heightAnimationTime: PropTypes.number,
};

export default PaymentForm;
