#!/bin/bash

docker run --rm -ti -v `pwd`/dashboard/:/usr/share/ -w /usr/share/ -p 9090:9090 ellftw/fingerprint-server npm run dev