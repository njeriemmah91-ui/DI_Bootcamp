# 🔐 JWT Authentication with Node.js & Express

A complete, production-ready JWT authentication system built with Node.js, Express, and security best practices.

## 📋 Features

✅ **User Registration** - Email validation, password hashing with bcrypt  
✅ **User Login** - Secure credential verification  
✅ **JWT Tokens** - Access tokens (1 hour) with automatic refresh  
✅ **Refresh Tokens** - Long-lived tokens (7 days) stored in HTTP-only cookies  
✅ **Protected Routes** - Middleware-based authorization  
✅ **Token Revocation** - Secure logout with token blacklisting  
✅ **HTTP-only Cookies** - XSS-resistant token storage  
✅ **Profile Management** - Update user information  
✅ **Modern UI** - Gerglegreen & Light Green themed frontend  

---

## 🚀 Quick Start

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your secret keys (optional for development)
```

### 3. **Start the Server**
```bash
npm start
```

The application will run on `http://localhost:3000`

---

## 📁 Project Structure

```
jwt-auth-project/
├── app.js                    # Main Express application
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── routes/
│   └── auth.js              # Authentication endpoints
├── middleware/
│   └── auth.js              # JWT verification middleware
├── models/
│   └── users.js             # User data model
└── public/
    ├── index.html           # Frontend UI
    └── style.css            # Styling (Gerglegreen theme)
```

---

## 🔌 API Endpoints

### Authentication Routes

#### **POST** `/api/auth/register`
Register a new user

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### **POST** `/api/auth/login`
Login with credentials

**Request:**
```json
{
  "username": "john_doe",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### **POST** `/api/auth/refresh`
Refresh access token using refresh token

**Response:**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### **GET** `/api/auth/profile` *(Protected)*
Retrieve user profile

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2026-03-26T10:30:00.000Z"
  }
}
```

---

#### **GET** `/api/auth/me` *(Protected)*
Get current authenticated user info

**Response:**
```json
{
  "message": "Current user info",
  "userId": 1,
  "username": "john_doe"
}
```

---

#### **PUT** `/api/auth/update-profile` *(Protected)*
Update user profile

**Request:**
```json
{
  "email": "newemail@example.com"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "newemail@example.com"
  }
}
```

---

#### **GET** `/api/auth/verify-token` *(Protected)*
Verify that the token is valid

**Response:**
```json
{
  "message": "Token is valid",
  "userId": 1,
  "username": "john_doe"
}
```

---

#### **POST** `/api/auth/logout`
Logout and revoke refresh token

**Response:**
```json
{
  "message": "Logout successful"
}
```

---

## 🔒 Authentication Flow

### User Registration/Login
```
1. User submits credentials → Server validates input
2. Server hashes password with bcrypt
3. Server generates Access Token (1 hour) & Refresh Token (7 days)
4. Tokens stored in HTTP-only cookies (secure from XSS)
5. Response includes access token in body
```

### Protected Route Access
```
1. Client sends request with access token in Authorization header or cookie
2. Middleware verifies token with JWT secret
3. If valid → Continue to route handler
4. If expired → Client can use refresh token to get new access token
5. If invalid/missing → Return 401/403 error
```

### Token Refresh
```
1. Client sends request to /refresh endpoint
2. Server verifies refresh token is not revoked
3. Server generates new access token
4. Returns new access token in response
5. Client uses new access token for subsequent requests
```

### Logout
```
1. Client sends POST request to /logout
2. Server removes refresh token from valid list (revokes it)
3. Server clears cookies on client
4. Client cannot use refresh token anymore
```

---

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt rounds (10)
- **HTTP-only Cookies**: Prevents XSS attacks
- **Token Expiration**: Access tokens expire in 1 hour
- **Token Revocation**: Refresh tokens stored server-side for revocation
- **Input Validation**: Username (min 3 chars), Email (valid format), Password (min 6 chars)
- **Secure Headers**: CORS ready, sameSite cookies
- **Error Handling**: Generic error messages prevent information leakage

---

## 📚 Implementation Details

### JWT Structure
```javascript
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  "userId": 1,
  "username": "john_doe",
  "iat": 1703000000,
  "exp": 1703003600
}

// Signature
HMACSHA256(base64Header + "." + base64Payload, secret)
```

### Token Expiry Times
- **Access Token**: 1 hour (3600 seconds)
- **Refresh Token**: 7 days (604800 seconds)

### Password Requirements
- Minimum 6 characters
- Hashed using bcrypt with 10 salt rounds
- Never stored in plain text

---

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Frontend UI
1. Navigate to `http://localhost:3000`
2. Click "Register" and create an account
3. Login with your credentials
4. View and update your profile
5. Logout to revoke your token

---

## 💡 Advanced Exercises

1. **Email Confirmation**: Send verification email on registration
2. **Password Reset**: Implement forgot password flow
3. **Rate Limiting**: Prevent brute force attacks on login
4. **Database Integration**: Replace in-memory storage with MongoDB/PostgreSQL
5. **Role-Based Access**: Implement admin/user roles
6. **Two-Factor Authentication**: Add 2FA support
7. **OAuth Integration**: Add Google/GitHub login
8. **Audit Logging**: Track login attempts and changes

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3000 | Server port |
| `JWT_SECRET` | your_jwt_secret_key | Secret key for access tokens |
| `REFRESH_SECRET` | your_refresh_secret_key | Secret key for refresh tokens |

---

## 🎨 Theme Colors

The UI uses a Gerglegreen & Light Green theme:
- **Primary**: Gerglegreen (#3d7b3d)
- **Secondary**: Light Green (#90EE90)
- **Accent**: Dark Green (#2d5a2d)
- **Background**: Linear gradient (Gerglegreen → Light Green)

---

## 📝 Notes

- This is a demonstration project. For production use:
  - Use a real database (MongoDB, PostgreSQL)
  - Store secrets in secure environment variables
  - Use HTTPS in production
  - Implement rate limiting
  - Add comprehensive logging
  - Use secure random generation for secrets
  - Consider using `helmet` for security headers

---

## 🐛 Troubleshooting

**Problem**: Token expires immediately
- Solution: Check JWT_SECRET is consistent

**Problem**: Refresh token not working
- Solution: Ensure refresh token cookie is set with httpOnly flag

**Problem**: CORS errors
- Solution: Verify credentials: 'include' is set in fetch requests

**Problem**: Can't verify token
- Solution: Ensure token is in Authorization header or cookies

---

## 📞 Support

For issues or questions, refer to:
- [JWT Documentation](https://jwt.io/)
- [Express.js Guide](https://expressjs.com/)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

---

## 📄 License

This project is provided for educational purposes.

---

**Last Updated**: March 26th, 2026  
**Version**: 1.0.0  
🔐 Secure Authentication Made Simple
