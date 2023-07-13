#!/bin/bash

FOLDER=/var/www/html/node_modules
if [ -d $FOLDER ]; then
    npm start
else
    npm install
    npm start
fi
