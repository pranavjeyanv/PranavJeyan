#!/bin/bash

# Stop all background Node processes
echo "Stopping servers..."
pkill -f "node" 2>/dev/null || true
sleep 1
echo "Servers stopped."
