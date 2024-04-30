const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function (req, res, next) {
    let token;

    // Check if the token is in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Check if the token is in a cookie
      token = req.cookies.token;
    } else if (req.query.token) {
      // Check if the token is in the query parameters
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      // Verify the token and extract user data
      const decoded = jwt.verify(token, secret);
      req.user = decoded.data;

      // Log the decoded token data (user data)
      console.log('Decoded token data:', req.user);

      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};