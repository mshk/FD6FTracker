import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStackNavigator } from './src/navigators/AppStack';
import { BLEContext } from './src/contexts/BLE';
import { BLEContext as BLEPlxContext } from './src/contexts/BLEPlx';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BLEPlxContext.Provider>
          <BLEContext.Provider>
            <AppStackNavigator />
            <StatusBar style='auto' />
          </BLEContext.Provider>
        </BLEPlxContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

