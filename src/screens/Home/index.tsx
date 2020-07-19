import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//import { BLEContext } from '../../contexts/BLEPlx';
import { BLEContext } from '../../contexts/BLE';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import BottomSheet from 'reanimated-bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';

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

  const bottomSheetRef = useRef();

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}>
        </View>
      </View>
    </View>
  )

  const renderContent = () => {
    return <View style={styles.panel}>
      <Text style={styles.panelTitle}>接触確認アプリ {fd6fDevices.length}</Text>
      <Text style={styles.panelSubtitle}>BLEデバイス {devices.length}</Text>
      {
        isScanning
          ?
          (
            <View style={{ flexDirection: 'row' }} >
              <ActivityIndicator />
              <Button
                title='スキャン停止'
                onPress={stopScan}
              />
            </View>
          )
          :
          (
            <Button
              title='スキャン開始'
              onPress={startScan}
            />
          )
      }
    </View>
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
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
              <Circle
                center={{
                  latitude: position?.coords?.latitude,
                  longitude: position?.coords?.longitude,
                }}
                radius={40}
                strokeColor='red'
                strokeWidth={5}
                fillColor='rgba(255, 220, 220, 0.8)'
                isPreselected={true}
              />
            </MapView>
          )

        }
        <BottomSheet
          snapPoints={[150]}
          renderContent={renderContent}
          renderHeader={renderHeader}
          initialSnap={0}
          ref={bottomSheetRef}
        />
        <View style={styles.spacer} />
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0
  },
  map: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  },
  spacer: {
    backgroundColor: '#f5f5f5',
    height: 20,
  },
  panel: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    height: 200,
  },
  header: {
    backgroundColor: '#f5f5f5',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
    marginBottom: 10
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});