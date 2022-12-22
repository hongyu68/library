# pnpm update:version
if `git status | grep "master" &>/dev/null`; then

pnpm build
cd dist/library
pnpm publish

echo "✅ Publish completed"

else
    echo "Error: You must publish your code in the Master branch."
    exit 100
fi


