#!/bin/bash
set -e #terminate if errors

sleep 10 # wait 10 s
npm run migratedb-prod
node run.js

exit 0