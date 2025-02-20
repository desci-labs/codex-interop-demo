#! /usr/bin/env bash

set -euo pipefail

read -p "Paste your OrbisDB environment: " ENVIRONMENT

read -sp "Paste your private key from wallet: " PRIVATE_KEY
echo # Add a newline after silent input

# Replace environment and private key
sed "s|ORBIS_ENVIRONMENT=.*|ORBIS_ENVIRONMENT=$ENVIRONMENT|" .env.example > .env
sed -i'' "s|PRIVATE_KEY=.*|PRIVATE_KEY=$PRIVATE_KEY|" .env

echo
echo 'Done!'
