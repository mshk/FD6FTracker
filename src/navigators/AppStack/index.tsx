import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/Home';

const AppStack = createStackNavigator();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white'  
        }
      }}
    >
      <AppStack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: () => <Text>接触確認アプリカウンター</Text>,
        }}
      />
    </AppStack.Navigator>
  );
}