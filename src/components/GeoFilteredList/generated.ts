/*********** Manifest Props *******************
 * This file is auto generated, making manual *
 * edits to this file might result in loosing *
 * information.                               *
 **********************************************/
export interface IStyles {
  fontFamily?: string
  fontSize?: number
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | undefined
  textAlignment?: string
  color?: string
}

export interface IFonts {
  body: string
  heading: string
}

export interface IAvatar {
  uri: string
  cache: string
}

export interface IGeoData {
  itemLatitude?: number
  itemLongitude?: number
}

export interface IFirstLine {
  text?: string
  styles: { text: IStyles }
  titleLineNum?: number
}

export interface ISecondLine {
  enabled?: boolean
  displayDistance?: boolean
  text?: string
  styles: { text: IStyles }
  subtitleLineNum?: number
}

export interface ILeftSection {
  enabled?: boolean
  type?: string
  icon?: string
  iconColor?: string
  image?: string | IAvatar
}

export interface IRightSection {
  enabled?: boolean
  iconType?: string
  icon?: string
  iconColor?: string
  onPress?: () => void
  input?: boolean
  activeIcon?: string
  activeColor?: string
  inactiveIcon?: string
  inactiveColor?: string
  activeActions?: () => void
  inactiveActions?: () => void
}

export interface IBackground {
  enabled?: boolean
  backgroundColor?: string
  border?: boolean
  borderColor?: string
  borderSize?: number
  rounding?: number
  shadow?: boolean
}

export interface IListHeader {
  enabled?: boolean
  header?: string
  styles: { header: IStyles }
}

export interface ISearchBar {
  enabled?: boolean
  placeholderText?: string
  styles: { placeholderText: IStyles, notFoundText: IStyles }
  notFoundText?: string
  customStyles?: boolean
  hasIcon?: boolean
  icon?: string
  iconColor?: string
  backgroundColor?: string
  hasBorder?: boolean
  borderColor?: string
  borderSize?: number
  rounding?: number
  placeholderTextColor?: string
  inputTextColor?: string
}

export interface IListEmptyState {
  emptyStateImageStatus?: string
  imageSource?: string | IAvatar
  textTitleDisplay?: string
  title?: string
  styles: { title: IStyles, subtitle: IStyles, buttonText: IStyles }
  subtitle?: string
  buttonType?: string
  buttonText?: string
  buttonIcon?: string
  buttonPrimaryColor?: string
  buttonContrastColor?: string
  buttonBorderRadius?: number
  buttonShadow?: boolean
  buttonUpperCase?: boolean
  buttonAction?: () => void
}

export interface IItems {
  id: number
  geoData?: IGeoData
  firstLine?: IFirstLine
  secondLine?: ISecondLine
  leftSection?: ILeftSection
  rightSection?: IRightSection
  _meta: any
}

export interface GeoFilteredListProps {
  firstLine?: { "text": IStyles }
  secondLine?: { "text": IStyles }
  background?: IBackground
  listHeader?: IListHeader
  searchBar?: ISearchBar
  listEmptyState?: IListEmptyState
  items?: IItems[]
  currentLatitude?: number
  currentLongitude?: number
  currentRadius?: number
  unitsOfMeasure?: string
  dividerType?: string
  dividerColor?: string
  onPress?: () => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}