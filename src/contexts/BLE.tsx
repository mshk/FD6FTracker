import React, { useState, useEffect, useRef } from 'react';
import { createContainer } from "unstated-next"
import BleManager from 'react-native-ble-manager';
import { NativeModules, NativeEventEmitter } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const SCAN_SECONDS = 30;
BleManager.start().then(() => console.log('BleManager started'));

const useBLE = () => {
  const [devices, _setDevices] = useState([]);
  const devicesRef = useRef(devices);
  const [isScanning, setIsScanning] = useState(false);

  const setDevices = (newDevices) => {
    devicesRef.current = newDevices;
    const list = Object.keys(newDevices).map(id => newDevices[id]);
    _setDevices(list);
  };

  const updateDevices = device => {
    setDevices({
      ...devicesRef.current,
      ...device
    });
  }

  const onDiscoverPeripheral = (args) => {
    const uuids = args?.advertising?.serviceUUIDs;
    if (uuids) {
      console.log('# uuids', uuids);
    }

    updateDevices({
      [args.id]: args
    });
  };

  useEffect(() => {
    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      onDiscoverPeripheral
    );
  }, []);

  const startScan = () => {
    return BleManager.scan([], SCAN_SECONDS, false, {})
  }

  const stopScan = () => {
    return BleManager.stopScan();
  }

  return {
    isScanning,
    startScan,
    stopScan,
    devices
  }
}

export const BLEContext = createContainer(useBLE);

