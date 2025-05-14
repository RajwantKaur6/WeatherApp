import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherScreen from '../screens/WeatherScreen';
import { colors } from '../values/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WeatherScreen">
        <Stack.Screen
          name="WeatherScreen"
          component={WeatherScreen}
          options={{
            title: 'Weather App',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              color: colors.white,
            },
            headerStyle: {
              backgroundColor: colors.backgroundColor,
            },
            headerTintColor: colors.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
