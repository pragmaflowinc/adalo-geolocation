  import React, {  } from 'react'
import { StyleSheet, ImageStyle, TextStyle, ViewStyle, View } from 'react-native'
import { getDistance } from 'geolib'
import { GeoFilteredListProps, IItems } from './generated'
import { SimpleList } from '@protonapp/material-components'
import EmptyState from './EmptyState'

const METER_TO_MILE = 1609.34
const METER_TO_KILOMETER = 1000

export function GeoFilteredListComponent(props: GeoFilteredListProps) {
  console.log(`GeoFilteredListComponent`)
  if (!props.currentLatitude && !props.currentLongitude) {
    return <View></View>
  }
  const listProps = Object.assign({}, props)
  if (listProps.items && listProps.items.length > 0 && listProps.items[0].secondLine?.displayDistance) {
    listProps.items = listProps.items.reduce((acc, item) => {
      if (item.secondLine) {
        const distance = Math.floor(getDistance(
          { latitude: props.currentLatitude!, longitude: props.currentLongitude! },
          { latitude: item.geoData?.itemLatitude!, longitude: item.geoData?.itemLongitude! }
        ) / (props.unitsOfMeasure === 'imperial' ? METER_TO_MILE : METER_TO_KILOMETER))
        item.secondLine.text = `${distance}${props.unitsOfMeasure === 'imperial' ? 'mi' : 'km'}${item.secondLine && item.secondLine.text ? ` - ${item.secondLine.text}` : ''}`
        if (props.currentRadius && distance <= props.currentRadius) {
          acc.push(item)
        }
      }
      return acc
    }, [] as IItems[])
  }
  
  const renderEmptyState =
  listProps.listEmptyState &&
  ((listProps.items && !listProps.items[0]))
if (renderEmptyState) {
  return <EmptyState {...listProps.listEmptyState!}></EmptyState>
}
    return (
      <SimpleList {...listProps} />
    )
}