import { GeolocationResponse } from "@react-native-community/geolocation";
import { Circuit, Lap } from "../interfaces";
import getTimeDifference from "../utils/getTimeDifference";

export class LapService {
    circuitCoords: any;
    circuit: Circuit;
    laps: Array<Lap> = [];
    startPosition: GeolocationResponse;
    lastPosition: any = null;
    distanceTraveled: number = 0;
    totalDistance: number = 0;
    speed: number = 0;
    avgSpeed: number = 0;
    topSpeed: number = 0;
    avgAccuracy: number = 0;
    latitude: number = 0;
    longitude: number = 0;
    accuracy: number = 0;
    heading: number = 0;
    timestamp: number = 0;
    isInvalidLap: boolean = false;
    isAbleToStartLap: boolean = false;
    distanceToStart: number = Infinity;
    distanceToClosestCoord: number = Infinity;
    isUserCloseEnough: boolean = false;
    coordsLapCount: number = 0;
    isStarted: boolean = false;
    closest: any = undefined;
    clock: number = 0;

    constructor(circuit: Circuit) {
        this.circuitCoords = circuit.coords;
        this.circuit = circuit;
        this.startPosition = circuit.start;
    }

    currentPosition(position: any, clock: number) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.heading = position.coords.heading;
        this.speed = position.coords.speed;
        this.timestamp = position.timestamp;
        this.closest = this.findClosestCoordinate(
            this.latitude,
            this.longitude,
            this.circuitCoords
        );
        if(this.closest)
            this.distanceToClosestCoord = this.haversineDistance(
                this.closest.latitude,
                this.closest.longitude,
                this.latitude,
                this.longitude
            ) * 1000;

        this.isUserCloseEnough = this.distanceToClosestCoord < 15; // 15 metros
        this.distanceToStart = this.haversineDistance(
            this.startPosition.coords.latitude,
            this.startPosition.coords.longitude,
            this.latitude, this.longitude
        ) * 1000;

        if (this.isUserCloseEnough && this.distanceToStart < 15) {
            this.isAbleToStartLap = true;
        } else {
            this.isAbleToStartLap = false;
        }

        if (this.isStarted) {
            this.run(position, clock);
        }

    }

    run (position: any, clock: number) {

        if (this.distanceToStart < this.accuracy && this.distanceTraveled >= this.circuit.length) {
            this.isStarted = false;
            this.laps.push({
                isValid: !this.isInvalidLap,
                time: getTimeDifference(
                    this.startPosition.timestamp, this.lastPosition.timestamp
                ),
                distance_traveled: this.distanceTraveled,
                avg_speed: this.avgSpeed,
                top_speed: this.topSpeed,
                avg_accuracy: this.avgAccuracy,
                coords_count: this.coordsLapCount,
                clock: this.clock
            });

            this.distanceTraveled = this.avgSpeed = this.topSpeed = this.avgAccuracy = this.coordsLapCount = 0;
            this.isInvalidLap = true;
            return;
        }

        this.clock = clock;
        this.coordsLapCount += 1;
        this.avgSpeed += this.speed;
        this.avgAccuracy += this.accuracy;

        if (this.speed > this.topSpeed) {
            this.topSpeed = this.speed;
        }

        if (this.lastPosition) {
            var distanceToLastPosition = this.haversineDistance(
                this.lastPosition.coords.latitude,
                this.lastPosition.coords.longitude,
                this.latitude,
                this.longitude
            );
            this.distanceTraveled += distanceToLastPosition;
            this.totalDistance += distanceToLastPosition;
        }

        if (this.startPosition.timestamp == 0) {
            this.startPosition.timestamp = this.timestamp;
        }

        if (!this.isUserCloseEnough) {
            this.isInvalidLap = true;
        }

        this.lastPosition = position;
    }

    haversineDistance (lat1: number, lon1: number, lat2: number, lon2: number, earthRadius=6371) {
        const toRadians = (angle: number) => (Math.PI / 180) * angle;
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);

        const latDelta = lat2 - lat1;
        const lonDelta = lon2 - lon1;

        const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return earthRadius * c;
    }

    findClosestCoordinate(lat: number, lon: number, coordinates: any) {
        let closest = null;
        let minDistance = Infinity;

        for (const coord of coordinates) {
            const distance = this.haversineDistance(lat, lon, coord.latitude, coord.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                closest = coord;
            }
        }
        return closest;
    }

    generateInterpolatedCoordinates(lat1: number, lng1: number, lat2: number, lng2: number) {
        // Calcula a distância entre os pontos
        const distance = this.haversineDistance(lat1, lng1, lat2, lng2);

        // Define a quantidade de pontos proporcional à distância (1 ponto a cada 100 metros, por exemplo)
        const numPoints = Math.max(Math.floor(distance / 5), 2); // Garante pelo menos 2 pontos

        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const lat = lat1 + (i / numPoints) * (lat2 - lat1);
            const lng = lng1 + (i / numPoints) * (lng2 - lng1);
            points.push({"coords": {"latitude": lat, "longitude": lng}});
        }

        return points;
    }

    // msToTime(duration: number) {
    //     var milliseconds = Math.floor((duration % 1000) / 100),
    //         seconds = Math.floor((duration / 1000) % 60),
    //         minutes = Math.floor((duration / (1000 * 60)) % 60),
    //         hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    //     return `${hours}${minutes}${seconds}${milliseconds}`;
    // }
}
