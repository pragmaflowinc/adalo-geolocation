/*********** Manifest Props *******************
 * This file is auto generated, making manual *
 * edits to this file might result in loosing *
 * information.                               *
 **********************************************/
export interface IStyles {
  fontFamily?: string
  fontSize?: number
  fontWeight?: number | string
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
  interval?: number
  timeout?: number
  maximumAge?: number
  highAccuracy?: boolean
  significantChanges?: boolean
  liveUpdates?: boolean
  onLocationError?: (GeolocationPositionErrorreasoncode?: number, Additionaldetails?: string) => void
  onLocationChange?: (Currentlatitude?: number, Currentlongitude?: number, Currentheading?: number, Accuracyoflocation?: number, Currentaltitude?: number, Accuracyofthealtitude?: number, Currentspeed?: number, Timestampwhenlocationwasread?: number) => void
  appId: string
  _fonts: IFonts
  _width: number
  _height: number
  editor: boolean
}