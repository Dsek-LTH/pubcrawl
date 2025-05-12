#!/bin/bash

# Colours for output
GREEN="\033[0;32m"
CYAN="\033[0;36m"
RED="\033[0;31m"
RESET="\033[0m"

# Banner
echo -e "${CYAN}========================================"
echo -e "           Starting Dev Setup"
echo -e "========================================${RESET}\n\n"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed. Please install Docker and try again.${RESET}"
    exit 1
fi

# Run Docker Compose
echo -e "${GREEN}Bringing up Docker containers...${RESET}\n"
#docker-compose -f compose.dev.yaml up -d --remove-orphans

if docker compose -f compose.dev.yaml up -d --remove-orphans; then
    echo -e "\n${GREEN}Docker containers are up and running!${RESET}"
else
    echo -e "\n${RED}Failed to start Docker containers.${RESET}"
    exit 1
fi

# Navigate to the database directory and run migrations
echo -e "\n\n${CYAN}Navigating to apps/db and running migrations...${RESET}"

if cd apps/db && pnpm run push; then
    echo -e "\n${GREEN}Migrations applied successfully!${RESET}"
else
    echo -e "\n${RED}Failed to apply migrations.${RESET}"
    exit 1
fi

# Footer
echo -e "\n\n${CYAN}========================================"
echo -e "             Setup Complete"
echo -e "========================================${RESET}"
