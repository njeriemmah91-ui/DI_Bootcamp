const jwt = require('jsonwebtoken');

// JWT Verification Middleware
function verifyToken(req, res, next) {
  // Get token from cookies or Authorization header
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

// Optional: Extract token without requiring it
function extractToken(req, res, next) {
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
      req.userId = decoded.userId;
      req.username = decoded.username;
      req.isAuthenticated = true;
    } catch (error) {
      req.isAuthenticated = false;
    }
  } else {
    req.isAuthenticated = false;
  }
  
  next();
}

module.exports = {
  verifyToken,
  extractToken
};
