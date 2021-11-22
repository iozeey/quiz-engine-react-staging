# #! /bin/bash
rm -rf build/*
rm -rf public/*
rm -rf src/*
rm -rf package.json

cp /Users/macbook/w/c/aleem/GradinglyFront/frontend/package.json ./
cp -r /Users/macbook/w/c/aleem/GradinglyFront/frontend/public/* ./public/
cp -r /Users/macbook/w/c/aleem/GradinglyFront/frontend/src/* ./src/
echo "---Deployment begin---";
start=`date +%s`
# nvm use 12.18
# yarn install
# yarn build    
git add ".";
git commit -m "Build $(date +"%Y-%m-%d-%H%M%S")";
git push;
end=`date +%s`
runtime=$((end-start))
echo "Run Time: $runtime"