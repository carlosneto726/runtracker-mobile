import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { name as appName } from './app.json';

import { HomeScreen } from './src/screens/Home';
import { Login } from './src/screens/Login';
import { Register } from './src/screens/Register';
import { Lap } from './src/screens/Lap';

const Stack = createNativeStackNavigator();

function ExampleApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Register} />
        <Stack.Screen name="Lap" component={Lap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => ExampleApp);
