# JWT Authentication Implementation Guide

## 📖 Step-by-Step Architecture Explanation

### 1. **Project Initialization**
```
npm init -y
npm install express jsonwebtoken bcrypt body-parser cookie-parser dotenv
```

### 2. **User Data Model (models/users.js)**
- Stores users in-memory (replace with DB in production)
- Each user has: id, username, email, passwordHash, createdAt
- Methods: addUser, findByUsername, findByEmail, findById, getAllUsers

### 3. **Authentication Middleware (middleware/auth.js)**
- `verifyToken`: Checks if JWT token is valid and not expired
- `extractToken`: Optionally extracts user info from token
- Returns 401 if no token, 403 if token invalid/expired

### 4. **Authentication Routes (routes/auth.js)**

#### Registration Flow:
1. Receive username, email, password
2. Validate input (length, format)
3. Check if user already exists
4. Hash password with bcrypt
5. Create user in database
6. Generate access token (1 hour)
7. Generate refresh token (7 days)
8. Store refresh token on server
9. Set cookies and return tokens

#### Login Flow:
1. Receive username, password
2. Find user in database
3. Compare password with stored hash
4. If match: Generate new tokens
5. If no match: Return 401 Unauthorized

#### Refresh Token Flow:
1. Get refresh token from cookies
2. Check if token is not revoked
3. Verify token signature and expiration
4. Generate new access token
5. Return new access token

#### Logout Flow:
1. Get refresh token from cookies
2. Remove from valid tokens list (revoke)
3. Clear cookies on client
4. Return success

### 5. **Main Application (app.js)**
- Initialize Express server
- Add middleware (body-parser, cookie-parser, static files)
- Mount routes
- Start server on specified port

### 6. **Frontend (public/index.html & style.css)**
- User interface for registration, login, profile
- Uses Fetch API to communicate with backend
- Handles cookies automatically
- Gerglegreen & Light Green theme

---

## 🔄 Complete Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    USER REGISTRATION                     │
├─────────────────────────────────────────────────────────┤
│ 1. Enter username, email, password                       │
│ 2. POST /api/auth/register                              │
│ 3. Server validates input                               │
│ 4. Server hashes password (bcrypt)                      │
│ 5. Server stores user in DB                             │
│ 6. Server generates:                                    │
│    - Access Token (JWT, 1 hour)                         │
│    - Refresh Token (JWT, 7 days)                        │
│ 7. Server stores refresh token list                     │
│ 8. Server sets HTTP-only cookies                        │
│ 9. Return success + access token                        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    PROTECTED REQUEST                     │
├─────────────────────────────────────────────────────────┤
│ 1. Client sends request to protected route              │
│ 2. Include Access Token in:                             │
│    - Authorization: Bearer <token>, OR                  │
│    - Cookies (automatic)                                │
│ 3. Server receives request                              │
│ 4. Middleware extracts token                            │
│ 5. Middleware verifies signature & expiration           │
│ 6. If valid:                                            │
│    - Extract userId & username                         │
│    - Add to req object                                  │
│    - Continue to route handler                         │
│ 7. If invalid/expired:                                  │
│    - Return 401 or 403                                  │
│    - Client can use refresh token                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   TOKEN REFRESH FLOW                     │
├─────────────────────────────────────────────────────────┤
│ 1. Client detects access token expired                  │
│ 2. POST /api/auth/refresh with refresh token           │
│ 3. Server verifies refresh token                        │
│ 4. Check if token is revoked                            │
│ 5. If valid:                                            │
│    - Generate new access token                         │
│    - Set new cookie                                    │
│    - Return new access token                           │
│ 6. If invalid/revoked:                                  │
│    - Return 401                                        │
│    - Client redirects to login                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                     LOGOUT FLOW                          │
├─────────────────────────────────────────────────────────┤
│ 1. User clicks logout button                            │
│ 2. POST /api/auth/logout                                │
│ 3. Server gets refresh token from cookies               │
│ 4. Server removes from valid tokens list (revoke)       │
│ 5. Server clears cookies                                │
│ 6. Return success                                       │
│ 7. Client cleared, cannot use refresh token anymore     │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Code Implementation Details

### Password Hashing Example
```javascript
const bcrypt = require('bcrypt');

// Hashing (during registration)
const password = "mySecurePassword123";
const passwordHash = await bcrypt.hash(password, 10); // 10 salt rounds

// Comparison (during login)
const passwordMatch = await bcrypt.compare(inputPassword, passwordHash);
```

