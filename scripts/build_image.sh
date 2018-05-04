#!/bin/bash

echo Builing image for magichub-frontend with version $1
docker build -t jenarvaezg/magichub-frontend:$1 -f docker/Dockerfile .
