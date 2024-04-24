#!/bin/bash
MEAASGE=$1
BRANCH=git symbolic-ref --short HEAD

git add .
git commit -m $MEAASGE
git push origin $BRANCH

