#!/bin/bash

docker run --rm -p 27017:27017 --mount source=mongodata,target=/data/db --name vasi mongo
