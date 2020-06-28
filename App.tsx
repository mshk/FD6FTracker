import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomTabNavigator } from './src/navigators/BottomTab';
import { BLEContext } from './src/contexts/BLE';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BLEContext.Provider>
          <BottomTabNavigator />
          <StatusBar style='auto' />
        </BLEContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

