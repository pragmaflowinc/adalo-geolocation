import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform, ImageSourcePropType } from 'react-native'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist'

interface SimpleListProps {
  items: RowProps[]
  dividerType?: string
  dividerColor?: string
}

export interface RowProps {
  id: string | number,
  onPress?: () => void
  dividerType?: string
  dividerColor?: string
  leftSection?: {
    enabled?: boolean
    type?: string
    image: ImageSourcePropType
    icon?: string
    iconColor?: string
  }
  lastRow?: boolean
  firstLine: LineProps
  secondLine?: LineProps
  rightSection?: {
    enabled?: boolean
    type?: string
    icon?: string
    iconColor?: string
    onPress: () => void
  }
}

export function SimpleList({ items = [], dividerType, dividerColor, ...rest }: SimpleListProps)   {
  if (Array.isArray(items)) {
    return (
      <View style={styles.wrapper}>
        {items.map((itm, i) => (
          <Row
            {...itm}
            {...rest}
            key={itm.id}
            dividerType={dividerType}
            dividerColor={dividerColor}
            lastRow={i === items.length - 1}
          />
        ))}
      </View>
    )
  }
  return <View style={styles.wrapper}>Something went wrong</View>
}


function Row({ onPress, dividerType, leftSection, rightSection, dividerColor, lastRow, firstLine, secondLine }: RowProps) {
  function getDividerInset() {
    if (dividerType !== 'inset') { return 0; }
    let baseInset = 16
    if (!leftSection || !leftSection.enabled) { return baseInset }
    if (leftSection.type === 'icon' || leftSection.type === 'avatar') {
      return baseInset * 2 + 40
    }
    if (leftSection.type === 'image') {
      return baseInset * 2 + 56
    }
    return 0
  }

  function getDividerStyles() {
    return {
      left: getDividerInset(),
      backgroundColor: dividerColor
    }
  }

  function hasDivider() {
    return !lastRow && dividerType && dividerType !== 'none'
  }

  function renderLeftSection() {
    if (!leftSection || !leftSection.enabled) { return null }
    let source = leftSection.image

    if (leftSection.type === 'icon') {
      return (
        <View style={styles.iconWrapper} pointerEvents="none">
          <Icon
            size={24}
            name={leftSection.icon}
            color={leftSection.iconColor}
          />
        </View>
      )
    }

    if (leftSection.type === 'avatar') {
      return (
        <Image
          resizeMode="cover"
          source={source}
          style={styles.avatar}
        />
      )
    }

    if (leftSection.type === 'image') {
      return (
        <Image
          resizeMode="cover"
          source={source}
          style={styles.image}
        />
      )
    }

    return null
  }

  function renderRightSection() {
    if (!rightSection || !rightSection.enabled) { return null }
    if (rightSection.type === 'icon' && rightSection.icon) {
      return (
        <IconToggle
          name={rightSection.icon}
          color={rightSection.iconColor}
          underlayColor={rightSection.iconColor}
          maxOpacity={0.3}
          size={24}
          onPress={rightSection.onPress}
          style={{ container: { marginRight: -12 } }}
        />
      )
    }
    return null
  }

  function renderContent() {
    
    return (
      <View style={styles.row}>
        {renderLeftSection()}
        <View style={styles.main} pointerEvents="none">
          <FirstLine {...firstLine} />
          {(secondLine && secondLine.enabled)
            ? <SecondLine {...secondLine} />
            : null}
        </View>
        {renderRightSection()}
        {hasDivider()
          ? <View style={[styles.divider, getDividerStyles()]} />
          : null}
      </View>
    )
  }
  if (onPress) {
    return (
      <View>
        <RippleFeedback onPress={onPress}>
          {renderContent()}
        </RippleFeedback>
      </View>
    )
  }

  return (
    <View>
      {renderContent()}
    </View>
  )
}

interface LineProps {
  text?: string,
  color?: string
  enabled?: boolean
}

function FirstLine({ color = '#212121', text = '' }: LineProps) {
  return (
      <Text
        style={[styles.firstLine, { color }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
  )
}

function SecondLine({ color = '#757575', text = '' }: LineProps) {
  return (
    <Text
      style={[styles.secondLine, { color }]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {text}
    </Text>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 1,
  },
  iconWrapper: {
    marginRight: 32,
    width: 24,
    height: 24,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  avatar: {
    marginRight: 16,
    borderRadius: 20,
    height: 40,
    width: 40,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#ccc',
  },
  image: {
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    height: 56,
    width: 56,
    backgroundColor: '#ccc',
  },
  main: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  firstLine: {
    lineHeight: 20,
    fontSize: 16,
    maxWidth: '100%',
  },
  secondLine: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 14,
    maxWidth: '100%',
  }
})
