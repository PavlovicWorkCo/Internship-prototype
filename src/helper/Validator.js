/* eslint-disable */
const Validator= {
  validateEmail: function(email) {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  },

  validatePassword: function(password) {
    let re = /^.{8,}$/;
    return re.test(password);
  },
  checkCreditCardType: function(number) {
    if (number.match(/^3[47]/)) {
      return 'American Express';
    }
    if (number.startsWith("4")) {
      return 'Visa';
    }
    if (number.match(/^(5[1-5]|2[2-7])/) ) {
      return 'Mastercard';
    }
    if (number.startsWith("6011")) {
      return 'Discover';
    }
    if (number.match(/^(30|36|38|39|54)/)) {
      return 'Diners club'
    }
    if(number.match(/^(50|58|63|67)/)) {
      return 'Maestro'
    }
  },
  validateCreditCard: function(number) {
    const americanExpCardNo = /^(?:3[47][0-9]{13})$/;
    const visaCardNo = /^(?:4[0-9]{15})$/;
    const masterCardNo = /^(?:(5[1-5]|2[2-7])[0-9]{14})$/;
    const discoverCardNo = /^6011[0-9]{12}$/;
    const dinersCardNo = /^(30|36|38|39)[0-9]{14}$/;
    const maestroCardNo = /^(50|58|63|67)[0-9]{14}$/;
    // the mask is set to 16 numbers 4x4 for all except American Express because i found too many
    // different pieces of info about the number of digits and almost no info about the format
    // for the other credit cards
    if (number.match(americanExpCardNo) || number.match(visaCardNo) || number.match(masterCardNo)
    || number.match(discoverCardNo) || number.match(dinersCardNo) || number.match(maestroCardNo)) return true;
    return false;
  },
  validateCreditCardExpirationDateFormat: function(date) {
    const cardExpirationMonth = Number(date.slice(0, 2));
    const cardExpirationYear = Number(date.slice(3, 5));
    if (cardExpirationMonth > 12 || cardExpirationMonth < 1
      || date.length < 5) return false;
    return true;
  },
  hasCreditCardExpired: function(date) {
    const cardExpirationMonth = Number(date.slice(0, 2));
    const cardExpirationYear = Number(date.slice(3, 5));
    const currentYearTwoDigits = Number(new Date().getFullYear().toString().slice(2, 4));
    const currentMonth = new Date().getMonth() + 1;
    if (currentYearTwoDigits > cardExpirationYear || (
      currentYearTwoDigits === cardExpirationYear && currentMonth > cardExpirationMonth
    )) return true;
  }
}

export default Validator;
