import React from "react";
import {
  View,
} from "react-native";
import { Button } from '@protonapp/react-native-material-ui';
import { GeoLocationProps } from "./generated";


export function EditorModeGeoLocationComponent({
  styles: { title: titleStyles },
  title = "Locate Me!",
  backgroundColor,
  icon
}: GeoLocationProps) {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <Button 
      icon={icon}
      text={title} 
      style={{
        container: {
          backgroundColor: backgroundColor
        },
        text: {
          color: titleStyles.color,
          fontFamily: titleStyles.fontFamily,
          fontSize: titleStyles.fontSize,
          fontWeight: titleStyles.fontWeight
        }
      }}
      ></Button>
    </View>
  );
}
