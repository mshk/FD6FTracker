import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { BLEContext } from '../../contexts/BLEPlx';
import { BLEContext } from '../../contexts/BLE';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const HomeScreen = () => {
  const {
    devices,
    startScan,
    stopScan,
    isScanning,
  } = BLEContext.useContainer();
  const [position, setPosition] = useState({});

  useEffect(() => {
    startScan();
    Geolocation.getCurrentPosition(
      _position => {
        setPosition(_position);
        console.log('_position', _position);
      },
      err => alert(err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
    );
  }, []);

  const fd6fDevices = devices.filter(d => d?.isFDF6);
  const percentage =
    fd6fDevices.length
      ? Math.floor((fd6fDevices.length / devices.length) * 100)
      : 0;
  const sections =
    percentage
      ? [{
        percentage,
        color: '#f00',
      }]
      : [];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar translucent backgroundColor="red" />
      {
        position?.coords?.latitude && (
          <MapView
            initialRegion={{
              latitude: position?.coords?.latitude,
              longitude: position?.coords?.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={{
              flex: 1
            }}
          >
            <Marker
              coordinate={{
                latitude: position?.coords?.latitude,
                longitude: position?.coords?.longitude,
              }}
              title='title'
              description={devices.length.toString()}
              isPreselected={true}
            />
            </MapView>

        )
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', height: 1050 },
  gauge: {
    marginTop: 100,
    position: 'absolute',
    width: 360,
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 42,
    fontWeight: 'bold'
  },
  gaugeTextTotal: {
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: 20,
  },
  gaugeTextScanning: {
    backgroundColor: 'transparent',
    color: '#555',
    fontSize: 15,
  },
});