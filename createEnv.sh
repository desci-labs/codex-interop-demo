#! /bin/env bash

read -p "Paste your OrbisDB environment: " ENVIRONMENT

read -sp "Paste your private key from wallet: " PRIVATE_KEY
echo # Add a newline after silent input

# Copy example file
cp .env.example .env

# Replace environment and private key
sed -i "s|ORBIS_ENVIRONMENT=.*|ORBIS_ENVIRONMENT=$ENVIRONMENT|" .env
sed -i "s|PRIVATE_KEY=.*|PRIVATE_KEY=$PRIVATE_KEY|" .env

echo
echo 'Done!'
