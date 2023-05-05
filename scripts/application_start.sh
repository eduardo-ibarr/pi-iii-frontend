#!/bin/bash

cd /var/www/html

# Clone your project repository, using the correct branch
git clone -b main https://github.com/eduardo-ibarr/pi-iii-frontend.git

cd pi-iii-frontend

# Install the project dependencies
npm install

# Build the React application
npm run build

# Move the build files to the HTTPD server directory
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html
