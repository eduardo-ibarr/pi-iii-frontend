#!/bin/bash

cd /var/www/html/pi-iii-frontend

# Install the project dependencies
npm install

# Move the build files to the HTTPD server directory
sudo rm -rf /var/www/html/*
sudo cp -r build/* /var/www/html
