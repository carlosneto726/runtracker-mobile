import { SafeAreaView, View } from "react-native";
import { Button } from "../../components";
import style from "../../style";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
export { default as CircuitStore } from "./Store";

export function Circuit ({navigation}: NativeStackScreenProps<ParamListBase>) {
    return (
        <SafeAreaView style={style.container}>
            <View style={{ marginVertical: 25 }}>
                <Button onPress={() => navigation.navigate('Store')}>
                    Registrar Circuito
                </Button>
            </View>
        </SafeAreaView>
    );
}
