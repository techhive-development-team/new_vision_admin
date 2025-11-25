#!/bin/bash

GREEN='\033[32m'
RESET='\033[0m'

if [ -n "$(git status --porcelain)" ]; then
  echo -e "${GREEN}⚡ UNCOMMITTED CHANGES PRESENT - SKIPPING GIT PULL${RESET}"
else
  git fetch origin main || { echo -e "${RED}Git fetch failed${RESET}"; exit 1; }
  git checkout main || { echo -e "${RED}Git checkout main failed${RESET}"; exit 1; }
  git pull --ff-only origin main || { echo -e "${RED}Git pull failed${RESET}"; exit 1; }
fi

echo -e "${GREEN}⚡ INSTALLING NODE DEPENDENCIES USING NPM ${RESET}"
npm install

echo -e "${GREEN}⚡ BUILDING THE PROJECT ${RESET}"
npm run build

if pm2 list | grep -q "react-admin"; then
  echo -e "${GREEN}⚡ RESTARTING PM2 ${RESET}"
  pm2 restart react-admin --namespace new-vision-frontend --update-env
else
  echo -e "${GREEN}⚡ STARTING PM2 ${RESET}"
  pm2 start "serve -s dist -l 3000" --name react-admin --namespace new-vision-frontend --update-env
fi
