Param(
  [string]$MEAASGE
)

$BRANCH = (git rev-parse --abbrev-ref HEAD)

git add .
git commit -m $MEAASGE
git push origin $BRANCH