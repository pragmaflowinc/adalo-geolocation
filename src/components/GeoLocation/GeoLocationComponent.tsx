import React, { useCallback, useEffect, useRef, useState } from "react";
import Geolocation from "react-native-geolocation-service";
import {
  View,
  Platform,
} from "react-native";
import { hasLocationPermission } from "./utils";
import { GeoLocationProps } from "./generated";
import VIForegroundService from '@voximplant/react-native-foreground-service';
import { Button } from '@protonapp/react-native-material-ui';

export function GeoLocationComponent({
  highAccuracy = false,
  significantChanges = false,
  liveUpdates = false,
  onLocationChange = (Currentlatitude?: number, Currentlongitude?: number, Currentheading?: number, Accuracyoflocation?: number, Currentaltitude?: number, Accuracyofthealtitude?: number, Currentspeed?: number, timestamp?: number) => null,
  onLocationError = (Reasonfortheerror?: number, Additionaldetails?: string) => null,
  styles: { title: titleStyles },
  title = "",
  icon,
  backgroundColor,
  interval = 5000,
  maximumAge = 10000,
  timeout = 15000
 }: GeoLocationProps) {
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>();
  const [error, setError] = useState<Geolocation.GeoError | null>();
  
  const watchId = useRef<number | null>(null);
  useEffect(() => {
    getLocation()
  }, [])
  useEffect(() => {
    if (liveUpdates) { getLocationUpdates() }
    else {removeLocationUpdates()}
  }, [liveUpdates])
  useEffect(() => {
    if(location) {
      onLocationChange(
        location.coords.latitude,
        location.coords.longitude,
        location.coords.heading || undefined,
        location.coords.accuracy,
        location.coords.altitude || undefined,
        location.coords.altitudeAccuracy || undefined,
        location.coords.speed || undefined,
        location.timestamp)
    }
  }, [location])

  useEffect(() => {
    if (error) {
      onLocationError(
        error.code,
        error.message
      )
    }
  }, [error])

  const stopForegroundService = useCallback(() => {
    VIForegroundService.stopService().catch((err) => err);
  }, []);
  
  const removeLocationUpdates = useCallback(() => {
    if (watchId.current !== null) {
      stopForegroundService();
      Geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, [stopForegroundService]);

  useEffect(() => {
    return () => {
      removeLocationUpdates();
    };
  }, [removeLocationUpdates]);

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setError(null)
      },
      (error) => {
        setLocation(null);
        setError(error)
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout,
        maximumAge,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: false,
      },
    );
  };
  
  const getLocationUpdates = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    if (Platform.OS === 'android') {
      await startForegroundService();
    }

    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        setLocation(null);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval,
        fastestInterval: interval / 2,
        forceRequestLocation: false,
        showLocationDialog: false,
        useSignificantChanges: significantChanges,
      },
    );
  };


  const startForegroundService = async () => {
    if (Platform.Version >= 26) {
      await VIForegroundService.createNotificationChannel({
        id: 'locationChannel',
        name: 'Location Tracking Channel',
        description: 'Tracks location of user',
        enableVibration: false,
      });
    }

    return VIForegroundService.startService({
      channelId: 'locationChannel',
      id: 420,
      title: 'Location',
      text: 'Tracking location updates',
      icon: 'ic_launcher',
    });
  };

  return (
    <View>
      <Button  
      icon={icon}
      text={title} 
      style={{
        container: {
          backgroundColor: backgroundColor
        },
        text: {
          color: titleStyles.color,
          fontFamily: titleStyles.fontFamily,
          fontSize: titleStyles.fontSize,
          fontWeight: titleStyles.fontWeight
        }
      }} 
      onPress={() => getLocation()}></Button>
    </View>
  );
}
