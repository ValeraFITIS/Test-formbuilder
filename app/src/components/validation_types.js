export const NO_VALIDATOR_TYPE = 'NO_VALIDATOR_TYPE';
export const TEXT_VALIDATOR_TYPE = 'TEXT_VALIDATOR_TYPE';
export const NUMBER_VALIDATOR_TYPE = 'NUMBER_VALIDATOR_TYPE';

export const TEXT_INCLUDE_PATTERN = 'TEXT_INCLUDE_PATTERN';
export const TEXT_EXCLUDE_PATTERN = 'TEXT_EXCLUDE_PATTERN';
export const TEXT_EMAIL_PATTERN = 'TEXT_EMAIL_PATTERN';
export const TEXT_URL_PATTERN = 'TEXT_URL_PATTERN';
export const TEXT_DATE_PATTERN = 'TEXT_DATE_PATTERN';
export const TEXT_TIME_PATTERN = 'TEXT_TIME_PATTERN';
export const TEXT_DATE_TIME_PATTERN = 'TEXT_DATE_TIME_PATTERN';

export const NUMBER_EQUAL_PATTERN = 'NUMBER_EQUAL_PATTERN';
export const NUMBER_NOT_EQUAL_PATTERN = 'NUMBER_NOT_EQUAL_PATTERN';
export const NUMBER_BETWEEN_PATTERN = 'NUMBER_BETWEEN_PATTERN';
export const NUMBER_NOT_BETWEEN_PATTERN = 'NUMBER_NOT_BETWEEN_PATTERN';
export const NUMBER_INTEGER_PATTERN = 'NUMBER_INTEGER_PATTERN';
export const NUMBER_GREATER_OR_EQUAL_PATTERN = 'NUMBER_GREATER_OR_EQUAL_PATTERN';
export const NUMBER_LESS_OR_EQUAL_PATTERN = 'NUMBER_LESS_OR_EQUAL_PATTERN';

const isNumber = (string) => {
  return !isNaN(string);
};

const validateStub = (string) => {
  return true;
};

const validateInclude = (string, options) => {
  return (string.indexOf(options.param1) > -1);
};

const validateExclude = (string, options) => {
  return (string.indexOf(options.param1) == -1);
};

const validateEmail = (string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(string);
};

const validateUrl = (string) => {
  const re = /^(ftp|http|https):\/\/[^ "]+$/;

  return re.test(string);
};

const validateDate = (string) => {
  const re = /^\d{2}\/\d{2}\/\d{4}$/;

  return re.test(string);
};

const validateTime = (string) => {
  const re = /^\d{2}:\d{2}$/;

  return re.test(string);
};

const validateDateTime = (string) => {
  const re = /^\d{2}\/\d{2}\/\d{4}.{1}\d{2}:\d{2}$/;

  return re.test(string);
};

const validateEqual = (value, options) => {
  if(!isNumber(options.param1)) {
    return false;
  }

  return (isNumber(value) && (value == +options.param1));
};

const validateNotEqual = (value, options) => {
  if(!isNumber(options.param1)) {
    return false;
  }

  return (isNumber(value) && (value != +options.param1));
};

const validateBetween = (value, options) => {
  if(!isNumber(options.param1) || !isNumber(options.param2)) {
    return false;
  }

  return (isNumber(value) && (value >= +options.param1) && (value <= +options.param2));
};

const validateNotBetween = (value, options) => {
  if(!isNumber(options.param1) || !isNumber(options.param2)) {
    return false;
  }

  return (isNumber(value) && !((value >= +options.param1) && (value <= +options.param2)));
};

const validateInteger = (value) => {
  return (isNumber(value) && (value.indexOf(',') == -1) && (value.indexOf('.') == -1));
};

const validateLessEqual = (value, options) => {
  if(!isNumber(options.param1)) {
    return false;
  }

  return (isNumber(value) && (value <= +options.param1));
};

const validateGreaterEqual = (value, options) => {
  if(!isNumber(options.param1)) {
    return false;
  }

  return (isNumber(value) && (value >= +options.param1));
};

export const validate = (pattern, value, options) => {
  switch (pattern) {
    case TEXT_INCLUDE_PATTERN: {
      return validateInclude(value, options);
    }
    case TEXT_EXCLUDE_PATTERN: {
      return validateExclude(value, options);
    }
    case TEXT_EMAIL_PATTERN: {
      return validateEmail(value, options);
    }
    case TEXT_URL_PATTERN: {
      return validateUrl(value, options);
    }
    case TEXT_DATE_PATTERN: {
      return validateDate(value, options);
    }
    case TEXT_TIME_PATTERN: {
      return validateTime(value, options);
    }
    case TEXT_DATE_TIME_PATTERN: {
      return validateDateTime(value, options);
    }

    case NUMBER_EQUAL_PATTERN: {
      return validateEqual(value, options);
    }
    case NUMBER_NOT_EQUAL_PATTERN: {
      return validateNotEqual(value, options);
    }
    case NUMBER_INTEGER_PATTERN: {
      return validateInteger(value, options);
    }
    case NUMBER_BETWEEN_PATTERN: {
      return validateBetween(value, options);
    }
    case NUMBER_NOT_BETWEEN_PATTERN: {
      return validateNotBetween(value, options);
    }
    case NUMBER_LESS_OR_EQUAL_PATTERN: {
      return validateLessEqual(value, options);
    }
    case NUMBER_GREATER_OR_EQUAL_PATTERN: {
      return validateGreaterEqual(value, options);
    }

    default:
      return validateStub(value, options);
  }
};
