import { SafeAreaView, Text, View } from "react-native";
import { Button, Map } from "../../components";
import style from "../../style";
import Svg, { Circle, Polygon } from "react-native-svg";
import { useEffect, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { mockClearWatch, mockWatchPosition } from "../../services";


export default function CircuitStore () {

    const [points, setPoints] = useState("");
    const [currentPos, setCurrentPos] = useState<any>();
    const [positions, setPositions] = useState<any>([]);
    const [pos, setPos] = useState({latitude: 0, longitude: 0});


    useEffect(() => {
        const watchID = Geolocation.watchPosition(
            async (_position) => {

                let lon = _position.coords.latitude;
                let lat = _position.coords.longitude;
                const zoom = 49;

                // -15.549030524415448, -47.33675269376882
                // -15.549039541340424, -47.33674850192524

                // -15.559418 -47.337838

                const x = ((lon - (-15)) * zoom);
                const y = ((lat - (-47)) * zoom);

                // let x = lon < 1? lon * -1: lon;
                // let y = lat < 1? lat * -1: lat;
                // let x = lon;
                // let y = lat;
                setCurrentPos({x: x, y: y});
                // const points = circuit.coords.map((coord: Coord) => {
                //     let coords = convertLatLonToCanvas(coord.latitude, coord.longitude);
                //     return `${coords.x},${coords.y}`;
                // });
            },
            (error) => console.log(error),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                distanceFilter: 1,
                interval: 1000,
            }
        );
        return () => Geolocation.clearWatch(watchID)
        // latitude: -15.549265, longitude: -47.336314,
    }, []);

    // const points = circuit.coords.map((coord: Coord) => {
    //     let coords = convertLatLonToCanvas(coord.latitude, coord.longitude);
    //     return `${coords.x},${coords.y}`;
    // });

    function convertLatLonToCanvas(lat: number, lon: number) {
        let height = 500;
        let width = 500;
        let zoom = 49000;

        // const latitudes = positions.map((entry: any) => entry.latitude);
        // const longitudes = positions.map((entry: any) => entry.longitude);
        // const minLat = Math.min(...latitudes);
        // const minLon = Math.min(...longitudes);

        const minLat = pos.latitude;
        const minLon = pos.longitude;

        console.log(pos.latitude);
        console.log(pos.longitude);

        const x = ((lon - minLon) * zoom) + (width / 4);
        const y = height - ((lat - minLat) * zoom);
        return { x, y };
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={{marginVertical: 15}}>
                <Button>Começar</Button>
                {currentPos && <Text>{currentPos.x} {'\n'} {currentPos.y}</Text>}
            </View>

            <Svg height={500} width={500} style={{ backgroundColor: '#c7a956' }}>
                {/* <Polygon points={points} fill={'transparent'} stroke="black" strokeWidth="1" /> */}
                {currentPos && <Circle cx={currentPos.x} cy={currentPos.y} r="5" fill="blue" />}
                <Circle cx={5} cy={5} r="5" fill="green" />
                <Circle cx={10} cy={50} r="5" fill="green" />
                <Circle cx={250} cy={250} r="5" fill="green" />
            </Svg>
        </SafeAreaView>
    );
}
