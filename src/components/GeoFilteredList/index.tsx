import React from "react";
import { Component } from "react";
import { View } from "react-native";
import { GeoFilteredListProps } from "./generated";
import { GeoFilteredListComponent } from "./GeoFilteredListComponent";

class GeoFilteredList extends Component<GeoFilteredListProps> {
  render() {
    console.log(`GeoFilteredList`)
    console.log(this.props)
    return (
      <View>
        <GeoFilteredListComponent {...this.props} />
      </View>
    )
  }
}

export default GeoFilteredList