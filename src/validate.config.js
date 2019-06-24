export const config = {
    errorBagName: 'errors', // change if property conflicts
    fieldsBagName: 'fields',
    delay: 0,
    locale: 'ru',
    dictionary: null,
    strict: true,
    classes: false,
    classNames: {
      touched: 'touched', // the control has been blurred
      untouched: 'untouched', // the control hasn't been blurred
      valid: 'is-success', // model is valid
      invalid: 'is-danger', // model is invalid
      pristine: 'pristine', // control has not been interacted with
      dirty: 'dirty' // control has been interacted with
    },
    events: 'input|blur',
    inject: true,
    validity: false,
    aria: true
  };