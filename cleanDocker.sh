#!/bin/bash

#Kill all running containers
echo "killing running containers...."
docker kill $(docker ps -q)

#Delete all stopped containers (including data-only containers)
echo "deleting stopped containers...."
docker rm $(docker ps -a -q)

#Delete ALL images
echo "deleting all images...."
docker rmi $(docker images -q)

echo "Cleanup Done..!"
