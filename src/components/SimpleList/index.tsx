import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Platform, ImageSourcePropType, LayoutChangeEvent } from 'react-native'
import { RippleFeedback, IconToggle } from '@protonapp/react-native-material-ui'
//@ts-ignore
import Icon from 'react-native-vector-icons/dist'
import { IBackground, IFirstLine, IFonts, IListEmptyState, IListHeader, ISecondLine, IStyles } from '../GeoFilteredList/generated'
import EmptyState from '../GeoFilteredList/EmptyState'

interface SimpleListProps {
  items: RowProps[]
  dividerType?: string
  dividerColor?: string
  _fonts: IFonts
  background?: IBackground
  listHeader?: IListHeader
  listEmptyState?: IListEmptyState
  editor: boolean
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
  firstLine: IFirstLine
  secondLine?: ISecondLine
  rightSection?: {
    enabled?: boolean
    type?: string
    icon?: string
    iconColor?: string
    onPress: () => void
    iconType: string
  }
  editor: boolean
  _fonts: IFonts
  fullWidth: number
}


export class SimpleList extends Component<SimpleListProps, {fullWidth: number, currentQuery: String}> {
  state = {
    fullWidth: 0,
    currentQuery: '',
  }

  handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width } = (nativeEvent && nativeEvent.layout) || {}
    const { fullWidth: prevWidth } = this.state

    if (width !== prevWidth) {
      this.setState({ fullWidth: width })
    }
  }

  renderHeader() {
    let { listHeader, background, _fonts } = this.props

    if (!listHeader || !listHeader.header || !listHeader.enabled) {
      return null
    }
    let space = 0
    if (background && background.enabled) {
      space = 10
    }

    let headerStyles = [styles.header] as any[]
    if (listHeader.styles) {
      headerStyles.push(listHeader.styles.header)
    } else if (_fonts) {
      headerStyles.push({ fontFamily: _fonts.heading })
    }

    return (
      <>
        <Text style={headerStyles}>{listHeader.header}</Text>
        <View style={{ height: space }}></View>
      </>
    )
  }

  render() {
    let {
      items,
      dividerType,
      dividerColor,
      background,
      listHeader,
      listEmptyState,
    } = this.props

    if (!items) return <View></View>

    let wrap = [styles.wrapper] as any[]
    if (background && background.enabled) {
      let {
        backgroundColor,
        border,
        borderSize,
        borderColor,
        rounding,
        shadow,
      } = background
      wrap.push({ backgroundColor: backgroundColor, borderRadius: rounding })
      if (border) {
        wrap.push({ borderWidth: borderSize, borderColor: borderColor })
      }
      if (shadow) {
        wrap.push({
          shadowColor: '#000000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 10,
        })
      }
    } else {
      if (listHeader && listHeader.enabled) {
        wrap.push({ paddingTop: 4 })
      } else {
        wrap.push({ paddingTop: 8 })
      }
    }

    const renderEmptyState =
      listEmptyState &&
      ((items && !items[0]))
    if (renderEmptyState) {
      return <EmptyState {...listEmptyState}></EmptyState>
    }

    let { border } = background || {}

    const extraStyle = {}

    return (
      <>
        {this.renderHeader()}
        <View style={wrap} onLayout={this.handleLayout}>
            {items.map((itm, i) => (
              <Row
                {...itm}
                key={itm.id}
                dividerType={dividerType}
                dividerColor={dividerColor}
                lastRow={i === items.length - 1}
                fullWidth={this.state.fullWidth}
                editor={this.props.editor}
                _fonts={this.props._fonts}
              />
            ))}
        </View>
      </>
    )
  }
}

class Row extends Component<RowProps, {}> {
  getWidthLimit() {
    let { leftSection, rightSection, fullWidth } = this.props
    let leftSectWidth = 0
    let rightSectWidth = 0

    if (leftSection && leftSection.enabled) {
      if (leftSection.type === 'image') {
        leftSectWidth = 72
      } else {
        leftSectWidth = 56
      }
    }
    if (rightSection && rightSection.enabled) {
      rightSectWidth = 36
    }
    return fullWidth - leftSectWidth - rightSectWidth - 32
  }

