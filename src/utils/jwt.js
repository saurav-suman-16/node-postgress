const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('@app-config');

/* 
@summary Generate JWT token;

@v1;

@param data;

@return
success: { access_token }
error: throw Error
 */
const generateJwtToken = (data, { refresh } = {}) => {
  const tokenObj = { token_type: 'Bearer' };
  const access_token = jwt.sign(data, JWT_SECRET);
  tokenObj.access_token = access_token;
  if (refresh) {
    const refresh_token = jwt.sign({ ...data, refresh: true }, JWT_SECRET, {
      expiresIn: '7d',
    });
    tokenObj.refresh_token = refresh_token;
  }
  return tokenObj;
};

/* 
@summary Decode JWT token;

@v1;

@param token;

@return
success: tokenData
error: throw Error
 */
const decodeJwtToken = token => {
  token = token.trim();
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return;
  }
};

module.exports = { generateJwtToken, decodeJwtToken };
