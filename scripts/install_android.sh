#!/bin/bash
set -e
set -x

yarn add react-native-geolocation-service
yarn add @voximplant/react-native-foreground-service

cd android/app

# AndroidManifest
cd src/main
cat <<EOF > /tmp/adalo-sed
/android.permission.INTERNET/a\\
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />\
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />\
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>\\
EOF

sed -i.bak "$(cat /tmp/adalo-sed)" AndroidManifest.xml

echo "configured Android settings"