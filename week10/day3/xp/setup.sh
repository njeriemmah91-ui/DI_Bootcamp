#!/bin/bash

# JWT Authentication Project Setup Script
# This script helps verify the project structure is complete

echo "🔐 JWT Authentication Project Setup Verification"
echo "=================================================="
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js is installed: $(node --version)"
else
    echo "❌ Node.js is NOT installed"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm is installed: $(npm --version)"
else
    echo "❌ npm is NOT installed"
    exit 1
fi

echo ""
echo "📁 Checking project structure..."
echo ""

# Check files
files=(
    "package.json"
    "app.js"
    "routes/auth.js"
    "middleware/auth.js"
    "models/users.js"
    "public/index.html"
    "public/style.css"
    "README.md"
    "IMPLEMENTATION_GUIDE.md"
    "EXERCISES.md"
    ".env.example"
    ".gitignore"
)

missing_files=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
        ((missing_files++))
    fi
done

echo ""
if [ $missing_files -eq 0 ]; then
    echo "✅ All files are present!"
else
    echo "❌ $missing_files files are missing!"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install dependencies
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the server, run:"
echo "   npm start"
echo ""
echo "📖 Then open http://localhost:3000 in your browser"
echo ""
