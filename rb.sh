#!/bin/bash
BRANCH=${1:-$(git symbolic-ref --short HEAD)}
BRANCH_PULL=${2:-"dev"}
status=$(git status --porcelain)
if [[ $status == *"M "* || $status == *"A "* ]]; then
  git stash
fi
git checkout $BRANCH_PULL
git pull origin $BRANCH_PULL
if git rev-parse --verify --quiet "refs/heads/$BRANCH" >/dev/null; then
  git checkout $BRANCH
  git rebase $BRANCH_PULL
  if [[ $status == *"M "* || $status == *"A "* ]]; then
    git stash pop
  fi
else
  git checkout -b $BRANCH
fi

