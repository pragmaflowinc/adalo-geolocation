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


export interface GeoLocationProps {
  title?: string
  styles: { title: IStyles }
  icon?: string
  backgroundColor?: string
  timeout?: number
  maximumAge?: number
  highAccuracy?: boolean
  significantChanges?: boolean
  liveUpdates?: boolean
  interval?: number
  onLocationError?: (GeolocationPositionErrorreasoncode?: number, Additionaldetails?: string) => void
  onLocationChange?: (Currentlatitude?: number, Currentlongitude?: number, Currentheading?: number, Accuracyoflocation?: number, Currentaltitude?: number, Accuracyofthealtitude?: number, Currentspeed?: number, Timestampwhenlocationwasread?: number) => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}