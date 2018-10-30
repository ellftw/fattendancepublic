#!/bin/bash

docker run -ti --rm -v `pwd`/dashboard:/usr/share/ -w /usr/share/ -p 9090:9090 ellftw/fingerprint-server npm install
docker run --rm -ti -v `pwd`/dashboard/:/usr/share/ -w /usr/share/ -p 9090:9090 ellftw/fingerprint-server npm run dev
