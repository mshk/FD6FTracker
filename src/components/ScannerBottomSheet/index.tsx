import React, { useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { BLEContext } from '../../contexts/BLE';
import {
  Button,
  List,
  Divider
} from 'react-native-paper';

export const ScannerBottomSheet = () => {
  const {
    devices,
    isScanning,
    startScan,
    stopScan
  } = BLEContext.useContainer();

  const renderItem = ({ item }) => {
    return (
      <List.Item
        title={item.name || 'Unnamed'}
        description={item.id}
        right={({ style }) => <View style={style}><Text>{item.isFDF6 ? '*' : null}</Text></View>}
      />
    );
  };

  const renderBottomSheetContent = () => (
    <View
      style={{
        backgroundColor: '#ffffff',
        paddingTop: 15,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        {
          isScanning
            ? (
              <Button
                loading={isScanning}
                onPress={() => stopScan()}
              >
                スキャン停止
              </Button>
            )
            : (
              <Button
                onPress={() => startScan()}
              >
                スキャン開始
              </Button>
            )
        }
      </View>
      <Divider />
      <List.Section
        title='BLEデバイス'
        style={{
          padding: 10
        }}
      >
        <FlatList
          data={devices}
          renderItem={renderItem}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
          }}
        />
      </List.Section>
    </View>
  );
  
  return (
  <BottomSheet
    snapPoints={['80%', 45]}
    initialSnap={1}
    renderHeader={() => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    )}
    borderRadius={18}
    renderContent={renderBottomSheetContent}
  />
  );
};

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
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  header: {
    backgroundColor: 'transparent',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
});