  getDividerInset() {
    let { dividerType, leftSection } = this.props

    if (dividerType !== 'inset') {
      return 0
    }

    let baseInset = 16

    if (!leftSection || !leftSection.enabled) {
      return baseInset
    }

    if (leftSection.type === 'icon' || leftSection.type === 'avatar') {
      return baseInset * 2 + 40
    }

    if (leftSection.type === 'image') {
      return baseInset * 2 + 56
    }

    return 0
  }

  getDividerStyles() {
    let { dividerColor } = this.props

    if (!dividerColor) {
      dividerColor = '#e0e0e0'
    }

    return {
      left: this.getDividerInset(),
      backgroundColor: dividerColor,
    }
  }

  hasDivider() {
    let { dividerType, lastRow } = this.props

    if (!lastRow && dividerType && dividerType !== 'none') {
      return true
    }

    return false
  }

  renderLeftSection() {
    let { leftSection, firstLine, secondLine, editor } = this.props
    if (!leftSection || !leftSection.enabled) {
      return null
    }

    let source = leftSection.image

    if (leftSection.type === 'icon') {
      //56
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
      let avatarStyle = [styles.avatar] as any[]

      if ((firstLine.titleLineNum && firstLine.titleLineNum > 2) || (secondLine?.subtitleLineNum && secondLine?.subtitleLineNum > 2)) {
        avatarStyle.push({ marginTop: 18 })
      } else if (!editor) {
        avatarStyle.push({ marginTop: 16 })
      }
      return (
        <View style={styles.imageWrapper}>
          <Image
            resizeMode="cover"
            source={source}
            style={avatarStyle}
          />
        </View>
      )
    }

    if (leftSection.type === 'image') {
      let imageStyle = [styles.image] as any

      if ((firstLine.titleLineNum && firstLine.titleLineNum > 2) || (secondLine?.subtitleLineNum && secondLine?.subtitleLineNum > 2)) {
        imageStyle.push({ marginTop: 18 })
      }
      return (
        <View style={styles.imageWrapper}>
          <Image
            resizeMode="cover"
            source={source}
            style={imageStyle}
          />
        </View>
      )
    }
  }

  renderRightSection() {
    let { rightSection } = this.props

    if (!rightSection || !rightSection.enabled) {
      return null
    }

    let iconStyles = [{ marginRight: -12 }]
    let iconWrap = [styles.iconWrap]

    let { iconType, icon } = rightSection

    if ((!iconType || iconType === 'icon') && icon) {
      return (
        <View style={{ justifyContent: 'flex-start' }}>
          <View style={iconWrap}>
            <IconToggle
              name={rightSection.icon}
              color={rightSection.iconColor}
              underlayColor={rightSection.iconColor}
              maxOpacity={0.3}
              size={24}
              onPress={rightSection.onPress}
              style={{ container: iconStyles }}
            />
          </View>
        </View>
      )
    }

    return null
  }
  renderSubtitle() {
    let { secondLine } = this.props
    return secondLine && secondLine.enabled
  }

  renderContent() {
    let { leftSection, firstLine, secondLine, _fonts } = this.props
    let hasDivider = this.hasDivider()

    let row = [styles.row] as any[]
    if (
      ((firstLine?.titleLineNum && firstLine?.titleLineNum <= 2) && (secondLine?.subtitleLineNum && secondLine?.subtitleLineNum <= 2)) ||
      !firstLine.titleLineNum ||
      !secondLine?.subtitleLineNum
    ) {
      row.push({ alignItems: 'center' })
    }

    return (
      <View style={row}>
        {this.renderLeftSection()}
        <View style={styles.main} pointerEvents="none">
          <FirstLine
            {...firstLine}
            widthLimit={this.getWidthLimit()}
            _fonts={_fonts}
          />
          {this.renderSubtitle() ? (
            <SecondLine
              {...secondLine}
              widthLimit={this.getWidthLimit()}
              _fonts={_fonts}
              enabled={secondLine?.enabled || false}
            />
          ) : null}
        </View>
        {this.renderRightSection()}
        {hasDivider ? (
          <View style={[styles.divider, this.getDividerStyles()]} />
        ) : null}
      </View>
    )
  }

