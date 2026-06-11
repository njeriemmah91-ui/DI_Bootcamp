# JWT Authentication - Practice Exercises & Solutions

This file contains practice exercises and solution hints for reinforcing JWT authentication concepts.

---

## 📝 Exercise 1: Input Validation Enhancement

**Objective**: Implement stricter validation for user registration

**Current Implementation**:
```javascript
function validateInput(username, email, password) {
  if (!username || username.length < 3) {
    return { valid: false, message: 'Username must be at least 3 characters' };
  }
  // ... more validation
}
```

**Challenge**: Enhance validation to include:
- [ ] Username: No special characters, only alphanumeric and underscore
- [ ] Email: More robust email validation (use regex)
- [ ] Password: Require uppercase, lowercase, numbers, and special characters
- [ ] Password: Minimum 8 characters instead of 6

**Solution Hint**:
```javascript
function validateInput(username, email, password) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!usernameRegex.test(username)) {
    return { valid: false, message: 'Username must be alphanumeric with underscores only' };
  }
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' };
  }
  if (!passwordRegex.test(password)) {
    return { valid: false, message: 'Password must have uppercase, lowercase, number, and special char' };
  }
  return { valid: true };
}
```

---

## 📝 Exercise 2: Profile Update Feature

**Objective**: Allow authenticated users to update their password

**Requirements**:
- [ ] Create PUT `/api/auth/change-password` endpoint
- [ ] Verify old password before changing
- [ ] Hash new password
- [ ] Return success/error message

**Solution Hint**:
```javascript
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = findUserById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify old password
    const passwordMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    // Hash new password
    user.passwordHash = await bcrypt.hash(newPassword, 10);

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password', error: error.message });
  }
});
```

---

## 📝 Exercise 3: Implement Rate Limiting

**Objective**: Prevent brute force attacks on login endpoint

**Requirements**:
- [ ] Track failed login attempts per username/IP
- [ ] Block account after 5 failed attempts for 15 minutes
- [ ] Use Map or external package (express-rate-limit)

**Solution Hint**:
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many login attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, async (req, res) => {
  // ... login logic
});
```

---

## 📝 Exercise 4: Token Refresh Rotation

**Objective**: Implement refresh token rotation for enhanced security

**Requirements**:
- [ ] Issue new refresh token on each refresh request
- [ ] Invalidate old refresh token
- [ ] Prevent token reuse

**Solution Hint**:
```javascript
router.post('/refresh', (req, res) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken || !refreshTokens.includes(oldRefreshToken)) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const decoded = jwt.verify(oldRefreshToken, REFRESH_SECRET);

    // Remove old refresh token
    refreshTokens = refreshTokens.filter(token => token !== oldRefreshToken);

    // Generate new tokens
    const newAccessToken = generateAccessToken(decoded.userId, decoded.username);
    const newRefreshToken = generateRefreshToken(decoded.userId, decoded.username);

    // Store new refresh token
    refreshTokens.push(newRefreshToken);

    // Set new cookies
    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, sameSite: 'strict' });
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });

    res.json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token' });
  }
});
```

---

## 📝 Exercise 5: Email Verification on Registration

**Objective**: Send verification email on user registration

**Requirements**:
- [ ] Install nodemailer or similar
- [ ] Generate verification token
- [ ] Send verification email
- [ ] Create verify endpoint
- [ ] Activate user after verification

**Solution Hint**:
```bash
npm install nodemailer
```

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate verification token
const verificationToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

// Send email
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Email Verification',
  html: `Click to verify: http://localhost:3000/api/auth/verify/${verificationToken}`
};

await transporter.sendMail(mailOptions);
```

---

## 📝 Exercise 6: Role-Based Access Control (RBAC)

**Objective**: Implement admin and user roles

**Requirements**:
- [ ] Add role field to user model
- [ ] Create admin-only routes
- [ ] Implement role verification middleware

**Solution Hint**:
```javascript
// Update user model
class User {
  constructor(id, username, email, passwordHash, role = 'user') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role; // 'user' or 'admin'
    this.createdAt = new Date();
  }
}

// Create role verification middleware
function verifyRole(requiredRole) {
  return (req, res, next) => {
    const user = findUserById(req.userId);
    if (user && user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Insufficient permissions' });
    }
  };
}

// Use in routes
router.get('/admin/users', verifyToken, verifyRole('admin'), (req, res) => {
  res.json({ users: getAllUsers() });
});
```

---

## 📝 Exercise 7: Implement Logout from All Devices

**Objective**: Allow users to logout from all devices at once

**Requirements**:
- [ ] Store list of active sessions per user
- [ ] Invalidate all refresh tokens for user
- [ ] Add endpoint for "logout all" action

**Solution Hint**:
```javascript
// Track sessions per user
let userSessions = new Map(); // userId -> [tokens]

