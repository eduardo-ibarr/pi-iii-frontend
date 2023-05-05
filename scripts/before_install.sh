#!/bin/bash

# Install the system dependencies required for the HTTPD server
sudo yum update -y
sudo yum install -y httpd

# Start the HTTPD server
sudo service httpd start
