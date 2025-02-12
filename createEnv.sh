#! /bin/env bash

read -p "Paste your OrbisDB environment: " ENVIRONMENT

read -p "Paste your OrbisDB context: " CONTEXT

read -sp "Paste your private key from wallet: " PRIVATE_KEY
echo # Add a newline after silent input

# Copy example file
cp .env.example .env

# Replace environment and private key
sed -i "s|ORBIS_ENVIRONMENT=.*|ORBIS_ENVIRONMENT=$ENVIRONMENT|" .env
sed -i "s|ORBIS_CONTEXT=.*|ORBIS_CONTEXT=$CONTEXT|" .env
sed -i "s|PRIVATE_KEY=.*|PRIVATE_KEY=$PRIVATE_KEY|" .env

echo
echo 'Done!'
