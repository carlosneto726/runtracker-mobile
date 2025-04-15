import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../style';
import {
    askForGeolocationPermission,
    askForPostNotificationsPermission,
    mockClearWatch,
    mockWatchPosition
} from '../services';
import { Button, Table } from '../components';
import { Lap } from '../interfaces';
import Geolocation from '@react-native-community/geolocation';

export function HomeScreen({
    navigation,
}: NativeStackScreenProps<ParamListBase>) {

    const [laps, setLaps] = useState<any>();
    const [mock, setMock] = useState(false);

    useEffect(() => {
        (async () => {
            await askForPostNotificationsPermission();
            await askForGeolocationPermission();
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Mata da Bica Run</Text>
                <View style={styles.exampleContainer}>
                    <Text style={styles.exampleDescription}>
                        Registre o tempo de sua volta
                    </Text>
                    <View style={[styles.exampleInnerContainer, styles.buttonContainer]}>
                        <Button onPress={() => navigation.navigate('Lap')}>
                            Volta
                        </Button>
                        <Button onPress={() => navigation.navigate('Circuit', { screen: 'Dashboard' })}
                            type='secondary'
                            outline>
                            Circuit
                        </Button>
                        <Button onPress={() => navigation.navigate('Login')} type='secondary'>
                            Login
                        </Button>
                        <Button onPress={() => navigation.navigate('Profile')} outline>
                            Perfil
                        </Button>
                    </View>

                    <View style={styles.exampleContainer}>
                        <Text style={[styles.exampleTitle, { marginVertical: 20 }]}>Debug</Text>
                        <View style={styles.buttonContainer}>
                            <Button type='secondary' onPress={async () => {
                                let keys = await AsyncStorage.getAllKeys();
                                let allContent = [];
                                for (let key of keys) {
                                    let content = await AsyncStorage.getItem(key);
                                    allContent.push(content);
                                }
                                Alert.alert('storage',JSON.stringify(allContent));
                            }}>
                                Async Storage
                            </Button>
                            <Button type='danger' onPress={async () => {
                                await AsyncStorage.clear();
                            }} outline>
                                AsyncStorage.clear()
                            </Button>
                        </View>
                        <Button style={{ marginVertical: 15 }} onPress={async () => {
                            Geolocation.watchPosition = mockWatchPosition;
                            Geolocation.clearWatch = mockClearWatch;
                            setMock(true);
                        }} type='danger' disabled={mock}>
                            {mock? 'Mocked' : 'Mock'}
                        </Button>
                    </View>

                    {/* {laps && <Table list={laps} />} */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
