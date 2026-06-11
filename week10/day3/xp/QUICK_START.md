# 🚀 Quick Start Guide - JWT Authentication

## ⚡ Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
🟢 Server running on http://localhost:3000
```

### Step 3: Open in Browser
Navigate to: **http://localhost:3000**

---

## 🧪 First Test

### Test Registration
1. Click "Register" tab
2. Enter:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Register"
4. You'll be logged in automatically! ✅

### Test Protected Route
1. You should see your profile automatically loaded
2. Your User ID, Username, and Email are displayed
3. This proves the JWT authentication is working! 🔐

### Test Profile Update
1. Click "Edit Email" button
2. Enter a new email address
3. Profile updates successfully ✅

### Test Token Verification
1. Click "Verify Token" button
2. See your token is valid ✅

### Test Logout
1. Click "Logout" in navigation
2. Click "Home"
3. Your profile and logout buttons disappear
4. Token has been revoked! 🔓

---

## 📚 Project Structure

```
week10/day3/xp/
├── app.js                         # Main application
├── package.json                   # Dependencies
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── setup.sh                       # Setup script
├── QUICK_START.md                 # This file
├── README.md                      # Full documentation
├── IMPLEMENTATION_GUIDE.md        # Architecture guide
├── EXERCISES.md                   # Practice exercises
├── routes/
│   └── auth.js                   # Authentication endpoints
├── middleware/
│   └── auth.js                   # JWT verification
├── models/
│   └── users.js                  # User data model
└── public/
    ├── index.html                # Frontend UI
    └── style.css                 # Styling
```

---

## 🔌 API Endpoints at a Glance

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Create new user |
| POST | `/api/auth/login` | ❌ | Login with credentials |
| POST | `/api/auth/logout` | ✅ | Logout & revoke token |
| POST | `/api/auth/refresh` | ✅ | Get new access token |
| GET | `/api/auth/profile` | ✅ | View profile |
| GET | `/api/auth/me` | ✅ | Get current user info |
| PUT | `/api/auth/update-profile` | ✅ | Update email |
| GET | `/api/auth/verify-token` | ✅ | Verify token is valid |

---

## 🎨 Theme Colors

The UI uses a beautiful green theme:
- **Gerglegreen** (#3d7b3d) - Primary color
- **Light Green** (#90EE90) - Secondary color
- **Dark Green** (#2d5a2d) - Accent color

---

## 🔑 Key Features

✅ **Secure Registration** - Email validation, password hashing  
✅ **Login System** - Credential verification with bcrypt  
✅ **JWT Tokens** - Access tokens (1 hour) + Refresh tokens (7 days)  
✅ **Protected Routes** - Middleware-based authorization  
✅ **HTTP-only Cookies** - XSS-resistant token storage  
✅ **Token Refresh** - Automatic token renewal  
✅ **Logout & Revocation** - Secure session termination  
✅ **Profile Management** - View and update user info  
✅ **Modern UI** - Responsive, mobile-friendly frontend  

---

## 📖 Learning Path

### Beginner
1. Read [README.md](README.md) - Overview
2. Start the server and test the UI
3. Use the browser's Network tab to see API calls

### Intermediate
1. Read [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
2. Study the code in `routes/auth.js`
3. Understand middleware in `middleware/auth.js`

### Advanced
1. Complete exercises in [EXERCISES.md](EXERCISES.md)
2. Implement email verification (Exercise 5)
3. Add rate limiting (Exercise 3)
4. Integrate with MongoDB (Exercise 8)

---

## 🐛 Common Issues & Fixes

### "npm: command not found"
- Install Node.js from: https://nodejs.org
- Restart your terminal

### "Port 3000 already in use"
- Change PORT in `.env`:
  ```
  PORT=3001
  ```
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### "Cannot GET /"
- Make sure `public/index.html` exists
- Check the file path is correct

### "Token verification failed"
- Clear browser cookies
- Logout and login again
- Check JWT_SECRET is consistent

### "Password doesn't match"
- Ensure bcrypt is installed: `npm install bcrypt`
- Check password hash was generated correctly

---

## 📝 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "password": "password123"
  }' -c cookies.txt
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -b cookies.txt
```

### Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

---

## 🚀 Next Steps

1. **Practice** - Complete all exercises in [EXERCISES.md](EXERCISES.md)
2. **Enhance** - Add new features like 2FA, password reset, etc.
3. **Integrate** - Connect to a real database (MongoDB/PostgreSQL)
4. **Deploy** - Deploy to Heroku, AWS, or DigitalOcean
5. **Monitor** - Add logging, error tracking, and analytics

---

## 💡 Pro Tips

- Use browser DevTools (Network tab) to inspect API calls
- Check cookies in DevTools → Application → Cookies
- Use Postman for advanced API testing
- Read error messages carefully - they guide you to solutions
- Test edge cases (empty fields, invalid emails, etc.)
- Look at the console logs for debugging info

---

## 📞 Need Help?

- Check [README.md](README.md) for detailed documentation
- See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for architecture
- Review [EXERCISES.md](EXERCISES.md) for solutions
- Check browser Console for error messages
- Verify all dependencies are installed: `npm list`

---

## 🎓 What You're Learning

By working through this project, you'll understand:

✓ How JWT tokens work and why they're secure  
✓ Password hashing and why it matters  
✓ HTTP cookies and their security properties  
✓ RESTful API design patterns  
✓ Express.js middleware and routing  
✓ Authentication vs Authorization  
✓ Token refresh and expiration strategies  
✓ Secure logout and token revocation  

---

## 📊 Technology Stack

- **Backend**: Node.js + Express.js
- **Security**: JWT + Bcrypt
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Storage**: In-memory (replace with DB in production)
- **Theme**: Gerglegreen & Light Green

---

**Happy Learning! 🎉**

*Last Updated: March 26th, 2026*

---

### Quick Commands Reference

```bash
# Install dependencies
npm install

# Start server
npm start

# Test API health
curl http://localhost:3000/api/health

# View all users (for testing)
curl http://localhost:3000/api/auth/users
```

---

**Ready to explore JWT authentication? Start with Step 1 above! 🚀**
