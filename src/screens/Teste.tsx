import { View } from "react-native";
import { Map } from "../components";
import { mata } from "../assets/json/matabica";

export function Teste () {
    return (
        <View>
            <Map
                height={500}
                width={500}
                zoom={49200}
                circuit={mata}
                currentPos={mata.start}
            />
        </View>
    );
}
