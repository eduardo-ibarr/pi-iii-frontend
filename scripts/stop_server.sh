#!/bin/bash

set -e

# Stop Apache web server
echo "Stopping Apache web server"
systemctl stop httpd

exit 0