  render() {
    let { onPress } = this.props

    if (onPress) {
      return (
        <View>
          <RippleFeedback onPress={onPress}>
            {this.renderContent()}
          </RippleFeedback>
        </View>
      )
    }

    return <View>{this.renderContent()}</View>
  }
}

interface FirstLineProps extends IFirstLine {
  color?: String
  widthLimit: number
  _fonts?: IFonts
}

class FirstLine extends Component<FirstLineProps, {}> {
  static defaultProps = {
    text: '',
    color: '#212121',
  }
  render() {
    let { text, color, titleLineNum, widthLimit, _fonts } = this.props
    let breakless = text.replace(/(\r\n|\n|\r)/gm, '')
    //custom fonts
    let customFontStyles = this.props.styles ? this.props.styles.text : null
    let propStyles = [
      { color: customFontStyles ? customFontStyles.color : color },
    ] as any[]
    if (this.props.styles) {
      propStyles.push({
        fontFamily: customFontStyles?.fontFamily,
        fontWeight: customFontStyles?.fontWeight,
      })
    } else if (_fonts) {
      propStyles.push({ fontFamily: _fonts.body })
    }
    let titleLimit = widthLimit / 7.7
    if (titleLineNum == 2) {
      if (breakless.length > titleLimit) {
        const firstLine = breakless.substring(0, titleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>
              {breakless.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.firstLine, propStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {breakless.substring(i + 1)}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.firstLine, propStyles]}>{breakless}</Text>
          </View>
        )
      }
    }

    if (titleLineNum && titleLineNum > 2) {
      return (
        <Text style={[styles.firstLine, propStyles]} ellipsizeMode="tail">
          {breakless}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.firstLine, propStyles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {breakless}
      </Text>
    )
  }
}

interface SecondLineProps extends ISecondLine {
  color?: String
  widthLimit: number
  _fonts?: IFonts
}

class SecondLine extends Component<SecondLineProps, {}> {
  static defaultProps = {
    text: '',
    color: '#757575',
  }

  render() {
    let { text, color, subtitleLineNum, widthLimit, _fonts } = this.props
    let customFontStyles = this.props.styles ? this.props.styles.text : null
    let propStyles = [
      { color: customFontStyles ? customFontStyles.color : color },
    ] as any[]
    if (this.props.styles) {
      propStyles.push({
        fontFamily: customFontStyles?.fontFamily,
        fontWeight: customFontStyles?.fontWeight,
      })
    } else if (_fonts) {
      propStyles.push({ fontFamily: _fonts.body })
    }
    let subtitleLimit = widthLimit / 7
    let breakless = text?.replace(/(\r\n|\n|\r)/gm, '') || ""
    if (subtitleLineNum == 2) {
      if (breakless.length > subtitleLimit) {
        const firstLine = breakless.substring(0, subtitleLimit + 1)
        const i = firstLine.lastIndexOf(' ')
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.secondLine, propStyles]}>
              {breakless.substring(0, i + 1)}
            </Text>
            <Text
              style={[styles.secondLine, propStyles]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {breakless.substring(i + 1)}
            </Text>
          </View>
        )
      } else {
        return (
          <View style={styles.titleContainer}>
            <Text style={[styles.secondLine, propStyles]}>{breakless}</Text>
          </View>
        )
      }
    }
    if (subtitleLineNum && subtitleLineNum > 2) {
      return (
        <Text style={[styles.secondLine, propStyles]} ellipsizeMode="tail">
          {breakless}
        </Text>
      )
    }

    return (
      <Text
        style={[styles.secondLine, propStyles]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {breakless}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16,
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
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
  iconWrap: { justifyContent: 'center', height: 72 },
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
  imageWrapper: {
    height: '100%',
    justifyContent: 'flex-start',
  },
  main: {
    flex: 1,
    marginTop: 16,
    marginBottom: 16,
  },
  firstLine: {
    lineHeight: 20,
    fontSize: 16,
  },
  secondLine: {
    lineHeight: 18,
    marginTop: 2,
    fontSize: 14,
    maxWidth: '100%',
  },
  titleContainer: {},
})
