#!/bin/bash
set -e
set -x

yarn add react-native-geolocation-service
yarn add @voximplant/react-native-foreground-service

name=$PROJECT_NAME

if grep -q "<key>NSLocationWhenInUseUsageDescription" ios/$name/Info.plist; then
  echo "Location already supported, nothing to do here."
else
  plutil -insert NSLocationWhenInUseUsageDescription -string 'Location permission when in use' ios/$name/Info.plist
fi

echo "configured iOS settings"