import React, { useState, useEffect, useRef } from 'react';
import { createContainer } from "unstated-next"
import { BleManager } from 'react-native-ble-plx';

const bleManager = new BleManager();

const UUID_FDF6 = '0000FD6F-0000-1000-8000-00805F9B34FB';
const SCAN_SECONDS = 60;

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
  };

  const startScan = () => {
    return bleManager
      .startDeviceScan(null, null, (error, device) => {
        if (error) {
          return;
        }
        if (device?.serviceUUIDs) {
          console.log('PLX: device', device?.name, device?.serviceUUIDs);
        }
        
        const uuids = device?.serviceUUIDs?.map(uuid => uuid.toUpperCase());
        const isFDF6 = (uuids && uuids.includes(UUID_FDF6)) ? true : false;
        if (isFDF6) {
          console.log('# isFDF6', uuids, device?.id);
        }
        
        updateDevices({
          [device.id]: {
            ...device,
            isFDF6,
          }
        });
      })
  }

  const stopScan = () => {
    bleManager.stopDeviceScan();
    setIsScanning(false);
  }

  return {
    isScanning,
    startScan,
    stopScan,
    devices
  }
}

export const BLEContext = createContainer(useBLE);

