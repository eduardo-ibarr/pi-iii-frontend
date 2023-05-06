#!/bin/bash

set -e

APP_PORT=3000
HTTP_PORT=80

# Check if PM2 is running
if ! pm2 status | grep -q online; then
    echo "ERROR: PM2 is not running"
    exit 1
fi

# Check if the APP is listening on the expected port
if lsof -Pi :$APP_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "App is running on port $APP_PORT"
else
    echo "ERROR: App is not running on port $APP_PORT"
    exit 1
fi

# Check if the HTTP server is listening on the expected port
if lsof -Pi :$HTTP_PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "HTTP server is running on port $HTTP_PORT"
else
    echo "ERROR: HTTP server is not running on port $HTTP_PORT"
    exit 1
fi

# Check if the server is responding with HTTP 200 OK
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:$APP_PORT)
if [ $RESPONSE -eq 200 ]; then
    echo "Service is responding correctly on port $APP_PORT"
else
    echo "ERROR: Service is not responding correctly on port $APP_PORT"
    exit 1
fi

exit 0
