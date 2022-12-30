#!/bin/bash
#docker system prune --all --force --volumes
docker-compose up -d --build db
docker-compose up -d --build api