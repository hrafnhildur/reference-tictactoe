#!/bin/bash

scp -o StrictHostKeyChecking=no -i "/home/ubuntu/my_ec2_key.pem" /var/lib/jenkins/workspace/tictactoe/docker-compose.yaml ec2-user@54.218.99.220:docker-compose.yaml

scp -o StrictHostKeyChecking=no -i "/home/ubuntu/my_ec2_key.pem" /var/lib/jenkins/workspace/tictactoe/.env ec2-user@54.218.99.220:.env

ssh -i /home/ubuntu/my_ec2_key.pem ec2-user@54.218.99.220 docker-compose up -d
