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


export interface GeoDistanceProps {
  firstLatitude?: number
  firstLongitude?: number
  secondLatitude?: number
  secondLongitude?: number
  unitsOfMeasure?: string
  precision?: number
  onCalculated?: (Thedistance?: number) => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}