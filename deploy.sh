# #! /bin/bash
rm -rf build/*
rm -rf public/*
rm -rf src/*
rm -rf package.json

cp ./../GradinglyFront/frontend/package.json ./
cp -r ./../GradinglyFront/frontend/public/* ./public/
cp -r ./../GradinglyFront/frontend/src/* ./src/
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