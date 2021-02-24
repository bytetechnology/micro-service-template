#!/usr/bin/env bash

# bail on errors
set -e

# clean out previous publication locally
npm run check
mkdir publish

# new build
cp -rf dist/api publish/.
cp package-publish.json publish/package.json

# set version number for publish
VERSION=$(npx json -f package.json version)
echo "publishing version $VERSION"
npx json -I -f publish/package.json -e "this.version='$VERSION'"

# publish
cp .npmrc publish/.
cd publish
npm publish
cd -

