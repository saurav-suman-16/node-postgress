const ERROR = {
  UNKNOWN: {
    code: 'unknown',
    message: 'Unknown Error Occurred',
  },
};

const createError = type => {
  const err = new Error();
  if (ERROR[type]) {
    err.message = ERROR[type].message;
    err.code = ERROR[type].code;
  } else {
    err.message = ERROR.UNKNOWN.message;
    err.code = ERROR.UNKNOWN.code;
  }
  return err;
};

module.exports = { createError };
