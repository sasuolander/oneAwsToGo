#!/bin/sh
nohup node /backend_server/app.js &
#run in foreground
nginx -g 'daemon off;'

#run in foreground
#node /backend_server/app.js
