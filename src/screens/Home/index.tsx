import React, { useEffect } from 'react';
import { FlatList, Text, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLEContext } from '../../contexts/BLE';

const renderItem = ({item}) => {
  return (
    <Text>{item.name}</Text>
  );
};

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home</Text>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button 
        title='スキャン開始'
        onPress={() => startScan()}
      />
      <Button 
        title='スキャン停止'
        onPress={() => stopScan()}
      />
      {
        isScanning 
          ? <Text>スキャン中...</Text>
          : null
      }
    </SafeAreaView>
  );
}