import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/navigators/BottomTab';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

