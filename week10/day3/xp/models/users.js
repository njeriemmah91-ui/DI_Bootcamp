// In-memory user storage (replace with database in production)
let users = [];

// User model
class User {
  constructor(id, username, email, passwordHash) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = new Date();
  }
}

// Add a new user
function addUser(username, email, passwordHash) {
  const id = users.length + 1;
  const user = new User(id, username, email, passwordHash);
  users.push(user);
  return user;
}

// Find user by username
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

// Find user by email
function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

// Find user by ID
function findUserById(id) {
  return users.find(user => user.id === id);
}

// Get all users (for testing only)
function getAllUsers() {
  return users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  }));
}

module.exports = {
  User,
  addUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  getAllUsers
};
