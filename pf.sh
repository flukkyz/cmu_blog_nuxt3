#!/bin/bash
BRANCH=git symbolic-ref --short HEAD
git push origin $BRANCH -f

