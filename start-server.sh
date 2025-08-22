#!/bin/bash

# AgentOS Demo Development Server
# This script starts a local web server to run the AgentOS demo application

echo "🚀 Starting AgentOS Demo Development Server..."
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found, starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser to view the demo"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python found, starting server..."
    echo "🌐 Server will be available at: http://localhost:8000"
    echo "📱 Open this URL in your browser to view the demo"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python not found. Please install Python 3 or use an alternative method:"
    echo ""
    echo "Alternative methods:"
    echo "1. Install Python 3: https://www.python.org/downloads/"
    echo "2. Use Node.js: npx http-server"
    echo "3. Use PHP: php -S localhost:8000"
    echo "4. Use any other local web server"
    echo ""
    echo "Or simply open index.html directly in your browser (some features may not work)"
    exit 1
fi
