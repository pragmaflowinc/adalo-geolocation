import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { EditorModeGeoLocationComponent } from './EditorModeGeoLocationComponent'
import { GeoLocationProps } from './generated'
import { GeoLocationComponent } from './GeoLocationComponent'
class GeoLocation extends Component<GeoLocationProps> {
	render() {
		console.log(this.props)
		const { editor } = this.props
		return (
			<View style={styles.wrapper}>
				{
					editor ?
					<EditorModeGeoLocationComponent {...this.props} />
					:
					<GeoLocationComponent {...this.props} />
				}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default GeoLocation
