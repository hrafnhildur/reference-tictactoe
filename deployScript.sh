#!/bin/bash

scp -o StrictHostKeyChecking=no -i "var/lib/jenkins/my-ec2-key.pem" /var/lib/jenkins/workspace/commit/docker-compose.yaml ec2-user@54.218.99.220:~/docker-compose.yaml

scp -o StrictHostKeyChecking=no -i "var/lib/jenkins/my-ec2-key.pem" /var/lib/jenkins/workspace/commit/build/.env ec2-user@54.218.99.220:~/.env

ssh -i var/lib/jenkins/my-ec2-key.pem ec2-user@54.218.99.220 docker-compose up -d
