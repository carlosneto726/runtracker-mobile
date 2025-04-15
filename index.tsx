import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { name as appName } from './app.json';
import { HomeScreen, Login, Register, Lap, Teste, Circuit, CircuitStore, Profile } from './src/screens';

const Stack = createNativeStackNavigator();
const CircuitStack = createNativeStackNavigator();

const linking = {
    prefixes: ['runTracker://'],
    config: {
        screens: {
            Background: {
                path: 'Background'
            },
            Home: {
                path: 'Home'
            },
            Login: {
                path: 'Login'
            },
            Registrar: {
                path: 'Registrar'
            },
            Lap: {
                path: 'Lap'
            },
        }
    }
}

function ExampleApp() {
  return (
    <NavigationContainer
        linking={ linking }
        fallback={<></>}>
      <Stack.Navigator>
        {/* <Stack.Screen name="Teste" component={Teste} /> */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="Circuit" children={() =>
            <CircuitStack.Navigator>
                <CircuitStack.Screen name="Dashboard" component={Circuit}/>
                <CircuitStack.Screen name="Store" component={CircuitStore}/>
            </CircuitStack.Navigator>
        }/>

        <Stack.Screen name="Lap" component={Lap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => ExampleApp);
