# Development Setup Script

#!/bin/bash

echo "🚀 Portfolio Website Development Setup"
echo "========================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) installed${NC}"

# Check MongoDB
echo -e "${YELLOW}Checking MongoDB...${NC}"
if ! command -v mongod &> /dev/null; then
    echo -e "${YELLOW}MongoDB not found. You can:${NC}"
    echo "  1. Install MongoDB locally"
    echo "  2. Use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    read -p "Continue without local MongoDB? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo -e "${GREEN}✓ MongoDB installed${NC}"
fi

# Setup Backend
echo -e "${YELLOW}Setting up Backend...${NC}"
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
echo -e "${GREEN}✓ Backend setup complete${NC}"

# Setup Frontend
echo -e "${YELLOW}Setting up Frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
echo -e "${GREEN}✓ Frontend setup complete${NC}"

# Create env files if not exist
echo -e "${YELLOW}Checking environment files...${NC}"
if [ ! -f "../backend/.env" ]; then
    cp ../backend/.env.example ../backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
fi

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created frontend/.env.local${NC}"
fi

echo ""
echo -e "${GREEN}Setup complete! 🎉${NC}"
echo ""
echo "Next steps:"
echo "==========="
echo "1. Start MongoDB (if local):"
echo "   - macOS: brew services start mongodb-community"
echo "   - Linux: sudo systemctl start mongodb"
echo "   - Or use MongoDB Atlas"
echo ""
echo "2. Update backend/.env with your MongoDB URI if using Atlas"
echo ""
echo "3. Open two terminals:"
echo "   Terminal 1 - Backend:"
echo "   cd backend && npm run dev"
echo ""
echo "   Terminal 2 - Frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Visit http://localhost:5173"
echo ""
echo "Admin access:"
echo "=============
echo "URL: http://localhost:5173/login"
echo "Create user via API or MongoDB manually"
