import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RowProps, SimpleList } from "../SimpleList";
import EmptyState from "./EmptyState";
import { GeoFilteredListProps } from "./generated";

const METER_TO_MILE = 1609.34;
const METER_TO_KILOMETER = 1000;

const GeoFilteredList = (props: GeoFilteredListProps) => {
  const [items, setItems] = useState<RowProps[]>([])

  useEffect(() => {
    if (props.items) {
      setItems(props.items.filter(item => {
        const distance = Math.floor(
          getDistance(
            {
              latitude: props.currentLatitude!,
              longitude: props.currentLongitude!,
            },
            {
              latitude: item.geoData?.itemLatitude!,
              longitude: item.geoData?.itemLongitude!,
            }
          ) /
            (props.unitsOfMeasure === "imperial"
              ? METER_TO_MILE
              : METER_TO_KILOMETER)
        );
        return distance <= (props.currentRadius || Number.MAX_SAFE_INTEGER)
      }).map(item => {
        const retVal = {
          id: item.id,
          firstLine: item.firstLine,
          onPress: () => {
            if (props.onPress) {
              props.onPress()
            }
          },
          rightSection: item.rightSection,
          leftSection: item.leftSection,
          dividerColor: props.dividerColor,
          dividerType: props.dividerType
        } as RowProps
        if (item.secondLine && item.secondLine.enabled) {
          const secondLineTextBuilder = []
          if (item.secondLine.displayDistance) {
            const distance = Math.floor(
              getDistance(
                {
                  latitude: props.currentLatitude!,
                  longitude: props.currentLongitude!,
                },
                {
                  latitude: item.geoData?.itemLatitude!,
                  longitude: item.geoData?.itemLongitude!,
                }
              ) /
                (props.unitsOfMeasure === "imperial"
                  ? METER_TO_MILE
                  : METER_TO_KILOMETER)
            );
            secondLineTextBuilder.push(
              `${distance}${props.unitsOfMeasure === "imperial" ? "mi" : "km"}`
            )
          }
          if (item.secondLine.text) {
            secondLineTextBuilder.push(item.secondLine.text)
          }
          retVal.secondLine = {
            text: secondLineTextBuilder.join(' - '),
            color: item.secondLine.styles.text.color,
            enabled: true
          }
        }
        return retVal
      }))
    }
  }, [props])
  if (props.listEmptyState && (!items || (items && !items[0]))) {
    return <EmptyState {...props.listEmptyState!}></EmptyState>;
  }

  return (
    <View style={styles.wrapper}>
      <SimpleList items={items} dividerColor={props.dividerColor} dividerType={props.dividerType} />
    </View>
  )
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	}
})

export default GeoFilteredList