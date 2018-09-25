#!/bin/bash

docker run -ti --rm -v `pwd`/node:/usr/share/ -w /usr/share/ -p 8080:8080 ellftw/fingerprint-server npm install
docker run -ti --rm -v `pwd`/node:/usr/share/ -w /usr/share/ -p 8080:8080 ellftw/fingerprint-server node_modules/nodemon/bin/nodemon.js src/index.js