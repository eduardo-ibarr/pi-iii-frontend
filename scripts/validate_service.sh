#!/bin/bash

# Check if the HTTPD server is running
if sudo service httpd status | grep running
then
    exit 0
else
    exit 1
fi
