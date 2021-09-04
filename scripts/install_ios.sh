#!/bin/bash
set -e
set -x

yarn add react-native-geolocation-service
yarn add @voximplant/react-native-foreground-service


plutil -insert NSLocationWhenInUseUsageDescription -string 'Location permission when in use' info.plist

echo "configured iOS settings"