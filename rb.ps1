Param(
  [string]$BRANCH = (git rev-parse --abbrev-ref HEAD),
  [string]$BRANCH_PULL = "dev"
)
$status = git status --porcelain
if ($status) {
  git stash
}
git checkout $BRANCH_PULL
git pull origin $BRANCH_PULL
$branchExists = git show-ref --verify "refs/heads/$BRANCH"

if ($branchExists) {
  git checkout $BRANCH
  git rebase $BRANCH_PULL
  if ($status) {
    git stash pop
  }
} else {
  git checkout -b $BRANCH
}
