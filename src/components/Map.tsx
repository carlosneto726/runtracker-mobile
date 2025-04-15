import React, { useEffect, useState } from "react"
import Svg, { Circle, Polygon } from "react-native-svg";
import { GeolocationResponse } from "@react-native-community/geolocation";
import { Coord, Circuit } from "../interfaces";
import { View } from "react-native";

interface Props {
    height: number;
    width: number;
    zoom?: number;
    circuit: Circuit
    currentPos: GeolocationResponse | null
}

export default function Map({ height, width, circuit, zoom=49000, currentPos }: Props) {
    const { minLat, minLon } = getMinLatLon(circuit.coords);
    const points = circuit.coords.map((coord: Coord) => {
        let coords = convertLatLonToCanvas(coord.latitude, coord.longitude);
        return `${coords.x},${coords.y}`;
    });
    const start = convertLatLonToCanvas(-15.5495154, -47.3354712);
    const [user, setUser] = useState<{x: number, y: number}>();

    useEffect(() => {
        if (currentPos)
        setUser(convertLatLonToCanvas(
            currentPos?.coords.latitude,
            currentPos?.coords.longitude
        ));
    }, [currentPos]);

    function getMinLatLon (data: Coord[]) {
        const latitudes = data.map((entry: Coord) => entry.latitude);
        const longitudes = data.map((entry: Coord) => entry.longitude);
        const minLat = Math.min(...latitudes);
        const minLon = Math.min(...longitudes);
        return { minLat, minLon };
    };

    function convertLatLonToCanvas(lat: number, lon: number) {
        const x = ((lon - minLon) * zoom) + (width / 4);
        const y = height - ((lat - minLat) * zoom);
        return { x, y };
    }

    return (
        <View
            style={{ borderWidth: 1 }}
        >
            <Svg
                onMoveShouldSetResponder={() => true}
                height={height}
                width={width}
            >
                <Polygon points={points} fill={'transparent'} stroke="black" strokeWidth="1" />
                <Circle cx={start.x} cy={start.y} r="2" fill="green" />
                {(currentPos && user) &&
                    <Circle cx={user.x} cy={user.y} r="2" fill="blue" />
                }
            </Svg>
        </View>
    );

}