### JWT Token Generation
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: 1, username: 'john' },  // Payload
  'secret_key',                      // Secret
  { expiresIn: '1h' }               // Options
);
```

### JWT Token Verification
```javascript
try {
  const decoded = jwt.verify(token, 'secret_key');
  console.log(decoded); // { userId: 1, username: 'john', iat: ..., exp: ... }
} catch (error) {
  // Token invalid or expired
}
```

### HTTP-only Cookie Setting
```javascript
res.cookie('accessToken', token, {
  httpOnly: true,      // Cannot be accessed by JavaScript (XSS protection)
  secure: false,       // HTTPS only (set to true in production)
  sameSite: 'strict'   // CSRF protection
});
```

---

## 🧪 Manual Testing Steps

### 1. Register a User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

Extract the `accessToken` from response.

### 3. Access Protected Route
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

### 4. Test Token Expiration
- Wait 1+ hour or modify ACCESS_TOKEN_EXPIRY in code
- Try to access protected route again
- Should get "Token expired" error

### 5. Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Cookie: refreshToken=YOUR_REFRESH_TOKEN_HERE"
```

### 6. Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Cookie: refreshToken=YOUR_REFRESH_TOKEN_HERE"
```

---

## 📊 Data Flow Summary

```
CLIENT SIDE:
├─ HTML Form (index.html)
├─ JavaScript Functions (handleRegister, handleLogin, etc.)
├─ Fetch API Calls
└─ Cookie Management

NETWORK:
├─ HTTP Requests
├─ JSON Payloads
└─ HTTP-only Cookies

SERVER SIDE:
├─ Express Routes (routes/auth.js)
├─ Middleware (middleware/auth.js)
├─ User Model (models/users.js)
├─ Security (bcrypt, JWT)
└─ In-Memory Storage
```

---

## 🔑 Key Security Concepts

### 1. **HTTP-only Cookies**
- Prevents XSS attacks
- JavaScript cannot access them
- Only sent with HTTP requests
- Cleared on logout

### 2. **Password Hashing**
- Never store passwords in plain text
- Bcrypt adds random salt
- Same password creates different hashes
- Cannot reverse-engineer original password

### 3. **JWT Signature**
- Ensures token hasn't been tampered with
- Only server knows the secret
- Token invalid if signature doesn't match

### 4. **Token Expiration**
- Access tokens short-lived (1 hour)
- Limits damage if token stolen
- Refresh tokens longer-lived (7 days)
- Can revoke refresh tokens

### 5. **Token Revocation**
- Maintain list of valid refresh tokens
- Remove on logout
- Check before issuing new access token

---

## 🚀 Production Checklist

- [ ] Use HTTPS/TLS encryption
- [ ] Store secrets in environment variables
- [ ] Use secure random generation for secrets
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Use database (MongoDB/PostgreSQL)
- [ ] Add logging and monitoring
- [ ] Implement email verification
- [ ] Set up password reset flow
- [ ] Use helmet for security headers
- [ ] Implement 2FA (optional)
- [ ] Add audit logging
- [ ] Configure CSRF protection
- [ ] Use secure session storage
- [ ] Implement API key authentication
- [ ] Add request validation middleware
- [ ] Set up automated security testing

---

## 📚 Learning Resources

- [JWT.io - JWT Debugger & Documentation](https://jwt.io/)
- [Express Middleware Guide](https://expressjs.com/guide/using-middleware.html)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Web Security Academy](https://portswigger.net/web-security)

---

## 🎯 Practice Exercises

### Level 1 (Beginner)
1. ✅ Create registration endpoint
2. ✅ Create login endpoint
3. ✅ Create protected route
4. ✅ Implement JWT verification

### Level 2 (Intermediate)
1. Add email validation
2. Implement refresh token rotation
3. Add logout endpoint
4. Create profile update endpoint
5. Add error handling

### Level 3 (Advanced)
1. Implement email confirmation
2. Add password reset functionality
3. Implement rate limiting
4. Add OAuth/Google login
5. Set up database persistence
6. Implement role-based access control
7. Add 2FA (Two-Factor Authentication)
8. Implement token blacklisting with Redis

### Level 4 (Expert)
1. Build complete authorization system
2. Implement audit logging
3. Add API versioning
4. Set up monitoring and alerts
5. Implement security headers
6. Add automated testing
7. Deploy to production
8. Configure CI/CD pipeline

---

**This implementation serves as an excellent foundation for understanding JWT authentication in modern web applications!** 🎓
