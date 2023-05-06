#!/bin/bash

# Set the project root directory
cd /var/www/html/frontend-pi-iii

# Install dependencies
npm install

# Stop the application, if it's running
if pm2 status | grep -q frontend-pi-iii; then
  pm2 stop frontend-pi-iii
fi

# Start the application with PM2
pm2 start npm --name "frontend-pi-iii" -- start
