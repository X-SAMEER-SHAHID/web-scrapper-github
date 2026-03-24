#!/bin/bash

# JobSpy Full Stack Application Startup Script

echo "🚀 Starting JobSpy Full Stack Application..."
echo "=========================================="

# Function to check if a port is in use
check_port() {
    lsof -i:$1 > /dev/null 2>&1
    return $?
}

# Check if Python virtual environment exists
if [ ! -d "jobspy_env" ]; then
    echo "❌ Virtual environment not found. Please run setup first."
    exit 1
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ Frontend directory not found. Please run setup first."
    exit 1
fi

# Check if backend is already running
if check_port 5000; then
    echo "⚠️  Backend already running on port 5000"
else
    echo "🔧 Starting backend server..."
    # Start backend in background
    source jobspy_env/bin/activate && cd backend && python app.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
fi

# Wait a moment for backend to start
sleep 3

# Check if frontend is already running
if check_port 3000; then
    echo "⚠️  Frontend already running on port 3000"
else
    echo "🌐 Starting frontend development server..."
    # Start frontend
    cd frontend && npm start &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
fi

echo ""
echo "✅ Application started successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "To stop the application:"
echo "  - Press Ctrl+C to stop this script"
echo "  - Or run: pkill -f 'python app.py' && pkill -f 'npm start'"
echo ""

# Wait for user to stop
wait
