const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verifyToken, extractToken } = require('../middleware/auth');
const {
  addUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  getAllUsers
} = require('../models/users');

const router = express.Router();

// Store refresh tokens on server (for revocation)
let refreshTokens = [];

// JWT Secrets and Expiry Times
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your_refresh_secret_key';
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';

// Generate Access Token
function generateAccessToken(userId, username) {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

// Generate Refresh Token
function generateRefreshToken(userId, username) {
  return jwt.sign({ userId, username }, REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

// Helper: Validate input
function validateInput(username, email, password) {
  if (!username || username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters' };
  }
  if (!email || !email.includes('@')) {
    return { valid: false, message: 'Invalid email format' };
  }
  if (!password || password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    const validation = validateInput(username, email, password);
    if (!validation.valid) {
      return res.status(400).json({ message: validation.message });
    }

    // Check if user already exists
    if (findUserByUsername(username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    if (findUserByEmail(email)) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = addUser(username, email, passwordHash);

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.username);
    const refreshToken = generateRefreshToken(user.id, user.username);

    // Store refresh token
    refreshTokens.push(refreshToken);

    // Set cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username: user.username, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Find user
    const user = findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user.id, user.username);
    const refreshToken = generateRefreshToken(user.id, user.username);

    // Store refresh token
    refreshTokens.push(refreshToken);

    // Set cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      accessToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: 'Refresh token has been revoked' });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // Generate new access token
    const newAccessToken = generateAccessToken(decoded.userId, decoded.username);

    // Set new access token cookie
    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, sameSite: 'strict' });

    res.json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token', error: error.message });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // Revoke refresh token
    if (refreshToken) {
      refreshTokens = refreshTokens.filter(token => token !== refreshToken);
    }

    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error during logout', error: error.message });
  }
});

// GET /api/auth/profile (Protected)
router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = findUserById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'Profile retrieved successfully',
      user: { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// GET /api/auth/me (Protected)
router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'Current user info',
    userId: req.userId,
    username: req.username
  });
});

// PUT /api/auth/update-profile (Protected)
router.put('/update-profile', verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const user = findUserById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email && email !== user.email) {
      if (findUserByEmail(email)) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    res.json({
      message: 'Profile updated successfully',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// GET /api/auth/verify-token (Protected)
router.get('/verify-token', verifyToken, (req, res) => {
  res.json({
    message: 'Token is valid',
    userId: req.userId,
    username: req.username
  });
});

// GET /api/auth/users (For testing only)
router.get('/users', (req, res) => {
  res.json({
    message: 'All users (for testing)',
    users: getAllUsers()
  });
});

module.exports = router;
