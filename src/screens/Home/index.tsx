import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLEContext } from '../../contexts/BLEPlx';
import Pie from 'react-native-pie';



export const HomeScreen = () => {
  const {
    devices,
    startScan,
    stopScan,
    isScanning,
  } = BLEContext.useContainer();

  useEffect(() => {
    startScan();
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
        width: 420,
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 100
      }}>
        <Pie
          radius={180}
          innerRadius={140}
          sections={sections}
          backgroundColor="#ddd"
        />
        <View
          style={styles.gauge}
        >
          <Text
            style={styles.gaugeText}
          >
            {percentage}%
          </Text>
          <Text
            style={styles.gaugeTextTotal}
          >
            {fd6fDevices.length} / {devices.length}
          </Text>
          {
            isScanning
              ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <ActivityIndicator style={{ marginRight: 5 }} />
                <Text style={styles.gaugeTextScanning}>スキャン中...</Text>
              </View>
              : <View style={{ marginTop: 10 }}>
                <Text style={styles.gaugeTextScanning}>スキャン停止中</Text>
              </View>
          }
        </View>
      </View>
      <Button
        title='スキャン開始'
        onPress={() => startScan()}
      />
      <Button
        title='スキャン停止'
        onPress={() => stopScan()}
      />
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