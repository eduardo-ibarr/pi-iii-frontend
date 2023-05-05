#!/bin/bash

# Configure the correct permissions for the HTTPD server files
sudo chown -R apache:apache /var/www/html

# Restart the HTTPD server
sudo service httpd restart
