import React, { useState, useEffect, useRef } from 'react';
import { createContainer } from "unstated-next"
import BleManager from 'react-native-ble-manager';
import { NativeModules, NativeEventEmitter } from "react-native";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const UUID_FDF6 = '0000FD6F-0000-1000-8000-00805F9B34FB';
const UUID_FDF6_16BIT = 'FD6F';
//const UUID_FDF6 = 'B88612E9-B3C1-45EE-AAF5-5E145E2D9831';
const SCAN_SECONDS = 60;

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
    //console.log('device', device);

    setDevices({
      ...devicesRef.current,
      ...device
    });
  }

  const onDiscoverPeripheral = (args) => {
    const uuids = args?.advertising?.serviceUUIDs;
    let isFDF6 = false;
    
    if (uuids) {
      isFDF6 = uuids.includes(UUID_FDF6) || uuids.includes(UUID_FDF6_16BIT);
      if (isFDF6) {
        console.log('# found', uuids, args.name);
      }
    }

    updateDevices({
      [args.id]: {
        ...args,
        isFDF6,
      }
    });
  };

  useEffect(() => {
    bleManagerEmitter.addListener(
      "BleManagerDiscoverPeripheral",
      onDiscoverPeripheral
    );
    bleManagerEmitter.addListener("BleManagerStopScan", () => {
      setIsScanning(false);
    });
  }, []);

  const startScan = () => {
    return BleManager
      .scan([], SCAN_SECONDS, false, {})
      .then(() => setIsScanning(true));
  }

  const stopScan = () => {
    return BleManager
      .stopScan()
      .then(() => setIsScanning(false));
  }

  return {
    isScanning,
    startScan,
    stopScan,
    devices
  }
}

export const BLEContext = createContainer(useBLE);

