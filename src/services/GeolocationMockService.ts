import { getCircuit } from "./ApiService";
import {
    GeolocationResponse,
    GeolocationError,
    GeolocationOptions
} from "@react-native-community/geolocation";
import { mata as circuit } from '../assets/json/matabica';

type Coordinate = {
    latitude: number;
    longitude: number;
    accuracy: number;
    speed: number;
    timestamp: number;
};

let coordinates: Coordinate[] = [];
// let coordinates: Coordinate[] = circuit.coords;
let intervalId: number | null = null;

getCircuit(2).then((response) => {
    console.log(response);
    coordinates = response.data.coords;
});

export function mockWatchPosition(
    success: (position: GeolocationResponse) => void,
    error?: (error: GeolocationError) => void,
    options?: GeolocationOptions
): number {
    let index = 0;

    intervalId = setInterval(() => {
        if (index >= coordinates.length) {
            index = 0;
        }

        success({
            coords: {
                latitude: coordinates[index].latitude,
                longitude: coordinates[index].longitude,
                accuracy: coordinates[index].accuracy,
                altitude: 0,
                altitudeAccuracy: 0,
                heading: 0,
                speed: coordinates[index].speed,
            },
            timestamp: coordinates[index].timestamp,
        });

        index++;
    }, 1) as unknown as number;

    return intervalId;
}

export function mockClearWatch(id: number) {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
