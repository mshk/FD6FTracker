import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from '../../screens/Home';
import { MenuScreen } from '../../screens/Menu';

const BottomTab = createBottomTabNavigator();
const icons = {
  Home: 'ios-bluetooth',
  Menu: 'ios-menu'
}

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // You can return any component that you like here!
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <BottomTab.Screen name='Home' component={HomeScreen} />
      <BottomTab.Screen name='Menu' component={MenuScreen} />
    </BottomTab.Navigator>
  );
}