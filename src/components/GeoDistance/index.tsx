import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { RowProps, SimpleList } from "../SimpleList";
import { GeoDistanceProps } from "./generated";

const METER_TO_MILE = 1609.34;
const METER_TO_KILOMETER = 1000;

const GeoDistance = (props: GeoDistanceProps) => {
  const [distance, setDistance] = useState(0)
  useEffect(() => {
    const { firstLatitude = 0, firstLongitude = 0, secondLatitude = 0, secondLongitude = 0, unitsOfMeasure = 'imperial' } = props
      const calDistance = Number((
        getDistance(
          {
            latitude: firstLatitude,
            longitude: firstLongitude,
          },
          {
            latitude: secondLatitude,
            longitude: secondLongitude,
          }
        ) /
          (unitsOfMeasure === "imperial"
            ? METER_TO_MILE
            : METER_TO_KILOMETER)
      ).toFixed(props.precision || 0));
      setDistance(calDistance)

      if (props.onCalculated) {
        props.onCalculated(calDistance)
      }
  }, [props])
  return (
    <View style={styles.wrapper}>
      <Text>{`${distance}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	}
})

export default GeoDistance