#!/bin/bash

set -e

# Change ownership of project directory
echo "Changing ownership of project directory"
chown -R apache:apache /var/www/html/frontend-pi-iii

# Set permissions for project directory
echo "Setting permissions for project directory"
chmod -R 755 /var/www/html/frontend-pi-iii

# Start Apache web server
echo "Starting Apache web server"
systemctl start httpd

exit 0
