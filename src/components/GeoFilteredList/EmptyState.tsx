import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ViewStyle, ImageStyle } from 'react-native'
// @ts-ignore
import Icon from 'react-native-vector-icons/dist/MaterialIcons'

import {TextButton as WrappedTextButton} from "@protonapp/material-components"
import sqrEmptyStateImage from './SqrEmptyState'
import { IListEmptyState } from './generated'

export default class EmptyListWrapper extends Component<IListEmptyState> {
  defaultProps = {
    buttonType: 'noButton',
    buttonText: 'Button',
    buttonIcon: 'add',
    buttonBorderRadius: 4,
    buttonShadow: true,
    buttonUpperCase: true,
    textTitleDisplay: 'titleOnly',
    title: 'No List Items',
    subtitle: 'Subtitle',
  }

  render() {
    let {
      buttonType = 'noButton',
      buttonText = 'Button',
      buttonIcon = 'add',
      buttonPrimaryColor,
      buttonContrastColor,
      buttonBorderRadius = 3,
      buttonShadow = true,
      buttonUpperCase = true,
      buttonAction,
      styles: emptyListStyles,
    } = this.props

    emptyListStyles.title = emptyListStyles.buttonText

    const buttonStyles =
      (buttonShadow && buttonType !== 'text' && buttonType !== 'outlined'
        ? {
            flexDirection: 'row',
            shadowRadius: 3,
            elevation: 3,
            shadowOpacity: 0.2,
            borderRadius: buttonBorderRadius,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          }
        : {}) as ViewStyle

    return (
      <>
        <ImageHolder {...this.props} />
        {buttonType && buttonType !== 'noButton' && (
          <View style={{ alignItems: 'center' }}>
            <View style={buttonStyles}>
              <WrappedTextButton
                type={buttonType}
                text={buttonText}
                icon={buttonIcon}
                primaryColor={buttonPrimaryColor}
                contrastColor={buttonContrastColor}
                borderRadius={buttonBorderRadius}
                shadow={buttonShadow}
                upperCase={buttonUpperCase}
                action={buttonAction}
                styles={emptyListStyles}
                container={{
                  alignSelf: 'center',
                }}
              />
            </View>
          </View>
        )}
      </>
    )
  }
}

function ImageHolder(props: IListEmptyState) {
  let { imageSource, emptyStateImageStatus } = props
  let realImageSource = !imageSource
    ? require(sqrEmptyStateImage)
    : imageSource
  if (!emptyStateImageStatus || emptyStateImageStatus === 'noImage') {
    return (
      <>
        <TitleHolder {...props}></TitleHolder>
      </>
    )
  } else if (emptyStateImageStatus === 'above') {
    return (
      <>
        <View style={styles.emptyList}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={realImageSource}
          />
        </View>
        <TitleHolder {...props}></TitleHolder>
      </>
    )
  } else {
    return (
      <>
        <TitleHolder {...props}></TitleHolder>
        <View style={styles.emptyList}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={realImageSource}
          />
        </View>
      </>
    )
  }
}

function TitleHolder(props: IListEmptyState) {
  let {
    title = 'No List Items',
    subtitle = 'Subtitle',
    textTitleDisplay = 'noText',
    styles: emptyWrapperStyle = {
      title: {
        fontWeight: '600',
        fontSize: 18,
      },
      subtitle: {
        fontSize: 18,
      },
    },
  } = props
  if (!textTitleDisplay || textTitleDisplay === 'noText') {
    return <></>
  } else if (textTitleDisplay === 'titleOnly') {
    return (
      <View>
        <Text style={[styles.textStyle, emptyWrapperStyle.title]}>{title}</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text style={[styles.textStyle, emptyWrapperStyle.title]}>{title}</Text>
        <Text style={[styles.textStyle, emptyWrapperStyle.subtitle]}>
          {subtitle}
        </Text>
      </View>
    )
  }
}

interface Styles {
  emptyList: ViewStyle,
  input: ViewStyle,
  icon: ImageStyle,
  image: ImageStyle,
  textStyle: ViewStyle
  buttonContainer: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  emptyList: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30,
  },
  input: {
    flex: 0.95,
    height: 40,
    fontSize: 18,
  },
  icon: {
    justifyContent: 'center',
    flex: 0.05,
  },
  image: {
    width: 0,
    height: 300,
    flex: 1,
  },
  textStyle: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    padding: 8,
    color: 'gray',
  },
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
  },
})