// Store token on login
function storeSession(userId, refreshToken) {
  if (!userSessions.has(userId)) {
    userSessions.set(userId, []);
  }
  userSessions.get(userId).push(refreshToken);
}

// Logout from all devices
router.post('/logout-all', verifyToken, (req, res) => {
  try {
    // Remove all refresh tokens for this user
    const userTokens = userSessions.get(req.userId) || [];
    refreshTokens = refreshTokens.filter(token => !userTokens.includes(token));
    
    userSessions.delete(req.userId);
    
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ message: 'Logged out from all devices' });
  } catch (error) {
    res.status(500).json({ message: 'Error', error: error.message });
  }
});
```

---

## 📝 Exercise 8: Database Integration (MongoDB)

**Objective**: Replace in-memory storage with MongoDB

**Requirements**:
- [ ] Install mongodb package
- [ ] Create connection to MongoDB
- [ ] Refactor user model to use MongoDB
- [ ] Update all CRUD operations

**Solution Hint**:
```bash
npm install mongodb
```

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('jwt_auth');
const usersCollection = db.collection('users');

// Add user to MongoDB
async function addUser(username, email, passwordHash) {
  const result = await usersCollection.insertOne({
    username,
    email,
    passwordHash,
    createdAt: new Date()
  });
  return result;
}

// Find user by username
async function findUserByUsername(username) {
  return await usersCollection.findOne({ username });
}
```

---

## 📝 Exercise 9: Audit Logging

**Objective**: Track all authentication activities

**Requirements**:
- [ ] Log successful and failed login attempts
- [ ] Log password changes
- [ ] Log token refreshes
- [ ] Include timestamp and IP address
- [ ] Create audit log viewer

**Solution Hint**:
```javascript
// Audit logger
const auditLogs = [];

function logActivity(userId, action, status, ipAddress) {
  auditLogs.push({
    userId,
    action, // 'LOGIN', 'LOGOUT', 'PASSWORD_CHANGE', etc.
    status, // 'SUCCESS', 'FAILED'
    timestamp: new Date(),
    ipAddress
  });
}

// Usage
logActivity(user.id, 'LOGIN', 'SUCCESS', req.ip);

// View audit logs (admin only)
router.get('/admin/audit-logs', verifyToken, verifyRole('admin'), (req, res) => {
  res.json({ logs: auditLogs });
});
```

---

## 📝 Exercise 10: Two-Factor Authentication (2FA)

**Objective**: Add TOTP-based 2FA using Google Authenticator

**Requirements**:
- [ ] Install speakeasy package
- [ ] Generate QR code on 2FA setup
- [ ] Verify TOTP code on login
- [ ] Store 2FA secret in user model
- [ ] Add backup codes

**Solution Hint**:
```bash
npm install speakeasy qrcode
```

```javascript
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate 2FA secret
router.post('/2fa/setup', verifyToken, async (req, res) => {
  const secret = speakeasy.generateSecret({
    name: `JWT Auth (${req.username})`
  });

  const qrCode = await QRCode.toDataURL(secret.otpauth_url);

  res.json({
    secret: secret.base32,
    qrCode: qrCode
  });
});

// Verify TOTP code
function verify2FA(secret, token) {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token
  });
}
```

---

## 🧪 Testing Checklist

Use this checklist to verify your implementations:

### Basic Authentication
- [ ] User can register successfully
- [ ] Duplicate username/email is rejected
- [ ] User can login with correct credentials
- [ ] Invalid credentials are rejected
- [ ] Access token is returned on login

### Token Management
- [ ] Access token works for protected routes
- [ ] Expired access token is rejected
- [ ] Refresh token generates new access token
- [ ] Old refresh token is invalidated after refresh
- [ ] Revoked refresh token cannot generate new access token

### Security
- [ ] Passwords are hashed (not plain text in DB)
- [ ] Access tokens are in HTTP-only cookies
- [ ] Invalid tokens return 403 Forbidden
- [ ] Missing tokens return 401 Unauthorized
- [ ] CORS is properly configured

### User Profile
- [ ] User can view their profile
- [ ] User can update email
- [ ] User cannot update another user's profile
- [ ] Profile data is only visible to authenticated users

### Logout
- [ ] Logout clears cookies
- [ ] Logout invalidates refresh token
- [ ] Cannot access protected routes after logout

---

## 🚀 Deployment Checklist

- [ ] Set strong JWT secrets in production
- [ ] Enable HTTPS/TLS
- [ ] Use environment variables for secrets
- [ ] Set `secure: true` on cookies in production
- [ ] Configure CORS for your domain
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerts
- [ ] Enable logging
- [ ] Use helmet for security headers
- [ ] Test all endpoints with production environment
- [ ] Set up CI/CD pipeline
- [ ] Document API endpoints
- [ ] Create runbooks for common issues

---

## 📚 Additional Resources

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Express Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Security Best Practices](https://nodejs.org/en/knowledge/file-system/security/introduction/)

---

**Keep practicing and building secure applications!** 🔐✨
