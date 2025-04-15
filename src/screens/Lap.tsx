import React, { useEffect, useState, EffectCallback } from "react";
import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";
import { Alert, SafeAreaView, Text, View, Linking } from "react-native";
import { LapService } from "../services";
import { Table, Button, Map } from "../components";
import BackgroundService from 'react-native-background-actions';
import app from '../../app.json';
import style from "../style";

import { mata as circuit } from '../assets/json/matabica';
import { mockWatchPosition, mockClearWatch, sendLap } from "../services";
import { Lap as ILap } from "../interfaces";

export function Lap() {
    const [position, setPosition] = useState<GeolocationResponse | null>(null);
    const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
    const [timerId, setTimerID] = useState<number | null>(null);
    const [timer, setTimer] = useState(0);
    const [lapService,] = useState(new LapService(circuit));

    const options = {
        taskName: `Volta: ${circuit.name}`,
        taskTitle: `${circuit.name} ${circuit.length}Km`,
        taskDesc: `Volta ${lapService.isStarted ? 'iniciada' : 'parada'}`,
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: app.style.colors.primary,
        linkingURI: 'runTracker://Lap',
    };

    Linking.addEventListener('url', (e) => Linking.openURL(e.url));

    useEffect(() => {
        if (!BackgroundService.isRunning())
            BackgroundService.start(bgProcess, options);
        return () => {
            Geolocation.clearWatch(subscriptionId as unknown as number);
            stopTimer();
            BackgroundService.stop();
        }
    }, []);

    useEffect(() => {
        BackgroundService.updateNotification({
            taskDesc: `${lapService.distanceTraveled.toFixed(2)}Km ${timer}s`
        });
        if (position) lapService.currentPosition(position, timer);
    }, [timer, position]);

    async function bgProcess(taskDataArguments: any) {
        await new Promise(async (resolve) => {
            setTimerID(setInterval(() => setTimer(prev => prev + 1), 1000) as unknown as number);

            const watchID = Geolocation.watchPosition(
                async (_position) => {
                    setPosition(_position);
                },
                (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    distanceFilter: 1,
                    interval: 1000,
                }
            );
            setSubscriptionId(watchID);
        })
    };

    function start() {
        let _isStarted = lapService.isStarted;
        lapService.isStarted = !_isStarted;
        setTimer(0);
    }

    function stopTimer(){
        if (timerId !== null) {
            clearInterval(timerId);
            setTimerID(null);
        }
    }

    return (
        <SafeAreaView style={{ marginVertical: 40 }}>
            <View style={style.buttonContainer}>
                <Button onPress={start}
                    type={lapService.isStarted? "danger": "primary"}
                    disabled={!(lapService.isStarted || lapService.isAbleToStartLap)}>
                    {lapService.isStarted? 'Stop' : 'Start'}
                </Button>
                <Button onPress={async () => {
                    console.log({laps: lapService.laps});
                    await sendLap({laps: lapService.laps});
                    lapService.laps = [];
                }}
                    disabled={lapService.laps.length < 1}
                    outline>
                    Enviar voltas
                </Button>
            </View>
            <View style={{ marginTop: 25, position: 'relative' }}>
                {app.env === 'dev' &&
                    <Text style={{ fontSize: 10, position: 'absolute', marginTop: 55, marginStart: 15 }}>
                        laps {lapService.laps.length}{'\n'}
                        distanceTraveled {lapService.distanceTraveled}{'\n'}
                        totalDistance {lapService.totalDistance}{'\n'}
                        speed {lapService.speed}{'\n'}
                        avgSpeed {lapService.avgSpeed}{'\n'}
                        topSpeed {lapService.topSpeed}{'\n'}
                        avgAccuracy {lapService.avgAccuracy}{'\n'}
                        latitude {lapService.latitude}{'\n'}
                        longitude {lapService.longitude}{'\n'}
                        accuracy {lapService.accuracy}{'\n'}
                        heading {lapService.heading}{'\n'}
                        timestamp {lapService.timestamp}{'\n'}
                        isInvalidLap {lapService.isInvalidLap ? 'true' : 'false'}{'\n'}
                        isAbleToStartLap {lapService.isAbleToStartLap ? 'true' : 'false'}{'\n'}
                        distanceToStart {lapService.distanceToStart}{'\n'}
                        distanceToClosestCoord {lapService.distanceToClosestCoord}{'\n'}
                        isUserCloseEnough {lapService.isUserCloseEnough ? 'true' : 'false'}{'\n'}
                        coordsLapCount {lapService.coordsLapCount}{'\n'}
                        isStarted {lapService.isStarted ? 'true' : 'false'}{'\n'}
                        clock {lapService.clock}{'\n'}
                    </Text>
                }
                <Text>
                    {circuit.name} {circuit.length} Km { lapService.isStarted? `${timer}s` : null}
                </Text>
                <Map circuit={circuit}
                    height={500}
                    width={500}
                    zoom={49000}
                    currentPos={position}
                />
            </View>

            <Table list={lapService.laps}/>

        </SafeAreaView>
    );
}
